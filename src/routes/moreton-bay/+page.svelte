<script lang="ts">
	import ArticlePage from '$lib/components/ArticlePage/ArticlePage.svelte';
	import { meta } from './meta.ts';
</script>

<ArticlePage
	{meta}
	map={{
		centre: [153.1, -27.354],
		zoom: 11,
		geojsonUrl: '/geo/moreton-bay.geo.json'
	}}
>
	<p>
		The Moreton Bay Regional Cycleway (MBRC) is collection of cycle paths and routes across 150
		kilometres of the Brisbane coastline.
	</p>
	<p>
		The cycleway spans three council areas, and while there's been programs to unify the signage for
		the entire length, there's still a number of areas where the signs are old or missing. If you're
		going to make a day trip of it, check the map of cycleways in Brisbane to find a good route.
	</p>
	<p>
		The cycleway runs on and off from <a href="bribie-island/">Bribie Island</a> to
		<a href="redland-city/">Redland Bay</a>
		via the <a href="gateway-bridge-cycleway/">Gateway Bridge bikeway</a>.
	</p>
	<h2>Moreton Bay Cycleway Route</h2>
	<p>Below is a suggested Moreton Bay Cycleway route.</p>
	<p>
		Not all sections are complete, some bits involve road or footpath connections, and most bits are
		“shared path” for both pedestrians and bikes.
	</p>
	<p>
		Some good sections include the picturesque <a href="redcliffe/">Redcliffe</a> peninsula, the
		remote <a href="boondall-wetlands/">Boondall Wetlands</a>, or the waterfront around
		<a href="redland-city/">Redland Bay</a>.
	</p>
	<p>
		For this reason, the cycleway is a leisurely ride, and you're unlikely to finish it in a day. We
		recommend picking a section close to home and making a day out of that. There are plenty of
		landmarks, little shops to grab lunch, and rail connections to get you back home.
	</p>
</ArticlePage>
