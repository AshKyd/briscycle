<script lang="ts">
	import ArticlePage from '$lib/components/ArticlePage/ArticlePage.svelte';
	import { meta } from './meta.ts';
	import heroDesktop from './hero-desktop.jpg?w=768;1080;1366;1920;2560;3840&format=webp;jpeg&enhanced';
	import heroMobile from './original.jpg?w=540;768;1080;1440&format=webp;jpeg&enhanced';
</script>

<ArticlePage
	{meta}
	hero={{
		desktop: heroDesktop,
		mobile: heroMobile,
		alt: 'The bikeway is a prominent piece of infrastructure, stretching off towards Brisbane City in the distance.'
	}}
	map={{
		geojsonUrl: '/geo/brisbane-city--southeast-freeway-bikeway.geo.json'
	}}
>
	<p>
		The Southeast Freeway bikeway runs parallel to the Southeast Freeway (M1) from South Brisbane to
		Eight Mile Plains.
	</p>
	<p>
		This bikeway is a busy commuter route servicing the southern suburbs, linking up with all the
		back-streets truncated by the motorway itself. It connects to the CBD via the <a
			href="../goodwill-bridge/">Goodwill Bridge</a
		>. It's also a part of the V1 veloway linking Brisbane to the
		<a href="/gold-coast/">Gold Coast</a>.
	</p>
	<p>
		Being off-road, the bikeway is good for all experience levels so it's a great little weekend
		tour or an excellent commute to work. The climb outbound from the river at the city end is the
		steepest section along the route, but there is also a fair climb around Mount Gravatt.
	</p>
	<h2>Riding to work from the south side</h2>
	<p>
		The bikeway starts at South Bank and runs mostly offroad for 20 kilometres along the M1
		motorway. Heading outbound the bikeway stops at:
	</p>
	<ul class="metro">
		<li>
			Lower River Terrace <div>With bike connections to South Bank, QUT and Kangaroo Point</div>
		</li>
		<li>Allen St <span>South Brisbane</span></li>
		<li class="connection">
			Stanley Street <span>Wooloongabba</span>
			<div>With connections to Mater Hospital, Annerley Rd bikeway, The Gabba</div>
		</li>
		<li>
			Lockhart Street <span>Wooloongabba</span>
			<div>with access to Peterson St</div>
		</li>
		<li>Ross Street <span>Wooloongabba</span></li>
		<li>Abingdon Street <span>Wooloongabba</span></li>
		<li>
			Park Road <span>Wooloongabba</span>
			<div>a short on-road ride to Boogo Road Station</div>
		</li>
		<li>Morrissey Street <span>Wooloongabba</span></li>
		<li class="connection">
			Harrogate Street <span>Wooloongabba</span>
			<div>Connection to Toohey Street via overpass</div>
		</li>
		<li class="connection">
			O'Keefe Street <span>Wooloongabba</span>
			<div>Connections to Buranda Station &amp; Busway, short footpath ride to Hanlon Park</div>
		</li>
		<li class="connection">
			Greenslopes station <span>Greenslopes</span>
			<div>
				Connections to <a href="/brisbane-city/norman-creek-bikeway/">Norman Creek Bikeway</a>,
				Annerley Football Club, &amp; suburbs
			</div>
		</li>
		<li>Greenslopes Hospital <span>Greenslopes</span></li>
		<li>
			Birdwood Road <span>Holland Park</span>
			<div>switches to footpath underneath the motorway</div>
		</li>
		<li>Peronne Road <span>Holland Park</span></li>
		<li>Gaza Road <span>Holland Park</span></li>
		<li>Griffith University Mount Gravatt Campus</li>
		<li>University Road <span>Mount Gravatt</span></li>
		<li>
			Worrell St <span>Upper Mounte Gravatt</span>
			<div>bikeway disappears for 500 metres</div>
		</li>
		<li>
			Kessels Road <span>Macgregor</span>
			<div>Short footpath ride to Westfield Mount Gravatt</div>
		</li>
		<li>Wadley Street <span>Macgregor</span></li>
		<li class="connection">
			Freesia Street <span>Macgregor</span>
			<div>Connection to Bulimba Creek Bikeway</div>
		</li>
		<li>Logan Road <span>Eight Mile Planes</span></li>
		<li>Miles Platting Road <span>Eight Mile Planes</span></li>
		<li>Logan Road <span>at the Gateway Motorway interchange</span></li>
		<li>Underwood Road <span>Underwood</span></li>
		<li>Camelot Park <span>Underwood</span></li>
		<li>
			Gunalda Street <span>Underwood</span>
			<div>Near Lowe Oval, Logan Leisure Centres &amp; Logan Library</div>
		</li>
		<li>Springwood Road <span>Underwood</span></li>
		<li>Dedicated bikeway ends at Pacific Highway</li>
	</ul>
	<p>
		Past this point your onward journey to IKEA or the Gold Coast involves significant on-road
		riding, so plan accordingly and take care.
	</p>
</ArticlePage>
