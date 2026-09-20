<script lang="ts">
	import ArticlePage from '$lib/components/ArticlePage/ArticlePage.svelte';
	import Ad from '$lib/components/Ad/Ad.svelte';
	import Image from '$lib/components/Image/Image.svelte';
	import Youtube from '$lib/components/Youtube/Youtube.svelte';
	import { meta } from './meta.ts';
	import heroDesktop from './PXL_20240624_040527927-desktop.jpg?w=768;1080;1366;1920;2560;3840&format=webp;jpeg&enhanced';
	import heroMobile from './PXL_20240624_040527927-mobile.jpg?w=540;768;1080;1440&format=webp;jpeg&enhanced';
	import PXL_20220913_062948842_upscale_0 from './PXL_20220913_062948842_upscale.jpg?w=540;768;1080;1440;1920&format=webp;jpeg&enhanced';
</script>

<ArticlePage
	{meta}
	hero={{
		desktop: heroDesktop,
		mobile: heroMobile,
		alt: 'The Norman Park bridge crosses the mangroves of Norman Creek, with Brisbane City in the background.'
	}}
	map={{
		geojsonUrl: '/brisbane-city/norman-creek-bikeway/norman-creek.geo.json'
	}}
>
	<p>
		The Norman Creek bikeway follows Norman Creek from Norman Park to Stones Corner and on to
		Tarragindi.
	</p>
	<p>
		It's one of the older, more circuitous bikeways and is more of a school route than a commuter
		route. But it's a good trail to explore the creeks and parks in the area, stop off at Stones
		Corner for a meal, or as a leisurely city loop via the <a
			href="/brisbane-city/east-brisbane-bikeway/">East Brisbane bikeway</a
		>
		and the <a href="/brisbane-city/southeast-freeway-bikeway/">V1 veloway</a>.
	</p>
	<p>
		The route is popular with joggers and walkers, and is fairly narrow. It's best to go at a slow
		pace and make sure you have a working bell.
	</p>
	<h2>Getting to the Norman Creek bikeway</h2>
	<p>
		The southernmost section of the bikeway connects directly to the <a
			href="/brisbane-city/southeast-freeway-bikeway/">V1 veloway</a
		> alongside the M1 motorway, but the northern sections don't connect to much.
	</p>
	<p>If you're up for a bit of footpath riding, you can get to it from the V1 at O'Keefe Street.</p>
	<Ad loadsScript />
	<h2>Regeneration &amp; rewilding Norman Creek</h2>
	<Image
		src={PXL_20220913_062948842_upscale_0}
		alt="A concrete drain empties into a freshly planted creek system, with rocks, vegetation and grasslands"
		align="right"
		caption="The freshly rejuvenated Norman Creek (2022)"
	/>
	<p>The Norman Creek 2012-2031 Master Plan aims to rejuvenate the Norman Creek catchment.</p>
	<p>
		The project aims to replace the concrete drainage with a more resilient planted ecosystem,
		expanding bike connections, creating shaded sub-tropical habitats to hang out, and generally
		make it a nicer place to be.
	</p>
	<p>
		The first phase has already been planted at Stones Corner where you can enjoy picnic and bbq
		areas, admire the stream, or play some basketball on the public court.
	</p>
	<p>
		The bikeway winds through this section, connecting the Buranda State School end with the
		sporting grounds to the south.
	</p>
	<p>
		If you're interested in the back story, this video explains the ecological benefits to projects
		like these:
	</p>
	<Youtube
		url="https://www.youtube.com/watch?v=Mcr6yTCc14Y"
		title="Part of Norman Creek has been rejuvenated and ‘naturalised’, making it a great place to hang out and enjoy nature"
	/>
</ArticlePage>
