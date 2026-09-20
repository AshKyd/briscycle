import { facetsFor } from '../../facets.ts';
import { geojsonUrlFor } from './geojson.ts';
import { resolveHero } from './hero.ts';
import { renderBody } from './markdown.ts';
import { site } from '../../site.ts';
import type { ContentFile, MapConfig, PageModel } from '../../types.ts';


/** The map block renders whenever a page declares either coordinates or a route. */
function buildMap(page: ContentFile): MapConfig | undefined {
	const { geo, geojson, mapTitle, mapDescription, title } = page.frontmatter;
	if (!geo && !geojson) return undefined;

	return {
		centre: geo?.lat !== undefined && geo?.lng !== undefined ? [geo.lng, geo.lat] : undefined,
		zoom: geo?.zoom,
		height: geo?.height,
		bigMap: geo?.bigMap ?? false,
		colour: geo?.colour,
		googleMaps: geo?.googleMaps,
		geojsonUrl: geojsonUrlFor(page),
		title: mapTitle ?? `Map of ${title}`,
		description: mapDescription
	};
}

/** Build the full render model for one page. */
export function buildPageModel(page: ContentFile): PageModel {
	const { url, directory, frontmatter } = page;
	const { hero, geo, layout } = frontmatter;

	// A full-page map renders nothing but the map, so its body and cards are not built at all
	// rather than being rendered and then shipped unused.
	const isBigMap = layout === 'bigmap';

	return {
		url,
		title: frontmatter.title,
		description: frontmatter.description ?? site.description,
		layout: frontmatter.layout,
		classNames: frontmatter.classNames,
		showHeader: frontmatter.showHeader,
		hero: isBigMap || !hero ? undefined : resolveHero(hero, url, directory),
		facets: isBigMap ? [] : facetsFor(frontmatter.tags),
		openDate: frontmatter.openDate,
		htmlSegments: isBigMap ? [] : renderBody(page),
		map: buildMap(page),
		relatedCollection: isBigMap ? undefined : frontmatter.related,
		country: frontmatter.country,
		editUrl: `${site.editBase}/${page.file}`,
		icbm: geo?.lat && geo?.lng ? `${geo.lat},${geo.lng}` : undefined
	};
}
