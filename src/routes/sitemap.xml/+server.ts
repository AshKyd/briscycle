import { pages } from '$lib/content/manifest';
import { site } from '$lib/site';
import type { RequestHandler } from './$types.js';

export const prerender = true;

/** Newest first, matching the ordering the legacy sitemap used. */
export const GET: RequestHandler = async () => {
	const urls = pages
		.filter(({ excludeFromCollections }) => !excludeFromCollections)
		.toReversed()
		.map(({ url, date }) => {
			const lastmod = date ? `\n\t\t<lastmod>${date}</lastmod>` : '';
			return `\t<url>\n\t\t<loc>${site.origin}${url}</loc>${lastmod}\n\t</url>`;
		})
		.join('\n');

	const xml = `<?xml version="1.0" encoding="utf-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;

	return new Response(xml, { headers: { 'content-type': 'application/xml' } });
};
