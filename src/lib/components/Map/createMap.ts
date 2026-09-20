import type { FeatureCollection } from 'geojson';
import maplibregl from 'maplibre-gl';
// maplibre styles its own controls, popups and attribution, which it injects outside any
// component. Imported here so the stylesheet loads with the engine rather than on every page.
import 'maplibre-gl/dist/maplibre-gl.css';
import { DEFAULT_ROUTE_COLOUR } from './colours.ts';
import { addRouteLayers, allCoordinates, popupPoints } from './mapLayers.ts';
import { getStyle } from './style.ts';

/** Bounds of south-east Queensland; panning beyond them serves no purpose here. */
const MAX_BOUNDS: [number, number, number, number] = [151.853, -28.48, 154.366, -26.249];

const ATTRIBUTION = [
	'<a href="https://www.openstreetmap.org/copyright">© OpenStreetMap contributors</a>',
	'<a class="donate-attr" href="https://supporting.openstreetmap.org/">Donate to OSM</a>',
	'Powered by MapLibre.',
	'<br/>Please exercise caution in unfamiliar areas.'
].join(' ♥ ');

export interface CreateMapOptions {
	container: HTMLElement;
	/** The route to draw, if the page has one. */
	route?: FeatureCollection;
	centre: [number, number];
	zoom: number;
	/** A full-page map: takes over the URL hash and drops the gesture guard. */
	bigMap: boolean;
	colour?: string;
	/** Called when the map has finished moving, for analytics. */
	onMoveEnd?: () => void;
}

export interface CreatedMap {
	map: maplibregl.Map;
	/** Resolves once the route is drawn, reporting whether it has on-road sections. */
	ready: Promise<{ hasOnRoad: boolean }>;
}

/**
 * Build a configured map and draw a route on it.
 *
 * Everything expensive lives behind this one module — maplibre itself, the style document and
 * the layer construction — so `Map.svelte` reaches it through a single dynamic import and
 * map-less pages download none of it.
 */
export function createMap({
	container,
	route,
	centre,
	zoom,
	bigMap,
	colour = DEFAULT_ROUTE_COLOUR,
	onMoveEnd
}: CreateMapOptions): CreatedMap {
	const map = new maplibregl.Map({
		container,
		style: getStyle(),
		center: centre,
		zoom,
		maxBounds: MAX_BOUNDS,
		// Inline maps sit inside scrollable prose, so they require a deliberate gesture.
		cooperativeGestures: !bigMap,
		hash: bigMap,
		attributionControl: false
	});

	map.addControl(new maplibregl.NavigationControl());
	map.addControl(
		new maplibregl.AttributionControl({ compact: true, customAttribution: ATTRIBUTION })
	);

	if (onMoveEnd) map.on('moveend', onMoveEnd);

	const ready = new Promise<{ hasOnRoad: boolean }>((resolve) => {
		map.on('load', () => {
			if (!route) return resolve({ hasOnRoad: false });

			addPopups(map, route);
			const { hasOnRoad } = addRouteLayers(map, route, 'route', colour);
			fitToRoute(map, route);
			resolve({ hasOnRoad });
		});
	});

	return { map, ready };
}

/** Points carrying `properties.html` become markers with a popup. */
function addPopups(map: maplibregl.Map, route: FeatureCollection) {
	popupPoints(route).forEach((point) => {
		const popup = new maplibregl.Popup({ closeButton: true })
			.setHTML(point.properties?.html as string)
			.setMaxWidth('300px');

		new maplibregl.Marker()
			.setLngLat(point.geometry.coordinates as [number, number])
			.addTo(map)
			.setPopup(popup);
	});
}

/** Frame the whole route, overriding the page's configured centre and zoom. */
function fitToRoute(map: maplibregl.Map, route: FeatureCollection) {
	const coordinates = allCoordinates(route);
	if (coordinates.length === 0) return;

	const [first] = coordinates as [number, number][];
	const bounds = coordinates.reduce(
		(box, coordinate) => box.extend(coordinate as [number, number]),
		new maplibregl.LngLatBounds(first, first)
	);

	map.fitBounds(bounds, { padding: 60 });
}
