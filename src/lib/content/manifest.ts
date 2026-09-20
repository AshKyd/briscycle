import { byCollectionOrder } from './order.ts';
import type { NavItem, PageMeta } from '../types.ts';

/**
 * Every page's metadata, gathered at build time from the `meta.ts` beside each `+page.svelte`.
 *
 * This replaces the old filesystem crawl of `content/`. Because the glob is eager, the whole
 * site structure is a compile-time constant: the menu, the footer columns and the card grids are
 * one shared, cached JS chunk rather than a `siteData` payload serialised into all 46 pages.
 */
const modules = import.meta.glob<{ meta: PageMeta }>('/src/routes/**/meta.ts', { eager: true });

/** `/src/routes/brisbane-city/riverwalk/meta.ts` → `/brisbane-city/riverwalk/`. */
export function urlFromMetaPath(path: string): string {
	const directory = path.replace('/src/routes', '').replace(/\/meta\.ts$/, '');
	return `${directory}/`;
}

/** Each page's metadata paired with the route path it was globbed from. */
export const entries = Object.entries(modules)
	.map(([path, module]) => ({ routeUrl: urlFromMetaPath(path), meta: module.meta }))
	.toSorted((a, b) => byCollectionOrder(a.meta, b.meta));

export const pages: PageMeta[] = entries.map(({ meta }) => meta);

export const byUrl = new Map(pages.map((meta) => [meta.url, meta]));

/**
 * Pages grouped by tag. Pages opted out with `excludeFromCollections` are omitted, which is how
 * the unbuilt Neville Bonner Bridge page stays out of the nav while remaining routable.
 */
export const collections: Record<string, PageMeta[]> = pages
	.filter(({ excludeFromCollections }) => !excludeFromCollections)
	.reduce<Record<string, PageMeta[]>>((grouped, meta) => {
		meta.tags.forEach((tag) => {
			grouped[tag] = [...(grouped[tag] ?? []), meta];
		});
		return grouped;
	}, {});

const list = (tag: string) => collections[tag] ?? [];

const toNavItem = ({ url, title, shortTitle }: PageMeta): NavItem => ({
	url,
	title,
	shortName: shortTitle ?? title
});

export const menu: NavItem[] = list('menu').map(toNavItem);

export const footer: Record<
	'brisbane' | 'day-trips' | 'moreton-bay' | 'rules' | 'legal',
	NavItem[]
> = {
	brisbane: list('brisbane').map(toNavItem),
	'day-trips': list('day-trips').map(toNavItem),
	'moreton-bay': list('moreton-bay').map(toNavItem),
	rules: list('rules').map(toNavItem),
	legal: list('legal').map(toNavItem)
};
