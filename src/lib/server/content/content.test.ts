import { stat } from 'node:fs/promises';
import path from 'node:path';
import { describe, expect, it } from 'vitest';
import { loadContent, loadPages } from './loadContent.ts';
import { buildSiteData, groupByTag } from './collections.ts';
import { extractGeojson, geojsonId } from './geojson.ts';
import { buildPageModel } from './page.ts';
import { COLLECTION_ORDER } from './order.ts';
import { CONTENT_ROOT, STATIC_ROOT } from './paths.ts';
import { FACETS } from '../../facets.ts';

const pages = await loadContent();

describe('content', () => {
	// The port's main regression net: every real file must still parse.
	it('parses every markdown file', () => {
		expect(pages).toHaveLength(47);
	});

	it('derives the expected URLs', () => {
		const urls = Object.fromEntries(pages.map(({ file, url }) => [file, url]));
		expect(urls['index.md']).toBe('/');
		expect(urls['brisbane-city/riverwalk/index.md']).toBe('/brisbane-city/riverwalk/');
		expect(urls['day-trips/kedron-brook-cycleway/jim-soorley-bikeway/index.md']).toBe(
			'/day-trips/kedron-brook-cycleway/jim-soorley-bikeway/'
		);
	});

	it('honours permalink overrides', () => {
		const urls = Object.fromEntries(pages.map(({ file, url }) => [file, url]));
		expect(urls['legal/privacy-policy.md']).toBe('/privacy-policy/');
		expect(urls['404.md']).toBe('/404.html');
	});

	it('gives every page a unique URL', () => {
		const urls = pages.map(({ url }) => url);
		expect(new Set(urls).size).toBe(urls.length);
	});

	it('coerces the string coordinates in geo front matter to numbers', () => {
		const withGeo = pages.filter(({ frontmatter }) => frontmatter.geo?.lat !== undefined);
		expect(withGeo.length).toBeGreaterThan(0);
		withGeo.forEach(({ frontmatter }) => expect(typeof frontmatter.geo?.lat).toBe('number'));
	});
});

describe('collections', () => {
	it('excludes opted-out pages', async () => {
		const collections = groupByTag(await loadPages());
		const brisbane = collections.brisbane.map(({ url }) => url);
		expect(brisbane).not.toContain('/brisbane-city/neville-bonner-bridge/');
	});

	it('orders the menu as the published site did', async () => {
		const collections = groupByTag(await loadPages());
		expect(collections.menu.map(({ url }) => url)).toEqual([
			'/bicycle-regulation/',
			'/day-trips/',
			'/gold-coast/',
			'/moreton-bay/',
			'/brisbane-city/'
		]);
	});

	// `tags` doubles as collection membership and as infobox badges, so a typo would
	// otherwise silently invent a collection nothing ever renders.
	it('uses only known tags', () => {
		const known = new Set([
			...FACETS.map(({ tag }) => tag),
			'menu',
			'home',
			'brisbane',
			'day-trips',
			'moreton-bay',
			'rules',
			'legal',
			'flat',
			'bridge',
			'gravel',
			'rail-trails',
			'popularRoute',
			'no-cycling'
		]);
		const used = new Set(pages.flatMap(({ frontmatter }) => frontmatter.tags));
		expect([...used].filter((tag) => !known.has(tag))).toEqual([]);
	});

	it('resolves every `related` value to a real collection', async () => {
		const collections = groupByTag(await loadPages());
		const related = pages.flatMap(({ frontmatter }) => frontmatter.related ?? []);
		expect([...new Set(related)].filter((tag) => !collections[tag])).toEqual([]);
	});

	it('lists every collected page in the pinned order', async () => {
		const collections = groupByTag(await loadPages());
		const collected = new Set(Object.values(collections).flat().map(({ url }) => url));
		expect([...collected].filter((url) => !COLLECTION_ORDER.includes(url))).toEqual([]);
	});
});

describe('card icons', () => {
	const iconated = pages.filter(({ frontmatter }) => frontmatter.icon);

	it('gives every legal page an icon', async () => {
		const data = await buildSiteData();
		const missing = data.cards.legal.filter(({ icon }) => !icon).map(({ url }) => url);
		expect(missing).toEqual([]);
	});

	// An icon is a bare URL, so a typo or a missing `npm run icons` would 404 silently.
	it('points every icon at a file that exists', async () => {
		expect(iconated.length).toBeGreaterThan(0);

		const results = await Promise.all(
			iconated.map(async ({ frontmatter, url }) => {
				const relative = frontmatter.icon!.replace(/^\//, '');
				const found = await Promise.any([
					stat(path.join(STATIC_ROOT, relative)),
					stat(path.join(CONTENT_ROOT, relative))
				]).then(
					() => true,
					() => false
				);
				return found ? null : `${url} → ${frontmatter.icon}`;
			})
		);

		expect(results.filter(Boolean)).toEqual([]);
	});
});

describe('site data', () => {
	it('stamps the build year for the footer copyright', async () => {
		const { buildYear } = await buildSiteData();
		expect(buildYear).toBe(new Date().getFullYear());
	});
});

describe('geojson extraction', () => {
	it('produces filename-safe ids', () => {
		expect(geojsonId('/moreton-bay/hornibrook-bridge/')).toBe('moreton-bay--hornibrook-bridge');
		expect(geojsonId('/')).toBe('index');
	});

	it('merges arrays of feature collections instead of dropping all but the first', () => {
		const multi = pages.find(({ url }) => url === '/brisbane-city/southeast-freeway-bikeway/');
		expect(multi?.frontmatter.geojson?.type).toBe('FeatureCollection');
		expect(multi?.frontmatter.geojson?.features.length).toBeGreaterThan(1);
	});

	it('lifts inline geojson out of the page payload entirely', async () => {
		const routes = await extractGeojson();
		expect(routes.length).toBeGreaterThan(0);

		const heaviest = pages.find(({ url }) => url === '/moreton-bay/');
		const model = buildPageModel(heaviest!);
		expect(JSON.stringify(model)).not.toContain('FeatureCollection');
		expect(model.map?.geojsonUrl).toBe('/geo/moreton-bay.geo.json');
	});

	it('resolves page-relative geojson URLs against the page', () => {
		const page = pages.find(({ url }) => url === '/moreton-bay/gateway-bridge-cycleway/');
		const model = buildPageModel(page!);
		expect(model.map?.geojsonUrl).toBe('/moreton-bay/gateway-bridge-cycleway/gateway.geo.json');
	});
});
