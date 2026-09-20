<script lang="ts">
	import ArticlePage from '$lib/components/ArticlePage/ArticlePage.svelte';
	import Ad from '$lib/components/Ad/Ad.svelte';
	import { meta } from './meta.ts';
	import heroDesktop from './hero-desktop.webp?w=768;1080;1366;1920;2560;3840&format=webp;jpeg&enhanced';
	import heroMobile from './hero-mobile-1440.webp?w=540;768;1080;1440&format=webp;jpeg&enhanced';
</script>

<ArticlePage
	{meta}
	hero={{
		desktop: heroDesktop,
		mobile: heroMobile,
		alt: 'A featureless concrete bridge spanning over a vast bay, a green painted bike lane disappearing into the distance'
	}}
	map={{
		centre: [153.074, -27.267],
		zoom: 13,
		geojsonUrl: '/geo/moreton-bay--hornibrook-bridge.geo.json'
	}}
>
	<p>
		The Moreton Bay Cycleway currently crosses the vast Bramble Bay via the Ted Smout Memorial
		Bridge, between Brighton and Clontarf.
	</p>
	<p>
		Ted Smout Memorial Bridge which has segregated bicycle and pedestrian lanes. It's a smooth trip
		across, and especially nice with a tailwind.
	</p>
	<p>
		There is a purpose-built platform in the middle of the bridge that you can use for fishing or a
		rest stop half-way across, as well as a number of viewing platforms. See if you can spot any mud
		crabs scampering around in the shallows.
	</p>
	<Ad loadsScript />
	<h2>Hornibrook Bridge</h2>
	<p>
		The Hornibrook Bridge was a heritage listed bridge, and was considered the longest in the
		southern hemisphere when it was opened in 1935. Before it was demolished in 2010 it was
		considered the longest in the country, and the longest footbridge in the world.
	</p>
	<p>
		The bridge was closed to vehicle traffic in 1979 when the Houghton Highway opened parallel and
		was used for pedestrians and cycling until it was demolished in 2011 after rotting timbers made
		it unsound.
	</p>
	<p>
		It reopened as two piers at either end of the bridge, for fishing &amp; recreation. It's worth a
		stop to admire the art deco portals, enjoy the bay breezes, and catch your breath.
	</p>
</ArticlePage>
