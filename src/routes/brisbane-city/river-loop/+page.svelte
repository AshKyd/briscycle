<script lang="ts">
	import ArticlePage from '$lib/components/ArticlePage/ArticlePage.svelte';
	import Ad from '$lib/components/Ad/Ad.svelte';
	import Image from '$lib/components/Image/Image.svelte';
	import { meta } from './meta.ts';
	import heroDesktop from './river-loop-hero-desktop.jpg?w=768;1080;1366;1920;2560;3840&format=webp;jpeg&enhanced';
	import heroMobile from './river-loop-hero-mobile.jpg?w=540;768;1080;1440&format=webp;jpeg&enhanced';
	import PXL_20240217_060727070_0 from './PXL_20240217_060727070.jpg?w=540;768;1080;1440;1920&format=webp;jpeg&enhanced';
	import PXL_20240217_063152824_1 from './PXL_20240217_063152824.jpg?w=540;768;1080;1440;1920&format=webp;jpeg&enhanced';
	import PXL_20240217_064556646_2 from './PXL_20240217_064556646.jpg?w=540;768;1080;1440;1920&format=webp;jpeg&enhanced';
	import PXL_20240217_072122051_3 from './PXL_20240217_072122051.jpg?w=540;768;1080;1440;1920&format=webp;jpeg&enhanced';
	import PXL_20240217_073203296_4 from './PXL_20240217_073203296.jpg?w=540;768;1080;1440;1920&format=webp;jpeg&enhanced';
	import PXL_20240217_065355415_5 from './PXL_20240217_065355415.jpg?w=540;768;1080;1440;1920&format=webp;jpeg&enhanced';
	import PXL_20240217_071521980_6 from './PXL_20240217_071521980.jpg?w=540;768;1080;1440;1920&format=webp;jpeg&enhanced';
	import PXL_20240217_072214747_7 from './PXL_20240217_072214747.jpg?w=540;768;1080;1440;1920&format=webp;jpeg&enhanced';
	import PXL_20231030_070541216_8 from './PXL_20231030_070541216.jpg?w=540;768;1080;1440;1920&format=webp;jpeg&enhanced';
</script>

<ArticlePage
	{meta}
	hero={{
		desktop: heroDesktop,
		mobile: heroMobile,
		alt: 'A glimpse of the Eleanor Schonell Bridge, looking through Trees from the riverbank at UQ'
	}}
	map={{
		geojsonUrl: '/brisbane-city/river-loop/riverloop.geo.json',
		title: 'Map of the Brisbane Riverloop + half riverloop',
		description:
			"This map follows the most straightforward on-road route. If you're less confident with road riding there are adjacent paths you can jump onto, with the exception of some quiet back-streets in Chelmer."
	}}
