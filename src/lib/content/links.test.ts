import { describe, expect, it } from 'vitest';
import { glob, readFile } from 'node:fs/promises';
import path from 'node:path';

const ROUTES_ROOT = path.resolve(import.meta.dirname, '../../routes');

/** Static hrefs written into page markup. Dynamic ones are collected separately. */
const HREF = /href="([^"{}]+)"/g;
const DYNAMIC_HREF = /href=\{/g;

const isAsset = (pathname: string) => path.extname(pathname) !== '';

async function routeFiles(): Promise<{ url: string; source: string }[]> {
	const files = await Array.fromAsync(glob('**/+page.svelte', { cwd: ROUTES_ROOT }));
	return Promise.all(
		files.map(async (file) => ({
			url: `/${file.replace(/\+page\.svelte$/, '')}`,
			source: await readFile(path.join(ROUTES_ROOT, file), 'utf8')
		}))
	);
}

describe('internal links', () => {
	it('all resolve to a real page', async () => {
		const pages = await routeFiles();
		const known = new Set(pages.map(({ url }) => url));

		const broken = pages.flatMap(({ url, source }) =>
			[...source.matchAll(HREF)]
				.map(([, href]) => href)
				.filter(
					(href) => !href.startsWith('http') && !href.startsWith('mailto:') && !href.startsWith('#')
				)
				.map((href) => ({ href, target: new URL(href, `https://x${url}`).pathname }))
				.filter(({ target }) => !isAsset(target) && !known.has(target))
				.map(({ href }) => `${url} -> ${href}`)
		);

		expect(broken).toEqual([]);
	});

	/**
	 * The prerenderer treats a redirect as a 404, so a link missing its trailing slash fails the
	 * build rather than quietly costing a round trip.
	 */
	it('all end in a trailing slash', async () => {
		const pages = await routeFiles();

		const missing = pages.flatMap(({ url, source }) =>
			[...source.matchAll(HREF)]
				.map(([, href]) => href)
				.filter(
					(href) => !href.startsWith('http') && !href.startsWith('mailto:') && !href.startsWith('#')
				)
				.map((href) => ({ href, target: new URL(href, `https://x${url}`).pathname }))
				.filter(({ target }) => !isAsset(target) && !target.endsWith('/'))
				.map(({ href }) => `${url} -> ${href}`)
		);

		expect(missing).toEqual([]);
	});

	/** A computed href could hide a bad link from the checks above. Prose should have none. */
	it('are never computed in page markup', async () => {
		const pages = await routeFiles();
		const dynamic = pages
			.filter(({ source }) => DYNAMIC_HREF.test(source.split('</script>').at(-1) ?? ''))
			.map(({ url }) => url);

		expect(dynamic).toEqual([]);
	});
});
