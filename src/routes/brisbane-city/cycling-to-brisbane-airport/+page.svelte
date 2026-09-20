<script lang="ts">
	import ArticlePage from '$lib/components/ArticlePage/ArticlePage.svelte';
	import { meta } from './meta.ts';
	import heroDesktop from './brisbane-airport-hero-desktop.jpg?w=768;1080;1366;1920;2560;3840&format=webp;jpeg&enhanced';
	import heroMobile from './brisbane-airport-hero-mobile.jpg?w=540;768;1080;1440&format=webp;jpeg&enhanced';
</script>

<ArticlePage
	{meta}
	hero={{
		desktop: heroDesktop,
		mobile: heroMobile,
		alt: 'Brisbane International Airport parking garage and service roads',
		attribution: {
			name: 'NellCR',
			title: 'Brisbane Airport',
			url: 'https://www.flickr.com/photos/nellcr/7687587582/',
			license: 'https://creativecommons.org/licenses/by-sa/2.0/'
		}
	}}
	map={{
		centre: [153.09, -27.413],
		zoom: 15
	}}
>
	<h2>Riding to DFO</h2>
	<p>You can get to DFO, the Woolworths and Airport Village by bike very comfortably.</p>
	<p>
		A dedicated cycleway runs from Nudgee Road at Schulz canal (near the Jim Soorley bikeway), then
		connects to the overpass over Airport Drive.
	</p>
	<h2>Riding to the Brisbane Airport</h2>
	<p>
		If you want to ride a bike to Brisbane Airport you'll need to be confident with on-road cycling.
		The official route is different depending on whether you're inbound or outbound.
	</p>
	<p>
		Heading toward the airport, you'll need to take a more circuitous route along Qantas Drive to
		avoid several dangerous crossings. Heading outbound you can just take Airport Drive most of the
		way.
	</p>
	<p>The following map from Brisbane Airport shows the recommended routes:</p>
	<img
		src="airport-map.svg"
		alt="Map of the airport showing a confusing cycleway route"
		style="background:white"
	/>
	<p>Bike parking and showers are available at both terminals.</p>
	<ul>
		<li>
			International terminal bike racks are on level 5 of the parking garage, beside the lift.
		</li>
		<li>Domestic termainal bike racks are on level 1 of the P1 car park, near the lifts.</li>
	</ul>
	<p>
		For the most up to date information on getting to the Brisbane Airport, check the <a
			href="https://www.bne.com.au/passenger/to-and-from/transport-options">The BAC Website</a
		>.
	</p>
</ArticlePage>
