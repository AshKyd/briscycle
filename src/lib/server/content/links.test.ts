import { describe, expect, it } from 'vitest';
import { loadPages } from './loadContent.ts';
import type { ContentFile } from '../../types.ts';

/** Schemes that leave the site, plus in-page anchors — none of them are ours to resolve. */
const EXTERNAL = /^(https?:|mailto:|tel:|#|data:)/;

/** Anything ending in an extension is an asset; `assets.test.ts` covers those. */
const isAsset = (pathname: string) => /\.[a-z0-9]+$/i.test(pathname);

/** Every internal link in a page body, both hand-written HTML and markdown syntax. */
const linksIn = ({ body }: ContentFile): string[] =>
	[...body.matchAll(/href="([^"]+)"/g), ...body.matchAll(/\]\(([^)\s]+)\)/g)]
		.map(([, href]) => href)
		.filter((href) => !EXTERNAL.test(href));

describe('internal links', () => {
	/**
	 * Eleventy never checked links, so the content arrived with 32 dead ones. The prerenderer
	 * does check, and stops at the first 404 — which would mean one failed build per broken
	 * link. This reports all of them at once, in seconds.
	 */
	it('all resolve to a real page', async () => {
		const pages = await loadPages();
		const known = new Set(pages.map(({ url }) => url));

		const dead = pages.flatMap((page) =>
			linksIn(page)
				.map((href) => ({ href, to: new URL(href, `https://x${page.url}`).pathname }))
				.filter(({ to }) => !isAsset(to) && !known.has(to))
				.map(({ href, to }) => `${page.url} → ${href} (resolves to ${to})`)
		);

		expect(dead).toEqual([]);
	});

	// `trailingSlash: 'always'` would redirect these, but the prerenderer counts them as 404s,
	// and a redirect hop is a wasted round trip for the reader.
	it('are written with the trailing slash the site uses', async () => {
		const pages = await loadPages();

		const missing = pages.flatMap((page) =>
			linksIn(page)
				.filter((href) => !href.endsWith('/') && !isAsset(href.split(/[?#]/)[0]))
				.map((href) => `${page.url} → ${href}`)
		);

		expect(missing).toEqual([]);
	});
});
