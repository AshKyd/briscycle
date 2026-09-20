<script lang="ts">
	import ArticlePage from '$lib/components/ArticlePage/ArticlePage.svelte';
	import Ad from '$lib/components/Ad/Ad.svelte';
	import Image from '$lib/components/Image/Image.svelte';
	import Youtube from '$lib/components/Youtube/Youtube.svelte';
	import { meta } from './meta.ts';
	import heroDesktop from './PXL_20211113_031204967.MP-desktop.jpg?w=768;1080;1366;1920;2560;3840&format=webp;jpeg&enhanced';
	import heroMobile from './PXL_20211113_031204967.MP.jpg?w=540;768;1080;1440&format=webp;jpeg&enhanced';
	import pats_park_0 from './pats-park.jpg?w=540;768;1080;1440;1920&format=webp;jpeg&enhanced';
</script>

<ArticlePage
	{meta}
	hero={{
		desktop: heroDesktop,
		mobile: heroMobile,
		alt: 'Coondooroopa Beach - waves lap at a sandy beach at low tide, there are beach shacks on the shore and trees stretching in the distance. Nobody is around.'
	}}
	map={{
		centre: [153.358, -27.604],
		zoom: 8,
		geojsonUrl: '/geo/day-trips--macleay-island.geo.json',
		title: 'Macleay Island travel map'
	}}
>
	<p>Macleay Island is a small island off the coast of Redland Bay.</p>
	<p>
		There are no major tourist attractions, although it's a fantastic area to take a day trip and
		explore. Most of the roads are cycle friendly, and there is an off-road cycleway that runs most
		of the length of the island, so it's a great place to get around by bike.
	</p>
	<Ad loadsScript />
	<p>
		There is a rather steep hill to climb to get out of the ferry terminal, but don't let that
		discourage you, most of the island is flat and quite easy to cycle.
	</p>
	<h3>Facilities</h3>
	<Image
		src={pats_park_0}
		alt="Shady trees on the shoreline in front of a beach with a protective net."
		align="right"
		caption="Cool off at the protected beach at Pats Park"
	/>
	<p>
		The island is highly cycle friendly, and most destinations have racks or space to lock up your
		bike. Drinking water is available at parks around the island, but definitely make sure to bring
		a water bottle.
	</p>
	<p>
		There's a Spar supermarket near the ferry terminal to pick up essentials, and a couple of shops
		dotted about the island along High Central Road.
	</p>
	<p>
		If you're looking for a meal, there are plenty of places to eat about the island. Stop by at the
		pub near the fery terminal, grab fish &amp; chips on the way north, or enjoy the air
		conditioning at the Blue Parrot Cafe.
	</p>
	<p>
		There's a protected beach at the north end of the island at Pats Park where you can take a dip
		without worrying about bull sharks, as well as
	</p>
	<h2>Getting to Macleay Island</h2>
	<p>
		Ferries to the island generally run every half hour from Redland Bay Marina (200m south of the
		vehicle ferry, see it here on <a
			href="https://www.google.com/maps/place/Redland+Bay+Marina/@-27.6173227,153.3107938,17z"
			>Google Maps</a
		>). A return passenger ticket costs just shy of $15.00.
	</p>
	<p>
		If you're coming from Brisbane, you can ride from Cleveland Train Station. The most direct route
		is a 13.5 km trek along Cleveland Redland Bay Road, but it's mostly without cycle lanes, and in
		some places without footpaths.
	</p>
	<Ad />
	<p>
		Redland Bay Council recommends riding the <a href="/moreton-bay/">Moreton Bay Cycleway</a> from the
		train station, which runs a much longer and more scenic route along the coast. Either way, this much
		cycling you might want to make it a weekend trip.
	</p>
	<h2>Check out the video</h2>
	<p>
		If you want to see the full train to Cleveland, bike to the ferry, and ride around the island,
		check out the video below: (don't forget to like and subscribe!)
	</p>
	<Youtube
		url="https://www.youtube.com/watch?v=oL04V1PMEUo&amp;list=PLNAiXhy9-wI6AizT1V26NVt7vpr1mtmq1&amp;index=2&amp;t=412s"
		title="Visiting Macleay Island by bike vlog"
	/>
</ArticlePage>
