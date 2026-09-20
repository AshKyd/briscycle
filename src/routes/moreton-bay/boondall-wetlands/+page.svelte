<script lang="ts">
	import ArticlePage from '$lib/components/ArticlePage/ArticlePage.svelte';
	import Ad from '$lib/components/Ad/Ad.svelte';
	import { meta } from './meta.ts';
	import heroDesktop from './hero-desktop.webp?w=768;1080;1366;1920;2560;3840&format=webp;jpeg&enhanced';
	import heroMobile from './hero-mobile.webp?w=540;768;1080;1440&format=webp;jpeg&enhanced';
</script>

<ArticlePage
	{meta}
	hero={{
		desktop: heroDesktop,
		mobile: heroMobile,
		alt: 'Boondall wetlands at sunset - the sky is orange and the wetlands are calm serene. An old bike path snakes off into the distance.'
	}}
	map={{
		centre: [153.083, -27.35],
		zoom: 14
	}}
>
	<p>
		The Moreton Bay Cycleway runs through the Boondall Wetlands between the Entertainment Centre and
		Nudgee Road.
	</p>
	<p>
		The wetlands ride is definitely a scenic route. If you're looking for a more direct north-south
		path, Sandgate Road has bicycle lanes from Nundah to Deagon and is much quicker, and the Gateway
		Motorway has a much more direct bikeway parallel.
	</p>
	<p>
		The wetlands ride is narrow compared to the rest of the MBC, and has a number of chicanes and
		small bridges to navigate. It's a fun ride, but don't expect to go racing.
	</p>
	<Ad loadsScript />
	<p>The wetlands leg of the MBC is a mixture of bitumen, concrete, and boardwalk.</p>
	<p>
		Some areas are subject to flooding after heavy rains. It's best to leave a day or two after rain
		before visiting otherwise you may find yourself cycling a lot of the way in water.
	</p>
	<p>
		The northern end of the Cycleway continues to Boondall Railway Station and the Brisbane
		Entertainment Centre.
	</p>
	<h3>What to do at Boondall Wetlands</h3>
	There's car parking available at Boondall Wetlands from 6 AM to 7 PM, so it serves as a good starting
	point to a day trip (north or south) on the<a href="/moreton-bay/">Moreton Bay Cycleway</a>.
	<p>
		There's cycle parking facilities as well as a <a
			href="http://www.brisbane.qld.gov.au/BCC:BASE::pc=PC_2786">wildlife centre</a
		>, picnic area and a walking trail, although you may want to bring insect repellant if you're
		planning to stop, because the mosquitos can be a nuisance.
	</p>
	<p>
		The Boondall Entertainment Centre to the west is also open to the public during the day, and
		there's short walking trails, a bike track, as well as picnic areas with electric barbecues.
	</p>
</ArticlePage>
