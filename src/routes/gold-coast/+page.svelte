<script lang="ts">
	import ArticlePage from '$lib/components/ArticlePage/ArticlePage.svelte';
	import { meta } from './meta.ts';
</script>

<ArticlePage
	{meta}
	map={{
		geojsonUrl: '/geo/gold-coast.geo.json'
	}}
>
	<p>
		The Gold Coast is a great place to cycle as a commuter, and even better as a sightseer. The
		local council has placed an emphasis on bicycle infrastructure, so you'll find plenty of bike
		paths linking the coast and inland areas of the Gold Coast.
	</p>
	<h2>Cycling The Esplanade</h2>
	<p>
		The Esplanade is a dedicated on-and off-road cycleway that runs the full length of the Gold
		Coast from top to bottom.
	</p>
	<p>
		The northern sections of this bikeway are mostly off-road, though some areas further south are
		on-road with cycle lanes. The off-road sections consist of shared pedestrian-bike path and can
		sometimes get crowded, so if you're in a hurry you may prefer to ride on the road anyway.
	</p>
	<h2>Veloway 1 (V1 Cycleway)</h2>
	<p>
		The V1 bikeway links Brisbane and the Gold Coast, allowing you to cycle nearly the entire
		distance between the two cities on dedicated infrastructure.
	</p>
	<p>
		The project to deliver the V1 cycleway is ongoing, with some sections in the Logan City area
		reverting to plain roadway, however the project is ongoing with the final stage due to start
		construction in 2015, subject to funding.
	</p>
	<p>
		The V1 bikeway follows <a href="/brisbane-city/southeast-freeway-bikeway/">adjacent the M3</a> and
		M1 motorways between Brisbane and the Gold Coast. Toward the Brisbane end of the route is primarily
		off-road cycleway, and much of the Gold Coast end consists of on-road cycle lanes.
	</p>
	<p>
		The V1 cycleway ends in Helensvale, however a bikeway continues along Napper Road toward the
		coast. Other exits to get to the Gold Coast include the Gold Coast Highway and Hope Island Road.
	</p>
	<p>
		A map of the Veloway 1 cycleway is provided below for reference, including incomplete sections.
	</p>
</ArticlePage>
