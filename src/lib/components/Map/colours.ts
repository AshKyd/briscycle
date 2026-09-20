/**
 * The map palette.
 *
 * A leaf module with no imports of its own, deliberately: the legend needs these values on
 * every page that shows a map, while the code that draws the map pulls in maplibre and the
 * 26KB style document. Keeping the colours separate is what lets the heavy modules stay behind
 * a dynamic import instead of being dragged into the page chunk.
 */

/** A marked cycle lane on the road network. */
export const COLOUR_CYCLEWAY_LANE = '#88dd88';

/** A shoulder or shared road — riding is tolerated rather than provided for. */
export const COLOUR_CYCLEWAY_OTHER = '#ddc688ff';

/** On-road sections of a marked route. */
export const ON_ROAD_COLOUR = '#666';

/** Route colour used when a page does not pick one. */
export const DEFAULT_ROUTE_COLOUR = '#00ff00';

/** Casing drawn beneath a route so it stays legible against the basemap. */
export const ROUTE_CASING_COLOUR = '#fff';
