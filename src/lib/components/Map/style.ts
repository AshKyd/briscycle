import type { StyleSpecification, LayerSpecification } from 'maplibre-gl';
import MAP_STYLE from './map-style.json' with { type: 'json' };

const COLOUR_CYCLEWAY_LANE = '#88dd88';
/** Roads where cycling is tolerated rather than provided for; also the legend swatch. */
export const COLOUR_CYCLEWAY_OTHER = '#ddc688ff';

/** How far the cycle casing extends past a path, in style units. */
const PATH_CASE = 0.25;
/** Roads are wider, so their casing needs more room to stay visible. */
const ROAD_CASE = 1;

/** A `{base, stops}` zoom function, the legacy style's line-width encoding. */
interface StopsFunction {
	base: number;
	stops: [number, number][];
}

const isLineLayer = (layer: LayerSpecification) =>
	layer.type === 'line' && ['road', 'path'].includes(layer.id.slice(0, 4));

/**
 * Build the cycle-lane casing for one road or path layer.
 *
 * The tileset carries a custom `cycle` attribute (`yus` for a real cycle lane, `kinda` for a
 * shoulder or shared road). Rather than drawing a separate line, the casing reuses the road's
 * own width as `line-gap-width` and draws slightly wider, which paints the cycle colour as two
 * thin strips down either side of the road.
 */
function toCasingLayer(layer: LayerSpecification): LayerSpecification {
	const casing = structuredClone(layer) as LayerSpecification & {
		filter: unknown[];
		paint: Record<string, unknown>;
	};

	casing.id = `${layer.id}_cycle-lane-casing`;
	casing.filter = [...casing.filter, ['in', 'cycle', 'yus', 'kinda']];

	const width = casing.paint['line-width'] as StopsFunction;
	const inset = layer.id.startsWith('path') ? PATH_CASE : ROAD_CASE;

	casing.paint['line-color'] = [
		'match',
		['get', 'cycle'],
		'kinda',
		COLOUR_CYCLEWAY_OTHER,
		COLOUR_CYCLEWAY_LANE
	];
	casing.paint['line-gap-width'] = width;
	casing.paint['line-width'] = {
		base: 2,
		stops: width.stops.map(([zoom, value]) => [zoom, value + inset])
	};

	return casing;
}

/**
 * The OpenStreetMap style with cycle infrastructure highlighted.
 *
 * Returns a fresh object every call. The legacy version mutated the imported style in place,
 * so a second map on the page inherited the casings the first had already added and then threw
 * on duplicate layer ids.
 */
export function getStyle(): StyleSpecification {
	const style = structuredClone(MAP_STYLE) as unknown as StyleSpecification;

	const insertionIndex = style.layers.findIndex(isLineLayer);
	if (insertionIndex === -1) return style;

	const casings = style.layers.filter(isLineLayer).map(toCasingLayer);

	style.layers = [
		...style.layers.slice(0, insertionIndex),
		...casings,
		...style.layers.slice(insertionIndex)
	];

	return style;
}
