import { describe, expect, it } from 'vitest';
import { byUrl, collections, entries, footer, menu, pages } from './manifest.ts';
import { FACETS } from '../facets.ts';
import { COLLECTION_ORDER } from './order.ts';

describe('the content manifest', () => {
	it('finds every page', () => {
		expect(pages.length).toBe(46);
	});

	/** A copy-paste error here would give a page the wrong canonical URL and sitemap entry. */
	it('agrees with the route each page was globbed from', () => {
		const mismatched = entries
			.filter(({ routeUrl, meta }) => routeUrl !== meta.url)
			.map(({ routeUrl, meta }) => `${routeUrl} declares ${meta.url}`);

		expect(mismatched).toEqual([]);
	});

	it('gives every page a title', () => {
		expect(pages.filter(({ title }) => !title)).toEqual([]);
	});

	/** The legal pages have never carried one, and fall back to the site description. */
	it('gives every page outside /legal a description', () => {
		const legal = new Set(collections.legal?.map(({ url }) => url));
		const missing = pages
			.filter(({ url, description }) => !description && !legal.has(url))
			.map(({ url }) => url);

		expect(missing).toEqual([]);
	});

	it('only points `related` at collections that exist', () => {
		const dangling = pages
			.filter(({ related }) => related && !collections[related])
			.map(({ url, related }) => `${url} -> ${related}`);

		expect(dangling).toEqual([]);
	});

	/** `tags` is both collection membership and route attributes, so only spelling is checked. */
	it('spells facet tags the way `FACETS` does', () => {
		const facetTags = new Set(FACETS.map(({ tag }) => tag));
		const nearMisses = pages.flatMap(({ url, tags }) =>
			tags
				.filter(
					(tag) =>
						!facetTags.has(tag) &&
						[...facetTags].some((f) => f.replace(/-/g, '') === tag.replace(/-/g, ''))
				)
				.map((tag) => `${url}: ${tag}`)
		);

		expect(nearMisses).toEqual([]);
	});

	it('keeps an excluded page routable but unlisted', () => {
		const url = '/brisbane-city/neville-bonner-bridge/';
		expect(byUrl.has(url)).toBe(true);
		expect(collections.brisbane?.some((page) => page.url === url)).toBe(false);
	});

	it('orders the nav lists canonically', () => {
		const rank = (url: string) => COLLECTION_ORDER.indexOf(url);
		const listed = [...menu, ...footer.brisbane, ...footer.legal].filter(
			({ url }) => rank(url) >= 0
		);

		expect(listed.length).toBeGreaterThan(0);
		[menu, footer.brisbane, footer['day-trips'], footer['moreton-bay'], footer.rules, footer.legal]
			.map((list) => list.map(({ url }) => rank(url)).filter((r) => r >= 0))
			.forEach((ranks) => expect(ranks).toEqual(ranks.toSorted((a, b) => a - b)));
	});
});
