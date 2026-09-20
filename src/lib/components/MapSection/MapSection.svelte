<script lang="ts">
	import Map from '$lib/components/Map/Map.svelte';
	import type { MapConfig } from '$lib/types';

	interface Props {
		config: MapConfig;
	}

	let { config }: Props = $props();
</script>

<div id="map" class="wide-container map__wrap">
	<div class="container">
		<h2 class="type-serif">{config.title}</h2>
		{#if config.description}
			<p class="map__description">{config.description}</p>
		{/if}
		<Map
			geojsonUrl={config.geojsonUrl}
			centre={config.centre}
			zoom={config.zoom}
			height={config.height}
			bigMap={config.bigMap}
			colour={config.colour}
			googleMaps={config.googleMaps}
		/>
	</div>
</div>
