import { stat } from 'node:fs/promises';
import path from 'node:path';
import { describe, expect, it } from 'vitest';
import { referencedAssets } from './assets.ts';
import { buildSiteData } from './collections.ts';
import { loadPages } from './loadContent.ts';
import { buildPageModel } from './page.ts';
import { CONTENT_ROOT, STATIC_ROOT } from './paths.ts';

/** Candidate URLs from a `srcset`, or a plain `src`. */
const urlsIn = (value: string): string[] =>
	value
		.split(',')
		.map((candidate) => candidate.trim().split(/\s+/)[0])
		.filter((url) => url.startsWith('/'));

/** Every asset URL the site renders, across all pages and every card grid. */
async function renderedAssetUrls(): Promise<string[]> {
	const [pages, site] = await Promise.all([loadPages(), buildSiteData()]);
	const urls: string[] = [];
	const add = (value?: string) => value && urls.push(...urlsIn(value));

	pages.forEach((page) => {
		const model = buildPageModel(page);
		add(model.hero?.src);
		model.hero?.sources.forEach(({ srcset }) => add(srcset));
		model.facets.forEach(({ iconUrl }) => add(iconUrl));
		model.htmlSegments.forEach((html) => {
			[...html.matchAll(/(?:src|srcset)="([^"]+)"/g)].forEach(([, value]) => add(value));
		});
	});

	Object.values(site.cards)
		.flat()
		.forEach((card) => {
			add(card.icon);
			add(card.thumb?.src);
			card.thumb?.sources.forEach(({ srcset }) => add(srcset));
		});

	return [...new Set(urls)].map((url) => decodeURIComponent(url.split(/[?#]/)[0]));
}

const exists = (file: string) => stat(file).then((entry) => entry.isFile(), () => false);

describe('published assets', () => {
	it('publishes far less than the whole content tree', async () => {
		const published = await referencedAssets();
		expect(published.size).toBeGreaterThan(50);
		// The tree holds ~215 files including camera originals and editing scratch files.
		expect(published.size).toBeLessThan(150);
	});

	it('never publishes a camera original that only feeds the image script', async () => {
		const published = await referencedAssets();
		const manifest = Object.keys(
			(await import('../../generated/images.json', { with: { type: 'json' } })).default
		);
		expect(manifest.length).toBeGreaterThan(0);
		expect(manifest.filter((source) => published.has(source))).toEqual([]);
	});

	/**
	 * The guard that makes narrowing the copy safe: anything a page links to must be a static
	 * file, a generated derivative, or a content asset we publish. A reference the collector
	 * misses would otherwise 404 only in production.
	 */
	it('resolves every asset the site references', async () => {
		const published = await referencedAssets();
		const urls = await renderedAssetUrls();
		expect(urls.length).toBeGreaterThan(100);

		const unresolved = await Promise.all(
			urls.map(async (url) => {
				const relative = url.slice(1);
				if (await exists(path.join(STATIC_ROOT, relative))) return undefined;
				if (published.has(relative) && (await exists(path.join(CONTENT_ROOT, relative)))) {
					return undefined;
				}
				return url;
			})
		);

		expect(unresolved.filter(Boolean)).toEqual([]);
	});
});
