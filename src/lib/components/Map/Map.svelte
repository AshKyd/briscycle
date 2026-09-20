<script lang="ts">
	import type { FeatureCollection } from 'geojson';
	import MapLegend from './MapLegend/MapLegend.svelte';
	import { fireEvent } from '$lib/client/events';
	import { DEFAULT_ROUTE_COLOUR } from './colours.ts';
	// Map.css styles the legend and the canvas placeholder, both of which render before the map
	// loads, so it stays in the page. maplibre's own stylesheet ships with the engine instead.
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
		colour = DEFAULT_ROUTE_COLOUR,
		googleMaps
	}: Props = $props();

	let hasOnRoad = $state(false);

	async function loadRoute(signal: AbortSignal): Promise<FeatureCollection | undefined> {
		if (geojson) return geojson;
		if (!geojsonUrl) return undefined;
		return fetch(geojsonUrl, { signal })
			.then((response) => response.json() as Promise<FeatureCollection>)
			.catch(() => undefined);
	}

	/**
	 * Build the map once the container exists, and tear it down when it goes away.
	 *
	 * The engine is imported dynamically: it pulls in maplibre, which touches `window` at module
	 * scope and would break prerendering, and which is large enough that map-less pages should
	 * not pay for it. The abort controller matters because a reader can navigate away while the
	 * route is still downloading, which would otherwise build a map into a detached container.
	 */
	function mapCanvas(container: HTMLElement) {
		const abort = new AbortController();
		let instance: import('maplibre-gl').Map | undefined;

		const start = async () => {
			const [{ createMap }, route] = await Promise.all([
				import('./createMap.ts'),
				loadRoute(abort.signal)
			]);
			if (abort.signal.aborted) return;

			const { map, ready } = createMap({
				container,
				route,
				centre,
				zoom,
				bigMap,
				colour,
				onMoveEnd: bigMap
					? () => fireEvent('mapMove', { loc: location.hash.slice(1) })
					: undefined
			});

			instance = map;
			hasOnRoad = (await ready).hasOnRoad;
		};

		start();

		return () => {
			abort.abort();
			instance?.remove();
		};
	}
</script>

<div class="map">
	<MapLegend primaryColour={colour} {hasOnRoad} {googleMaps} />
	<div class="inline-map" style:height {@attach mapCanvas}></div>
</div>
