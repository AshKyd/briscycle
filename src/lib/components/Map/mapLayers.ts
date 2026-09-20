import type { Feature, FeatureCollection, LineString, Point, Position } from 'geojson';
import type { LineLayerSpecification, Map as MapLibreMap } from 'maplibre-gl';
import { ON_ROAD_COLOUR, ROUTE_CASING_COLOUR } from './colours.ts';

/** Highway types treated as off-road riding, drawn in the route's primary colour. */
const OFF_ROAD_TYPES = ['path', 'cycleway', 'track'];

const isType =
	<T extends Feature['geometry']['type']>(type: T) =>
	(feature: Feature) =>
		feature.geometry.type === type;

const subset = (features: Feature[]): FeatureCollection => ({
	type: 'FeatureCollection',
	features
});

/** True when a line follows a road rather than a dedicated path. */
const isOnRoad = (feature: Feature): boolean => {
	const highway = feature.properties?.highway as string | undefined;
	return Boolean(highway) && !OFF_ROAD_TYPES.includes(highway as string);
};

const lineStyle = (
	colour: string,
	width: number
): Omit<LineLayerSpecification, 'id' | 'source'> => ({
	type: 'line',
	layout: { 'line-join': 'round', 'line-cap': 'round' },
	paint: { 'line-color': colour, 'line-width': width },
	filter: ['==', '$type', 'LineString']
});

/** Coordinates of every feature, flattened, for fitting the viewport to the route. */
export function allCoordinates(geojson: FeatureCollection): Position[] {
	return geojson.features.flatMap((feature) => {
		const { geometry } = feature;
		if (geometry.type === 'Point') return [(geometry as Point).coordinates];
		if (geometry.type === 'LineString') return (geometry as LineString).coordinates;
		return [];
	});
}

/** Point features that carry popup markup. */
export const popupPoints = (geojson: FeatureCollection): Feature<Point>[] =>
	geojson.features.filter(isType('Point')).filter((f) => f.properties?.html) as Feature<Point>[];

/**
 * Draw a route as three stacked layers: a white casing for contrast against the basemap, then
 * on-road sections in grey, then the off-road sections in the route's colour on top.
 *
 * Returns whether any on-road section exists, which the legend uses to decide whether to
 * explain the grey.
 */
export function addRouteLayers(
	map: MapLibreMap,
	geojson: FeatureCollection,
	prefix: string,
	primaryColour: string
): { hasOnRoad: boolean } {
	const lines = geojson.features.filter(isType('LineString'));
	const onRoad = lines.filter(isOnRoad);
	const offRoad = lines.filter((feature) => !isOnRoad(feature));

	const layers = [
		{ id: `${prefix}-casing`, data: subset(lines), style: lineStyle(ROUTE_CASING_COLOUR, 10) },
		{ id: `${prefix}-onroad`, data: subset(onRoad), style: lineStyle(ON_ROAD_COLOUR, 6) },
		{ id: `${prefix}-offroad`, data: subset(offRoad), style: lineStyle(primaryColour, 6) }
	];

	layers.forEach(({ id, data, style }) => {
		map.addSource(id, { type: 'geojson', data });
		map.addLayer({ id, source: id, ...style });
	});

	return { hasOnRoad: onRoad.length > 0 };
}
