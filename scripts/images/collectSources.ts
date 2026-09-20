import { loadContent } from '../../src/lib/server/content/loadContent.ts';
import { toContentPath } from '../../src/lib/server/content/paths.ts';
import { parseArgs } from '../../src/lib/server/content/shortcodes/parseArgs.ts';
import type { Role } from './roles.ts';

/** Every role a given source image is used in, keyed by content-relative path. */
export type SourceRoles = Map<string, Set<Role>>;

const IMAGE_SHORTCODE = /\{%\s*image\s*([\s\S]*?)%\}/g;

const add = (sources: SourceRoles, path: string, role: Role) => {
	const roles = sources.get(path) ?? new Set<Role>();
	sources.set(path, roles.add(role));
};

/**
 * Find every image that needs derivatives, by reading the content rather than a hand-kept
 * list — so adding a photo to a page is all it takes for `npm run images` to pick it up.
 */
export async function collectSources(): Promise<SourceRoles> {
	const pages = await loadContent();
	const sources: SourceRoles = new Map();

	pages.forEach(({ directory, body, frontmatter }) => {
		const { hero, thumb } = frontmatter;

		if (hero?.type === 'autoImage') {
			add(sources, toContentPath(hero.desktop, directory), 'heroDesktop');
			add(sources, toContentPath(hero.mobile, directory), 'heroMobile');
		}
		if (thumb?.type === 'generated') {
			add(sources, toContentPath(thumb.source, directory), 'thumb');
		}

		[...body.matchAll(IMAGE_SHORTCODE)].forEach(([, args]) => {
			const [src, , className] = parseArgs(args);
			if (!src) return;
			add(sources, toContentPath(src, directory), className ? 'inlineAligned' : 'inline');
		});
	});

	return sources;
}
