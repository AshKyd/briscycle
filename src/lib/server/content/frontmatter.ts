import type { FeatureCollection, Feature } from 'geojson';
import type {
	Attribution,
	Frontmatter,
	Geo,
	Hero,
	Layout,
	Thumb
} from '../../types.ts';

const LAYOUTS: readonly Layout[] = ['page', 'custom', 'bigmap'];

type Raw = Record<string, unknown>;

/** Narrow an unknown front matter value to a plain object, or undefined. */
const asObject = (value: unknown): Raw | undefined =>
	value && typeof value === 'object' && !Array.isArray(value) ? (value as Raw) : undefined;

const asString = (value: unknown): string | undefined =>
	typeof value === 'string' && value.trim() !== '' ? value : undefined;

const asNumber = (value: unknown): number | undefined => {
	if (value === undefined || value === null || value === '') return undefined;
	const parsed = Number(value);
	return Number.isFinite(parsed) ? parsed : undefined;
};

function parseAttribution(value: unknown): Attribution | undefined {
	const raw = asObject(value);
	if (!raw) return undefined;
	const [name, title, url, license] = [raw.name, raw.title, raw.url, raw.license].map(asString);
	if (!name || !title || !url || !license) return undefined;
	return { name, title, url, license };
}

function parseHero(value: unknown, file: string): Hero | undefined {
	const raw = asObject(value);
	if (!raw) return undefined;

	const alt = asString(raw.alt) ?? '';
	const attribution = parseAttribution(raw.attribution);

	const [desktop, mobile] = [raw.desktop, raw.mobile].map(asString);
	if (desktop && mobile) return { type: 'autoImage', alt, desktop, mobile, attribution };

	throw new Error(`Unrecognised hero shape in ${file}`);
}

function parseThumb(value: unknown, file: string): Thumb | undefined {
	const raw = asObject(value);
	if (!raw) return undefined;

	const attribution = parseAttribution(raw.attribution);
	const source = asString(raw.source);
	if (source) return { type: 'generated', source, attribution };

	throw new Error(`Unrecognised thumb shape in ${file}`);
}

/** Coerce the legacy `geo` block, whose lat/lng/zoom are strings rather than numbers. */
function parseGeo(value: unknown): Geo | undefined {
	const raw = asObject(value);
	if (!raw) return undefined;

	return {
		lat: asNumber(raw.lat),
		lng: asNumber(raw.lng),
		zoom: asNumber(raw.zoom),
		height: asString(raw.height),
		bigMap: raw.bigMap === true,
		colour: asString(raw.colour),
		geojsonUrl: asString(raw.geojsonUrl),
		googleMaps: asString(raw.googleMaps)
	};
}

const isFeatureCollection = (value: unknown): value is FeatureCollection =>
	asObject(value)?.type === 'FeatureCollection' && Array.isArray(asObject(value)?.features);

/**
 * Normalise inline `geojson` front matter into a single FeatureCollection.
 *
 * Six pages declare an array of collections. The legacy map viewer only ever read `[0]` and
 * silently dropped the rest; merging the features restores the routes those pages intended
 * to show. One page has the junk value `[false]`, which yields no collection at all.
 */
function parseGeojson(value: unknown): FeatureCollection | undefined {
	const collections = (Array.isArray(value) ? value : [value]).filter(isFeatureCollection);
	if (collections.length === 0) return undefined;

	const features = collections.flatMap(({ features: f }) => f as Feature[]);
	return { type: 'FeatureCollection', features };
}

/** `mapTitle` is a string on three pages and the boolean `false` on `/map/`. */
const parseMapTitle = (value: unknown): string | undefined =>
	typeof value === 'string' ? value : undefined;

/** Parse and validate one file's raw YAML front matter. Throws on shapes we cannot render. */
export function parseFrontmatter(raw: Raw, file: string): Frontmatter {
	const title = asString(raw.title);
	if (!title) throw new Error(`Missing title in ${file}`);

	const layout = asString(raw.layout) as Layout | undefined;
	if (!layout || !LAYOUTS.includes(layout)) {
		throw new Error(`Unknown layout "${raw.layout}" in ${file}`);
	}

	const tags = Array.isArray(raw.tags)
		? raw.tags.filter((tag): tag is string => typeof tag === 'string')
		: [];

	return {
		title,
		layout,
		tags,
		description: asString(raw.description),
		shortTitle: asString(raw.shortTitle),
		related: asString(raw.related),
		permalink: asString(raw.permalink),
		icon: asString(raw.icon),
		hero: parseHero(raw.hero, file),
		thumb: parseThumb(raw.thumb, file),
		geo: parseGeo(raw.geo),
		geojson: parseGeojson(raw.geojson),
		mapTitle: parseMapTitle(raw.mapTitle),
		mapDescription: asString(raw.mapDescription),
		openDate: asString(raw.openDate),
		country: asString(raw.country),
		classNames: asString(raw.classNames),
		showHeader: raw.showHeader !== false,
		robots: asString(raw.robots),
		governingLaw: asString(raw.governingLaw),
		date: raw.date instanceof Date ? raw.date.toISOString() : asString(raw.date),
		excludeFromCollections: raw.eleventyExcludeFromCollections === true
	};
}
