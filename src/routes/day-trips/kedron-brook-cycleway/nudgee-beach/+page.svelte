<script lang="ts">
	import ArticlePage from '$lib/components/ArticlePage/ArticlePage.svelte';
	import { meta } from './meta.ts';
	import heroDesktop from './hero-desktop.webp?w=768;1080;1366;1920;2560;3840&format=webp;jpeg&enhanced';
	import heroMobile from './hero-mobile-1440.webp?w=540;768;1080;1440&format=webp;jpeg&enhanced';
</script>

<ArticlePage
	{meta}
	hero={{
		desktop: heroDesktop,
		mobile: heroMobile,
		alt: 'A boardwalk next to a creek, snaking through the mangroves.'
	}}
	map={{
		centre: [153.101, -27.345],
		zoom: 15
	}}
>
	<p>
		Nudgee Beach is a small costal town west of Brisbane, and is a popular cycle destination on
		weekends.
	</p>
	<p>
		It's not a highly developed tourist area, and it's a mud beach rather than sand, but the charm
		lay in the costal atmosphere.
	</p>
	<h2>What to do in Nudgee Beach</h2>
	<p>
		The main attraction to Nudgee Beach is the large park along the water. There's a Fish &amp;
		Chips shop along the main road, so many people take the trip out simply to have lunch at the
		seaside.
	</p>
	<p>
		If you're lucky, you'll stumble on the roving ice cream truck. Hot tip: lick quick. The hot sun
		is vengeful :)
	</p>
	<p>
		There's a serene boardwalk through the wetlands featuring a bird-hide for watching the wildlife.
		The route is a total round trip of 1.6km.
	</p>
	<p>
		There's also fishing and boat/canoe landing areas. The town offers a few basic cycling
		facilities including toilets and drinking water, although there's no designated parking so
		you'll have to find a pole if you wish to lock up.
	</p>
	<p>
		The <a href="/moreton-bay/boondall-wetlands/">Boondall Wetlands</a> boardwalk is also just out of
		town.
	</p>
	<h2>Cycling to Nudgee Beach</h2>
	<p>
		It's possible to ride to Nudgee Beach from Brisbane almost entirely off-road, and entirely from
		as far as Mitchelton along the <a href="/day-trips/kedron-brook-cycleway/"
			>Kedron Brook Cycleway</a
		>.
	</p>
	<p>
		There is a concrete cycleway that runs most of the way from the motorway and cycleway
		connections out to the beach. The cycleway ends just at the edge of town, but traffic is sparse
		and the cycle route follows the quiet residential Chaseley street.
	</p>
	<p>
		The cycleway branches off from the <a href="/moreton-bay/">Moreton Bay Cycleway</a> at Nudgee,
		between the <a href="/moreton-bay/boondall-wetlands/">Boondall Wetlands</a> and
		<a href="/day-trips/kedron-brook-cycleway/jim-soorley-bikeway/">Jim Soorley Bikeway</a> sections,
		so you can get the entire way to Nudgee Beach on cycleway from Nudgee, Boondall, Toombul, and beyond.
	</p>
</ArticlePage>
