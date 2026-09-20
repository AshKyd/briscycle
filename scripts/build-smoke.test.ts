import { glob, readFile, stat } from 'node:fs/promises';
import path from 'node:path';
import { describe, expect, it } from 'vitest';
import { loadPages } from '../src/lib/server/content/loadContent.ts';

const BUILD = path.resolve(import.meta.dirname, '../build');

const buildExists = await stat(BUILD).then(
	() => true,
	() => false
);

const collect = async (pattern: string, cwd: string) => {
	const files: string[] = [];
	for await (const file of glob(pattern, { cwd })) files.push(file);
	return files;
};

/**
 * Guards the two properties that are easy to regress silently and expensive to notice: the
 * markdown toolchain leaking into the browser bundle, and page payloads swelling back up with
 * inline GeoJSON. Skipped unless `npm run build` has been run.
 */
describe.skipIf(!buildExists)('build output', () => {
	it('prerenders every page', async () => {
		const pages = await loadPages();
		const html = await collect('**/*.html', BUILD);
		pages.forEach(({ url }) => {
			const expected = url === '/' ? 'index.html' : `${url.replace(/^\/|\/$/g, '')}/index.html`;
			expect(html, `missing ${expected}`).toContain(expected);
		});
	});

	it('keeps the markdown renderer out of the client bundle', async () => {
		const chunks = await collect('_app/immutable/**/*.js', BUILD);
		const contents = await Promise.all(
			chunks.map((chunk) => readFile(path.join(BUILD, chunk), 'utf8'))
		);
		expect(contents.filter((source) => source.includes('markdown-it'))).toHaveLength(0);
	});

	it('keeps inline geojson out of the page payloads', async () => {
		const payloads = await collect('**/__data.json', BUILD);
		const sizes = await Promise.all(
			payloads.map(async (file) => ({
				file,
				bytes: (await stat(path.join(BUILD, file))).size
			}))
		);
		const heavy = sizes.filter(({ bytes }) => bytes > 40_000);
		expect(heavy, `oversized payloads: ${JSON.stringify(heavy)}`).toHaveLength(0);
	});

	it('serves the route data as standalone files', async () => {
		const routes = await collect('geo/*.geo.json', BUILD);
		expect(routes.length).toBeGreaterThan(0);
	});
});
