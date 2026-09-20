import { toCardSummary } from './cards.ts';
import { loadPages } from './loadContent.ts';
import { byCollectionOrder } from './order.ts';
import type { ContentFile, NavItem, SiteData } from '../../types.ts';


const toNavItem = ({ url, frontmatter }: ContentFile): NavItem => ({
	url,
	title: frontmatter.title,
	shortName: frontmatter.shortTitle ?? frontmatter.title
});

/**
 * Group pages by tag. Pages opted out with `eleventyExcludeFromCollections` are omitted, which
 * is how the unbuilt Neville Bonner Bridge page stays out of the nav while remaining routable.
 */
export function groupByTag(pages: ContentFile[]): Record<string, ContentFile[]> {
	const listed = pages
		.filter(({ frontmatter }) => !frontmatter.excludeFromCollections)
		.toSorted(byCollectionOrder);

	return listed.reduce<Record<string, ContentFile[]>>((collections, page) => {
		page.frontmatter.tags.forEach((tag) => {
			collections[tag] = [...(collections[tag] ?? []), page];
		});
		return collections;
	}, {});
}

/**
 * Build the site-wide data shared by every page: the header menu, the four footer columns and
 * the card metadata for every collection a page can point `related` at.
 *
 * This is emitted once as a shared module rather than returned from each page's load, so 47
 * pages do not each carry a copy of the same nav and card data.
 */
export async function buildSiteData(): Promise<SiteData> {
	const collections = groupByTag(await loadPages());
	const list = (tag: string) => collections[tag] ?? [];

	return {
		// Resolved when the site is generated, so the footer never shows a stale year and never
		// depends on the reader's clock (which would also break hydration).
		buildYear: new Date().getFullYear(),
		menu: list('menu').map(toNavItem),
		footer: {
			brisbane: list('brisbane').map(toNavItem),
			'day-trips': list('day-trips').map(toNavItem),
			'moreton-bay': list('moreton-bay').map(toNavItem),
			rules: list('rules').map(toNavItem),
			legal: list('legal').map(toNavItem)
		},
		cards: Object.fromEntries(
			Object.entries(collections).map(([tag, pages]) => [tag, pages.map(toCardSummary)])
		)
	};
}