>
	<p>
		The Brisbane River Loop is popular recreational cycle route that follows the Brisbane River from
		South Bank to Indooroopilly and back again.
	</p>
	<p>
		This route is popular on weekends with riders of all stripes heading out to get some fresh air
		and exercise.
	</p>
	<p>
		There is a good mix of flat and hill cycling, but you can also choose the Mini Brisbane River
		Loop if the full loop is too challenging.
	</p>
	<p>
		The recommended direction for the loop is counter-clockwise. This leaves you with a bit of a
		climb toward the end, but a very rewarding roll down either Dornoch Terrace or Annerley Road
		depending on your route.
	</p>
	<Ad loadsScript />
	<h2>The River Loop</h2>
	<p>
		The majority of the route is on residential back streets, although there are some more busy
		stretches further out of the city. If you're less confident with road riding or just want a more
		leisurely stroll there are enough bike paths you can jump onto, particularly around St Lucia,
		Taringa, Tennyson and alongside Brisbane Corso.
	</p>
	<p>
		The full loop is 35-40 km, whereas the mini loop is slightly under 20 km. Jump <a href="#map"
			>bottom of the page for the map</a
		>.
	</p>
	<h2>Mini Brisbane River Loop</h2>
	<p>
		The Mini Brisbane River Loop cuts out the Indooroopilly/Tennyson/Fairfield sections of the loop
		by heading across the Eleanor Schonell Bridge.
	</p>
	<p>
		This short-cut effectively cuts the loop in half, and provides a good "training" loop if you're
		not as experienced or confident.
	</p>
	<Ad />
	<h2>Take a different route</h2>
	<p>
		The River Loop is pretty loosely defined and everyone has their own take on it. Some popular
		alternatives include:
	</p>
	<ul>
		<li>
			Continue down Gladstone Road rather than turning left onto Dornoch Terrace, to cut straight
			back to the Goodwill Bridge.
		</li>
		<li>
			Take Annerley Road instead of Gladstone Road to get to the Goodwill Bridge without having to
			climb any more hills
		</li>
		<li>
			Take Grey Street instead of the Clem Jones Promenade along the water at South Bank to avoid
			the busy weekend pedestrian traffic. (Always remember to go slow and give way to pedestrians.)
		</li>
	</ul>
	<div class="gallery">
		<Image
			src={PXL_20240217_060727070_0}
			alt="The Centennial bikeway, shaded under lush trees, the chocolate river to the left"
			caption="The Centennial Bikeway on the first leg out of the city"
		/>
		<Image
			src={PXL_20240217_063152824_1}
			alt="Looking through the trees at the mansions across the river"
			caption="The view from St Lucia"
		/>
		<Image
			src={PXL_20240217_064556646_2}
			alt="Looking downriver from Indooroopilly we can see the indooroopilly river walk"
			caption="The Indooroopilly river walk as seen from the Jack Pesch Green Bridge"
		/>
		<Image
			src={PXL_20240217_072122051_3}
			alt="A Riverloop sign shows directions to and from the city, next to an off-road bikeway"
			caption="The route is well signed if you get lost"
		/>
		<Image
			src={PXL_20240217_073203296_4}
			alt="A park bench so you can admire the Eleanor Schonell Bridge"
			caption="Eleanor Schonell Bridge"
		/>
	</div>
	<h2>St Lucia to Indooroopilly</h2>
	<p>
		The St Lucia peninsula runs around the University of Queensland and St Lucia Golf Links. Coming
		from Toowong there are a couple of small but notable hills, as well as alongside the golf
		course.
	</p>
	<p>
		If you decide you've had enough, you can circle around and take the Eleanor Schonell Green
		Bridge for the half river loop.
	</p>
	<p>
		After the golf course, you can also ride off-road through Robertson Park for a bit before
		hitting the road riding through to Indro.
	</p>
	<h2>Indooroopilly to Tennyson</h2>
	<p>
		At the Indro end you you can refill your water bottle, stop for food, or check out the
		Indooroopilly river walk.
	</p>
	<p>
		The Jack Pesch green bridge will take you across the river. The section through Chelmer is
		mostly on-road riding. Some of these roads don't have shoulders or footpaths, but they are very
		quiet.
	</p>
	<p>
		Closer to Tennyson there are shared footpaths to get you off the road But these are pretty
		narrow and have lots of other people walking, so many riders prefer to ride on the road.
	</p>
	<div class="gallery">
		<Image
			src={PXL_20240217_065355415_5}
			alt="A lush shaded street with no footpath or shoulder, but it's very quiet"
			caption="A quiet back-street in Chelmer with no footpaths"
		/>
		<Image
			src={PXL_20240217_071521980_6}
			alt="A street with no shoulder, a bit of traffic, and some footpaths either side"
			caption="The on-road section at Yeronga (feat. footpaths)"
		/>
		<Image
			src={PXL_20240217_072214747_7}
			alt="A narrow off-road bikeway runs alongside the Brisbane Corso and river"
			caption="The bike path alongside Brisbane Corso"
		/>
	</div>
	<h2>Tennyson to Dutton Park</h2>
	<p>This route is largely through residential streets.</p>
	<p>
		There's a bit of a hill through Yeronga, as well as a very rewarding downhill section through
		the peninsula.
	</p>
	<p>
		This part of the route is fairly ill-defined, so you can choose whichever streets you like, but
		for the map I've checked out the most travelled route on Strava down the esplanade. Personally I
		like Orari road becauyse it's a long, slow roll downhill.
	</p>
	<p>
		There's a narrow shared path along the corso which is good for a slow roll, but more serious
		riders will just take the corso itself.
	</p>
	<p>
		At the Dutton Park end there's a number of routes, but the most common is following the road up
		to Gladstone Road. There is also a bikeway halfway up the hill that runs under the busway if you
		need to bail out early or want to head down Annerley Road.
	</p>
	<h2>Dutton Park to South Bank (via West End)</h2>
	<Image
		src={PXL_20231030_070541216_8}
		alt="The bikeway curves downhill toward the Brisbane River"
		align="right"
		caption="The top of Riverside Drive bikeway"
	/>
	<p>
		Dutton Park to Highgate Hill is probably the busiest on-road route. There are bike lanes painted
		on some segments of the road, but I've been known to bail out and take the footpath in some
		places.
	</p>
	<p>
		Once you're at the top of Highgate Hill though, the fun starts! The downhill section along
		Dornoch Terrace and down to the Brisbane River is really fun, you'll barely need to pedal. Just
		be safe around parked cars, and stick to the speed limit.
	</p>
	<p>Once you hit Riverside Drive you're pretty much flat the rest of the way into South Bank.</p>
	<Ad />
</ArticlePage>
