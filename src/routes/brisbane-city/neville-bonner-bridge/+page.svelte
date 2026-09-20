<script lang="ts">
	import ArticlePage from '$lib/components/ArticlePage/ArticlePage.svelte';
	import { meta } from './meta.ts';
	import heroDesktop from './hero-desktop.jpg?w=768;1080;1366;1920;2560;3840&format=webp;jpeg&enhanced';
	import heroMobile from './hero-mobile.jpg?w=540;768;1080;1440&format=webp;jpeg&enhanced';
</script>

<ArticlePage
	{meta}
	hero={{
		desktop: heroDesktop,
		mobile: heroMobile,
		alt: 'Neville Bonner Bridge under construction from South Bank. An inverted arch reaches across the river toward the casino under construction.'
	}}
	map={{
		geojsonUrl: '/geo/brisbane-city--neville-bonner-bridge.geo.json'
	}}
	openDate="August 29th 2024"
>
	<p>
		The Neville Bonner Bridge is a pedestrian-only bridge between the South Bank Cultural Forecourt
		and the Queens Wharf casino. The bridge opened August 29th 2024 alongside the first stage of the
		Star Casino precinct.
	</p>
	<p>
		<strong
			>You can't ride on it, and it doesn't really go anywhere. If you're heading to Queen's Wharf
			you can only do it on foot.</strong
		>
	</p>
	<p>
		The bridge was named in honour of the late <a
			href="https://www.naa.gov.au/explore-collection/first-australians/other-resources-about-first-australians/neville-bonner"
			>Senator Neville Bonner AO</a
		>, the first Indigenous Australian to become a member of the Commonwealth Parliament and
		Australian of the Year.
	</p>
	<h2>Design</h2>
	<p>
		Queen's Wharf Brisbane Casino will revamp the CBD and riverfront with a design that embraces the
		city's warm weather and honours its history, both Indigenous and European, through trails along
		the Brisbane River.
	</p>
	<p>
		The 320 metre bridge is a hybrid mast and arch design, with a large steel “ribbon” arch
		structure complemented by a cable stay system to span the river. The bridge is designed to allow
		clearance for ferries and the riverside expressway, and was designed for a 1 in 2000 year flood.
	</p>
	<h2>Controversy</h2>
	<p>
		The bridge is not intended to be a transport link in the city and is planned to be foot traffic
		only. It was designed to deliver pedestrians to the casino, with no connection to the cycle
		routes on the north or south side of the river.
	</p>
	<p>
		From <a
			href="https://www.brisbanetimes.com.au/national/queensland/cyclists-say-next-brisbane-bridge-will-be-a-big-mistake-20180219-p4z0w7.html"
			>the Brisbane Times</a
		>:
	</p>
	<blockquote>
		<p>
			No answers were provided by Transport Minister Mark Bailey, although Economic Development
			Queensland - part of State Development minister Cameron Dick's portfolio - said cyclists could
			not be added to the bridge according to their experts because of the "grade of bridge" for
			cyclists.
		</p>
	</blockquote>
	<blockquote>
		<p>
			In a written response in May 2017 to a <a
				href="https://space4cyclingbne.com/2017/01/09/bicycle-access-at-queens-wharf/"
				>petition from Space for Cycling</a
			> to add cyclists to the Neville Bonner Bridge, Mr Bailey said changes to land the bridge at the
			Bicentennial Bikeway were "constrained by the Riverside Expressway".
		</p>
	</blockquote>
	<p>
		The bridge was a requirement for the developers to build the casino precinct. The ABC has
		reported that a key shareholder in the casino consortium “has a long history of association with
		organised crime figures and people blacklisted by gambling regulators around the world” - read
		more about <a
			href="https://www.abc.net.au/news/2022-08-22/star-brisbane-casino-chow-tai-fook-triad-links/101341862"
			>queens wharf controversy</a
		>.
	</p>
</ArticlePage>
