import { error } from '@sveltejs/kit';
import { buildPageModel } from '$lib/server/content/page';
import { findPageByUrl, loadPages } from '$lib/server/content/loadContent';
import type { EntryGenerator, PageServerLoad } from './$types.js';

/**
 * Every page URL, so the static adapter can prerender the site without crawling. Derived from
 * the content tree, which means adding a markdown file needs no change here.
 */
export const entries: EntryGenerator = async () => {
	const pages = await loadPages();
	return pages.map(({ url }) => ({ slug: url.replace(/^\/|\/$/g, '') }));
};

/**
 * Load one page's render model.
 *
 * This is a server load rather than a universal one on purpose: its imports — markdown-it, the
 * YAML parser and the markdown sources themselves — never reach the browser, so the client
 * only ever receives finished HTML.
 */
export const load: PageServerLoad = async ({ url, locals }) => {
	// Matched on the pathname rather than the slug param, so that the trailing-slash policy is
	// the single source of truth for what a page's URL looks like.
	const content = await findPageByUrl(url.pathname);
	if (!content) error(404, 'Not found');

	const page = buildPageModel(content);
	locals.bodyClass = page.classNames ?? '';

	return { page };
};
