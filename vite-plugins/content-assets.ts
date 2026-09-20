import { createReadStream } from 'node:fs';
import { cp, mkdir, stat } from 'node:fs/promises';
import path from 'node:path';
import type { Plugin } from 'vite';
import { clearAssetCache, referencedAssets } from '../src/lib/server/content/assets.ts';
import { clearContentCache } from '../src/lib/server/content/loadContent.ts';
import { CONTENT_ROOT } from '../src/lib/server/content/paths.ts';

/**
 * Media types for everything that lives in the content tree.
 *
 * Serving these explicitly matters for SVG in particular: browsers sniff raster formats from
 * their magic bytes, but an `<img>` silently refuses to render an SVG that does not arrive as
 * `image/svg+xml`, which is how the card icons went missing in development.
 */
const CONTENT_TYPES: Record<string, string> = {
	'.avif': 'image/avif',
	'.geojson': 'application/geo+json',
	'.ico': 'image/x-icon',
	'.jpeg': 'image/jpeg',
	'.jpg': 'image/jpeg',
	'.json': 'application/json',
	'.png': 'image/png',
	'.svg': 'image/svg+xml',
	'.txt': 'text/plain; charset=utf-8',
	'.webm': 'video/webm',
	'.webp': 'image/webp'
};

/** The media type to serve a content asset as, or undefined when it is unknown. */
export const contentTypeFor = (file: string): string | undefined =>
	CONTENT_TYPES[path.extname(file).toLowerCase()];

/**
 * Publish the photos, SVGs and `.geo.json` files that pages reference.
 *
 * Content assets sit beside the markdown that uses them, which keeps a page and its images
 * together. Eleventy copied the whole tree through verbatim, but that tree is also a working
 * directory — camera originals, editing scratch files and superseded crops live there too —
 * so only files a page actually links to are published. Everything a page renders from a
 * photo is a derivative under `/i/`, produced ahead of time by `npm run images`, so the
 * originals never need to ship.
 */
export function contentAssets(): Plugin {
	let outDir = '';

	return {
		name: 'briscycle:content-assets',

		configResolved(config) {
			// Only the client build writes the directory the adapter later publishes.
			if (!config.build.ssr) outDir = config.build.outDir;
		},

		configureServer(server) {
			// Markdown is not part of the module graph, so edits to it have to invalidate the
			// parsed content by hand or the dev server keeps serving the first parse.
			const invalidate = (file: string) => {
				if (!file.startsWith(CONTENT_ROOT)) return;
				clearContentCache();
				clearAssetCache();
				server.ws.send({ type: 'full-reload' });
			};
			server.watcher.on('change', invalidate);
			server.watcher.on('add', invalidate);
			server.watcher.on('unlink', invalidate);

			server.middlewares.use(async (req, res, next) => {
				const pathname = decodeURIComponent((req.url ?? '').split('?')[0]);
				const relative = pathname.replace(/^\//, '');

				const published = await referencedAssets();
				if (!published.has(relative)) return next();

				const file = path.join(CONTENT_ROOT, relative);
				const found = await stat(file).catch(() => undefined);
				if (!found?.isFile()) return next();

				const contentType = contentTypeFor(file);
				if (contentType) res.setHeader('content-type', contentType);

				createReadStream(file).pipe(res);
			});
		},

		async closeBundle() {
			if (!outDir) return;

			const published = [...(await referencedAssets())];
			await Promise.all(
				published.map(async (relative) => {
					const destination = path.join(outDir, relative);
					await mkdir(path.dirname(destination), { recursive: true });
					await cp(path.join(CONTENT_ROOT, relative), destination, { force: true });
				})
			);

			console.log(`\nbriscycle: published ${published.length} content assets`);
		}
	};
}
