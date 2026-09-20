<script lang="ts">
	import ArticlePage from '$lib/components/ArticlePage/ArticlePage.svelte';
	import { meta } from './meta.ts';
	import heroDesktop from './northern-bikeway.jpg?w=768;1080;1366;1920;2560;3840&format=webp;jpeg&enhanced';
	import heroMobile from './northern-bikeway-mobile.jpg?w=540;768;1080;1440&format=webp;jpeg&enhanced';
</script>

<ArticlePage
	{meta}
	hero={{
		desktop: heroDesktop,
		mobile: heroMobile,
		alt: 'A bikeway extends into the distance as the sun sets over the autumn leaves.'
	}}
	map={{
		googleMaps:
			'https://www.google.com/maps/dir/-27.4662278,153.0219514/-27.41683,153.0441/@-27.4414371,153.0194818,13.81z/data=!4m2!4m1!3e1?entry=ttu',
		geojsonUrl: '/brisbane-city/northern-bikeway/northern-bikeway.geo.json'
	}}
>
	<p>
		Getting into Brisbane from the north side is getting a lot safer with the northern bikeway.
		Constructed in 2021, the route starts in Wooloowin and connects to the Roma Street Parklands via
		the Ekka on a mix of separated bike lanes and shared footpaths.
	</p>
	<h2>Riding to and from Eagle Junction Station</h2>
	<p>
		The bikeway starts at Wooloowin and is a completely separate, protected lane. It's very safe for
		beginners and commuters alike.
	</p>
	<p>
		The separated lane runs from about halfway down Dickson Street, through past Wooloowin and
		Albion stations. After Albion station it separates from the road and follows Enoggera Creek down
		under the Inner City Bypass (ICB) spaghetti junction.
	</p>
	<p>
		The spaghetti junction connects to both the Enoggera Creek bikeway (via three or four traffic
		lights), or crosses the bridge into the city where there's a couple more road crossings to get
		to the Royal Brisbane and Women's Hospital (including <a href="/brisbane-city/cycle-centres/"
			>cycle centre</a
		>).
	</p>
	<p>
		Or you can continue off-road through Bowen Park. This takes you alongside Gilchrist Avenue,
		across the land bridge across the ICB, and onward to Spring Hill, Petrie Terrace, or through the
		Roma Street Parklands to the city.
	</p>
	<h2>Riding Kedron Brook Road</h2>
	<p>
		Commuters from the northwest might consider riding on Kedron Brook Road between the <a
			href="/day-trips/kedron-brook-cycleway/">Kedron Brook bikeway</a
		> and the Enoggera Creek bikeway, or through the back streets of Herston.
	</p>
	<p>
		Kedron Brook Road has sporadic green painted bike lanes, and is otherwise marked by the council
		as a “bicycle awareness zone”, although the yellow painted bike symbols are largely worn down
		these days.
	</p>
	<p>
		There's a lot more car traffic and it's a more hilly route than the northern bikeway, but it's
		much more direct. It also has a road shoulder on the uphill sections so you can go slow without
		bothering traffic.
	</p>
	<p>
		As always, it's legal to hop onto the footpath in Queensland if you're not comfortable in
		traffic.
	</p>
	<h2>Riding into Fortitude Valley</h2>
	<p>I'm not gonna lie, this one's not a great ride.</p>
	<p>
		In the past I've ridden on Bowen Bridge Road between the RBWH and Story Bridge. The traffic can
		be pretty slow in peak hour so it's easy enough to keep up. You can duck onto the footpath
		whenever it gets hairy. But either way it's not great.
	</p>
	<p>
		Alternatively the Kingsford Smith Drive bikeway connects up to the waterfront around New Farm.
		It's a long route, but it's very flat and good for beginners.
	</p>
	<p>
		But there's not really a good route into the valley/north end of the city from the north. If you
		know of one, hit me up!
	</p>
	<h2>“Save our streets”</h2>
	<p>
		The route was originally planned to connect with the <a href="/day-trips/kedron-brook-cycleway/"
			>Kedron Brook cycleway</a
		>
		and on to the
		<a href="/day-trips/kedron-brook-cycleway/jim-soorley-bikeway/">Jim Soorley Bikeway</a>
		which could take you as far as Redcliffe off-road. But a local
		<a
			href="https://www.abc.net.au/news/2022-04-29/brisbane-north-bikeway-stage-5-more-congestion-plan/101022112"
			>nimby campaign</a
		> made the government back down.
	</p>
	<p>
		So around Northgate station you'll need to mince with four lanes of traffic at the northern end,
		or ride on the footpath for a bit.
	</p>
	<p>
		Opponents to the bikeway say it will hurt business, but research has consistently shown that
		bike lanes boost foot traffic (by up to 25%) because people on bikes are more likely to stop on
		their way past.
	</p>
</ArticlePage>
