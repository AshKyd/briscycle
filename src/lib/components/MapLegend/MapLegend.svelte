<script lang="ts">
	import { ON_ROAD_COLOUR } from '$lib/components/Map/mapLayers';
	import { COLOUR_CYCLEWAY_OTHER } from '$lib/components/Map/style';

	interface Props {
		/** Colour the route's off-road sections are drawn in. */
		primaryColour: string;
		/** Whether the route includes on-road sections worth explaining. */
		hasOnRoad: boolean;
		/** Link to the same route in Google Maps, when the page provides one. */
		googleMaps?: string;
	}

	let { primaryColour, hasOnRoad, googleMaps }: Props = $props();
</script>

<aside class="map-meta">
	<div class="map-meta__legend">
		<ul class="map-meta__legend-list">
			<li class="map-meta__legend-item">
				<div class="map-meta__legend-line" style:background={primaryColour}></div>
				{hasOnRoad ? 'bike path/footpath/trail' : 'Route'}
			</li>
			<li class="map-meta__legend-item">
				<div class="map-meta__legend-line" style:background={COLOUR_CYCLEWAY_OTHER}></div>
				Shoulder/shared road
			</li>
			{#if hasOnRoad}
				<li class="map-meta__legend-item">
					<div class="map-meta__legend-line" style:background={ON_ROAD_COLOUR}></div>
					Road riding
				</li>
			{/if}
		</ul>
	</div>
	{#if googleMaps}
		<div class="map-meta__external">
			<a
				class="btn btn-secondary"
				href={googleMaps}
				target="_blank"
				rel="noopener"
				data-umami-event="map-meta-google"
			>
				<svg class="btn__icon" width="20" height="35" viewBox="0 0 20 35" aria-hidden="true">
					<path
						d="M10 0C4.5 0 0 4.5 0 10c0 7.5 10 25 10 25s10-17.5 10-25c0-5.5-4.5-10-10-10z"
						fill="#ea4335"
					/>
					<circle cx="10" cy="10" r="4" fill="#fff" />
				</svg>
				Open in Google Maps
			</a>
		</div>
	{/if}
</aside>
