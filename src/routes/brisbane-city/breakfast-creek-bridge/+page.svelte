<script lang="ts">
	import ArticlePage from '$lib/components/ArticlePage/ArticlePage.svelte';
	import Image from '$lib/components/Image/Image.svelte';
	import { meta } from './meta.ts';
	import heroDesktop from './hero-desktop.jpg?w=768;1080;1366;1920;2560;3840&format=webp;jpeg&enhanced';
	import heroMobile from './hero-mobile.jpg?w=540;768;1080;1440&format=webp;jpeg&enhanced';
	import PXL_20240313_083045287_MP_0 from './PXL_20240313_083045287.MP.jpg?w=540;768;1080;1440;1920&format=webp;jpeg&enhanced';
</script>

<ArticlePage
	{meta}
	hero={{ desktop: heroDesktop, mobile: heroMobile, alt: 'Yowoggera Bridge at night' }}
	map={{
		geojsonUrl: '/geo/brisbane-city--breakfast-creek-bridge.geo.json'
	}}
>
	<p>
		The Breakfast Creek / Yowoggera Bridge is an 80-meter arch span bridge and connects 175 meters
		between Newsted Park and the cycleway along Kingsford Smith Drive.
	</p>
	<p>
		It has dedicated pedestrian and cyclist paths away from vehicles, and includes drinking
		fountains and pause points to admire the parklands and river scenery.
	</p>
	<p>
		The bridge, which weighs over 300 tonnes, was built offsite and transported via barge to be
		installed over Breakfast Creek.
	</p>
	<p>
		The green colours of the green bridge were chosen to represent the leaves of the Moreton Bay fig
		tree.
	</p>
	<Image
		src={PXL_20240313_083045287_MP_0}
		alt="Joggers cross the bridge at sunset"
		align="right"
		caption="The bridge is a popular link to the north side"
	/>
	<h2>Getting to the Yowoggera Bridge</h2>
	<p>
		On the north the bridge connects to the bikeway along Kingsford Smith Drive to Hamilton, as well
		as Bowen Hills station precinct along Breakfast Creek.
	</p>
	<p>
		To the south, you can get to the city almost entirely off-road. From Newstead Park there are a
		handful of back streets and footpath stretches but you can follow the river around to the <a
			href="/brisbane-city/riverwalk/">Riverwalk</a
		> and on to the CBD.
	</p>
	<p>
		Alternatively, some road cyclists take Arthur Street or Merthyr Road for a more direct but hilly
		route.
	</p>
	<h2>Traditional Custodians help name the bridge</h2>
	<p>
		Council consulted with the Traditional Custodians of Brisbane to name the bridge Yowoggera,
		which some people believe means “corroboree” (a meeting or gathering). <a
			href="https://newfarmpark.com.au/breakfast-creek-bridge-a-corroboree-connection/"
			>Evie Drinnan writes</a
		>:
	</p>
	<blockquote>
		<p>
			Traditional Owner Shannon Ruska said the mouth of Breakfast Creek was known as Yowoggera;
			corroborees were held in the gardens of Newstead House, a town was on the other side of
			Breakfast Creek, and the women’s birthing place was across the river at Bulimba.
		</p>
		<p>
			Coincidentally, the Mercedes-Benz shop is still a place linked to transport, as it was once a
			canoe port.
		</p>
	</blockquote>
</ArticlePage>
