<script lang="ts">
	import ArticlePage from '$lib/components/ArticlePage/ArticlePage.svelte';
	import Image from '$lib/components/Image/Image.svelte';
	import { meta } from './meta.ts';
	import heroDesktop from './hero-desktop.webp?w=768;1080;1366;1920;2560;3840&format=webp;jpeg&enhanced';
	import heroMobile from './hero-mobile-1440.webp?w=540;768;1080;1440&format=webp;jpeg&enhanced';
	import PXL_20230506_044442943_0 from './PXL_20230506_044442943.jpg?w=540;768;1080;1440;1920&format=webp;jpeg&enhanced';
</script>

<ArticlePage
	{meta}
	hero={{
		desktop: heroDesktop,
		mobile: heroMobile,
		alt: 'A low set concrete bridge spans a vast river. A man and child stand on the jetty.'
	}}
	map={{
		geojsonUrl: '/moreton-bay/gateway-bridge-cycleway/gateway.geo.json'
	}}
>
	<p>
		The Gateway Bridge (Sir Leo Hielscher Bridges) forms a significant part of the new <a
			href="/moreton-bay/">Moreton Bay Cycleway</a
		>.
	</p>
	<p>
		The eastern bridge has a 2.8 km long, 4.5 metre wide pedestrian and cycle lane that takes you
		from Eagle Farm to Murrarie. The bridge has a grade of around 5.3% on both sides and a peak
		elevation level of around 64.52m.
	</p>
	<p>
		The two bridges are currently a tollway for motorists but you can scoot, ride, or walk across
		for free.
	</p>
	<Image
		src={PXL_20230506_044442943_0}
		alt="The Sir Leo Hielscher Bridges from the air"
		align="right"
		caption="The cycleway is visible on the eastern bridge (pictured on the left)"
	/>
	<h2>Getting to the Gateway Bridge</h2>
	<p>
		On the north side there is an off-road bikeway spanning that takes you take you most of the way
		to Nudgee Road with only a little footpath riding.
	</p>
	<p>
		Kingsford Smith Drive is an industrial zone so there are a lot of trucks. Nevertheless there is
		green paint on the road so you can cycle on-road all the way to the Portside precinct where you
		can join up with the off-road cycleway along the remanider of Kingsford Smith Drive.
	</p>
	<p>
		On the south side of the bridge is a downhill chicane that takes you to Murrarie Recreation Hub
		where you can enjoy the river, do some fishing, or grab a beer at the pub if that's more your
		style. You can also get through to Murrarie Station on-road with painted bike lanes.
	</p>
	<h2>Sir Leo Hielscher</h2>
	<p>
		The name of the Gateway Bridge was changed to the Sir Leo Hielscher Bridges when the second
		bridge opened in 2010.
	</p>
	<p>
		Sir Leo Arthur Hielscher is a prominent Queensland figure. Now retired, he had more than fifty
		years' experience in government, the banking and finance industry, domestic and global financial
		markets, superannuation industry, and as an independent Company Director. He is acclaimed as one
		of the key figures responsible for transforming Queensland's economy in the late 20th century
		and early 21st century.
	</p>
	<h2>Fun facts about the bridges</h2>
	<p>
		There was an open day for the second bridge on the 16th of May 2010, which gave pedestrians a
		chance to walk the bridge for the first time. The bridge was initially open only to cars and
		trucks, but was later opened to pedestrians and cyclists.
	</p>
	<p>
		Despite being purpose-designed, the bridge encroaches on the Obstacle Limitation Surface (OLS)
		of the nearby Brisbane Airport by about 19.9m at the top of the light poles. If you're a plane
		spotter this is about as close as you'll get.
	</p>
</ArticlePage>
