/**
 * Canonical ordering for every collection.
 *
 * Eleventy ordered collections by date, which for this site meant file mtime — unreproducible
 * across a fresh checkout. This list captures the ordering the published site actually had,
 * extracted from the last Eleventy build, so the menu, footer columns and card grids stay
 * exactly as they were. Pages absent from this list sort last, alphabetically by URL.
 *
 * To reorder a page, move its URL here.
 */
export const COLLECTION_ORDER: readonly string[] = [
	'/bicycle-regulation/',
	'/day-trips/',
	'/gold-coast/',
	'/moreton-bay/',
	'/brisbane-city/',
	'/brisbane-city/cycle-centres/',
	'/brisbane-city/cycling-to-brisbane-airport/',
	'/brisbane-city/kurilpa-bridge/',
	'/brisbane-city/northern-bikeway/',
	'/brisbane-city/east-brisbane-bikeway/',
	'/brisbane-city/riverwalk/',
	'/brisbane-city/bicentennial-bikeway/',
	'/brisbane-city/breakfast-creek-bridge/',
	'/brisbane-city/southeast-freeway-bikeway/',
	'/brisbane-city/western-freeway-bikeway/',
	'/brisbane-city/norman-creek-bikeway/',
	'/brisbane-city/kangaroo-point-bridge/',
	'/brisbane-city/goodwill-bridge/',
	'/brisbane-city/river-loop/',
	'/brisbane-city/bike-hire-in-brisbane/',
	'/day-trips/kedron-brook-cycleway/',
	'/day-trips/kedron-brook-cycleway/jim-soorley-bikeway/',
	'/day-trips/kedron-brook-cycleway/nudgee-beach/',
	'/day-trips/brisbane-valley-rail-trail/',
	'/day-trips/lake-samsonvale/',
	'/day-trips/samford-rail-trail/',
	'/moreton-bay/boondall-wetlands/',
	'/day-trips/wamuran-rail-trail/',
	'/day-trips/macleay-island/',
	'/moreton-bay/bribie-island/',
	'/moreton-bay/gateway-bridge-cycleway/',
	'/moreton-bay/hornibrook-bridge/',
	'/moreton-bay/redcliffe/',
	'/moreton-bay/sandgate-shorncliffe/',
	'/moreton-bay/redland-city/',
	'/bicycle-regulation/bikes-and-alcohol/',
	'/bicycle-regulation/bikes-on-public-transport/',
	'/bicycle-regulation/bike-laws-and-guidelines/',
	'/accessibility-statement/',
	'/code-of-conduct/',
	'/privacy-policy/',
	'/terms-of-service/',
	'/sustainability/'
];

const rank = new Map(COLLECTION_ORDER.map((url, index) => [url, index]));

/** Sort comparator placing pages in the canonical order, unknown pages last. */
export function byCollectionOrder(a: { url: string }, b: { url: string }): number {
	const [rankA, rankB] = [a, b].map(({ url }) => rank.get(url) ?? Number.MAX_SAFE_INTEGER);
	return rankA === rankB ? a.url.localeCompare(b.url) : rankA - rankB;
}
