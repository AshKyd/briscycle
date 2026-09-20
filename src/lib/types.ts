import type { Picture } from 'vite-imagetools';

/** Creative Commons attribution for a hero or card thumbnail. */
export interface Attribution {
	name: string;
	title: string;
	url: string;
	license: string;
}

/** A badge shown in a page's infobox, driven by the page's tags. */
export interface Facet {
	tag: string;
	colour: string;
	iconUrl: string;
	title: string;
	/** Name of the source icon, credited in the hover tooltip. */
	iconName: string;
	/** Noun Project contributor, credited in the hover tooltip. */
	contributor: string;
	body: string;
}

/** Everything the map needs. Route data is always fetched, never inlined into the page. */
export interface MapConfig {
	/** Starting centre as `[lng, lat]`, when the page pins one. */
	centre?: [number, number];
	zoom?: number;
	height?: string;
	bigMap: boolean;
	colour?: string;
	geojsonUrl?: string;
	googleMaps?: string;
	title: string;
	description?: string;
}

/** A page hero: a landscape crop and a separately framed portrait one. */
export interface HeroImage {
	desktop: Picture;
	mobile: Picture;
	alt: string;
	attribution?: Attribution;
}

/**
 * A page's own metadata, exported from the `meta.ts` beside its `+page.svelte`.
 *
 * This is what the card grids, the header menu, the footer columns and the sitemap read. It sits
 * in its own module rather than in the page component so the manifest can glob every page's
 * metadata without pulling 46 component bundles in with it.
 */
export interface PageMeta {
	/** Canonical site URL, with a trailing slash. Asserted against the route path by a test. */
	url: string;
	title: string;
	description?: string;
	/** Used wherever the nav lists are tight on space. Falls back to `title`. */
	shortTitle?: string;
	/** Collection membership. Drives the nav lists, the card grids and the infobox facets. */
	tags: string[];
	/** Name of the collection this page shows a card grid for. */
	related?: string;
	/** Path to an SVG shown on this page's card, in place of a photo. */
	icon?: string;
	/** Card thumbnail. Imported with `&enhanced` so the card grid can render a `<picture>`. */
	thumb?: Picture;
	thumbAttribution?: Attribution;
	/** ISO date of the last substantive update, used for the sitemap's `lastmod`. */
	date?: string;
	/** Page-specific addition to the footer's acknowledgement of Country. */
	country?: string;
	/** Latitude/longitude for the `ICBM` meta tag. */
	icbm?: string;
	/** Keeps the page routable but out of every nav list and card grid. */
	excludeFromCollections?: boolean;
}

/** A page as it appears in a footer or menu list. */
export interface NavItem {
	url: string;
	title: string;
	/** `shortTitle` where one exists, since the nav lists are tight on space. */
	shortName: string;
}
