<script lang="ts">
	import type { FeatureCollection } from 'geojson';
	import MapLegend from '$lib/components/MapLegend/MapLegend.svelte';
	import { fireEvent } from '$lib/client/events';
	import { addRouteLayers, allCoordinates, popupPoints } from './mapLayers.ts';
	// maplibre styles its own controls, popups and attribution; they are injected outside this
	// component, so the stylesheet has to be global rather than scoped.
	import 'maplibre-gl/dist/maplibre-gl.css';
	import './Map.css';

	interface Props {
		/** URL of a GeoJSON route to draw. Fetched lazily, once the map mounts. */
		geojsonUrl?: string;
		/** A route supplied directly, as an alternative to `geojsonUrl`. */
		geojson?: FeatureCollection;
		/** Starting centre, used when there is no route to fit the viewport to. */
		centre?: [number, number];
		zoom?: number;
		/** CSS height of the map canvas. */
		height?: string;
		/** A full-page map: takes over the URL hash and drops the gesture guard. */
		bigMap?: boolean;
		/** Colour for the route's off-road sections. */
		colour?: string;
		/** Link to the same route in Google Maps, shown beside the legend. */
		googleMaps?: string;
	}

	let {
		geojsonUrl,
		geojson,
		centre = [153.02, -27.47],
		zoom = 8,
		height = '400px',
		bigMap = false,
		colour = '#00ff00',
		googleMaps
	}: Props = $props();

	let hasOnRoad = $state(false);

	/** Bounds of south-east Queensland; panning beyond them serves no purpose here. */
	const MAX_BOUNDS = [151.853, -28.48, 154.366, -26.249] as [number, number, number, number];

	/**
	 * Create the map once the container exists, and tear it down when it goes away.
	 *
	 * maplibre-gl is imported dynamically for two reasons: it touches `window` at module scope
	 * and would break prerendering, and it is large enough that map-less pages should not pay
	 * for it. The abort controller matters because a reader can navigate away while the route
	 * is still downloading, which would otherwise build a map into a detached container.
	 */
	function mapCanvas(container: HTMLElement) {
		const abort = new AbortController();
		let instance: import('maplibre-gl').Map | undefined;

		const start = async () => {
			const [{ Map, Marker, NavigationControl, Popup, AttributionControl, LngLatBounds }, { getStyle }] =
				await Promise.all([import('maplibre-gl'), import('./style.ts')]);

			const route = await loadRoute(abort.signal);
			if (abort.signal.aborted) return;

			instance = new Map({
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

			instance.addControl(new NavigationControl());
			instance.addControl(
				new AttributionControl({
					compact: true,
					customAttribution: [
						'<a href="https://www.openstreetmap.org/copyright">© OpenStreetMap contributors</a>',
						'<a class="donate-attr" href="https://supporting.openstreetmap.org/">Donate to OSM</a>',
						'Powered by MapLibre.',
						'<br/>Please exercise caution in unfamiliar areas.'
					].join(' ♥ ')
				})
			);

			if (bigMap) {
				instance.on('moveend', () => fireEvent('mapMove', { loc: location.hash.slice(1) }));
			}

			instance.on('load', () => {
				if (!instance || !route) return;

				popupPoints(route).forEach((point) => {
					const popup = new Popup({ closeButton: true })
						.setHTML(point.properties?.html as string)
						.setMaxWidth('300px');
					new Marker()
						.setLngLat(point.geometry.coordinates as [number, number])
						.addTo(instance!)
						.setPopup(popup);
				});

				hasOnRoad = addRouteLayers(instance, route, 'route', colour).hasOnRoad;

				const coordinates = allCoordinates(route);
				if (coordinates.length === 0) return;

				const bounds = coordinates.reduce(
					(box, coordinate) => box.extend(coordinate as [number, number]),
					new LngLatBounds(
						coordinates[0] as [number, number],
						coordinates[0] as [number, number]
					)
				);
				instance.fitBounds(bounds, { padding: 60 });
			});
		};

		start();

		return () => {
			abort.abort();
			instance?.remove();
		};
	}

	async function loadRoute(signal: AbortSignal): Promise<FeatureCollection | undefined> {
		if (geojson) return geojson;
		if (!geojsonUrl) return undefined;
		return fetch(geojsonUrl, { signal })
			.then((response) => response.json() as Promise<FeatureCollection>)
			.catch(() => undefined);
	}
</script>

<div class="map">
	<MapLegend primaryColour={colour} {hasOnRoad} {googleMaps} />
	<div class="inline-map" style:height {@attach mapCanvas}></div>
</div>
