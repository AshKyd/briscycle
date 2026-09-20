import { loadPages } from './loadContent.ts';
import { resolveAgainstPage } from './paths.ts';
import type { ContentFile } from '../../types.ts';
import type { FeatureCollection } from 'geojson';

/** A page's inline GeoJSON, lifted out into its own prerendered file. */
export interface ExtractedGeojson {
	id: string;
	url: string;
	data: FeatureCollection;
}

/** Stable, filename-safe id for a page's extracted GeoJSON. */
export const geojsonId = (url: string): string =>
	url.replace(/^\/|\/$/g, '').replaceAll('/', '--') || 'index';

/**
 * Lift inline GeoJSON out of front matter into a standalone file.
 *
 * This is what keeps the site light. Several pages embed enormous FeatureCollections —
 * `/moreton-bay/` alone is over 2000 lines — and anything a load function returns is both
 * inlined into the HTML and written to `__data.json`, so the map would otherwise download
 * twice on every visit. The page carries only a URL and the map fetches it on demand.
 */
export async function extractGeojson(): Promise<ExtractedGeojson[]> {
	const pages = await loadPages();
	return pages
		.filter((page) => page.frontmatter.geojson)
		.map(({ url, frontmatter }) => ({
			id: geojsonId(url),
			url: `/geo/${geojsonId(url)}.geo.json`,
			data: frontmatter.geojson as FeatureCollection
		}));
}

/**
 * Where a page's map should fetch its route from: either the extracted inline collection, or
 * the `.geo.json` file the page already points at (a couple of which are page-relative).
 */
export function geojsonUrlFor({ url, frontmatter }: ContentFile): string | undefined {
	if (frontmatter.geojson) return `/geo/${geojsonId(url)}.geo.json`;
	const { geojsonUrl } = frontmatter.geo ?? {};
	return geojsonUrl ? resolveAgainstPage(geojsonUrl, url) : undefined;
}
