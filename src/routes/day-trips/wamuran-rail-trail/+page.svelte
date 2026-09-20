<script lang="ts">
	import ArticlePage from '$lib/components/ArticlePage/ArticlePage.svelte';
	import Ad from '$lib/components/Ad/Ad.svelte';
	import Image from '$lib/components/Image/Image.svelte';
	import Youtube from '$lib/components/Youtube/Youtube.svelte';
	import { meta } from './meta.ts';
	import heroDesktop from './hero-desktop.webp?w=768;1080;1366;1920;2560;3840&format=webp;jpeg&enhanced';
	import heroMobile from './hero-1440.webp?w=540;768;1080;1440&format=webp;jpeg&enhanced';
	import rail_trail_wamuran_picnic_area_0 from './rail-trail-wamuran-picnic-area.webp?w=540;768;1080;1440;1920&format=webp;jpeg&enhanced';
	import wamuran_station_1967_1 from './wamuran-station-1967.jpg?w=540;768;1080;1440;1920&format=webp;jpeg&enhanced';
</script>

<ArticlePage
	{meta}
	hero={{
		desktop: heroDesktop,
		mobile: heroMobile,
		alt: 'The Wamuran end of the Wamuran Rail Trail. The path goes past a park into the distance while the old rails terminate at a footpath.'
	}}
	map={{
		googleMaps:
			"https://www.google.com/maps/dir/Caboolture+to+Wamuran+Rail+Trail+Caboolture+Entry,+Caboolture+QLD/Railtrail+Wamuran,+D'Aguilar+Highway,+Wamuran+QLD/@-27.0592972,152.8725676,13z/data=!3m1!4b1!4m14!4m13!1m5!1m1!1s0x6b93f3b75a2026e9:0x5f3fd53755b17003!2m2!1d152.9513797!2d-27.0794607!1m5!1m1!1s0x6b93f516c27bdc95:0xa0010d4136d33cc5!2m2!1d152.8639716!2d-27.0392661!3e1",
		geojsonUrl: '/day-trips/wamuran-rail-trail/wamuran-rail-trail.geo.json'
	}}
>
	<p>
		The Wamuran Rail Trail 10 km off-road bike trail leaving from Caboolture and following the route
		of the old Kilcoy rail line.
	</p>
	<p>
		The rail trail opened in 2020 and follows the route of the old rail line, a stones throw from
		Caboolture Station, through a number of historic sites and all the way up to Wamuran. As it
		follows the rail route, it's a fairly gentle grade and being 20km round trip is suitable for
		beginner cyclists.
	</p>
	<p>
		There is free parking at both ends, or you can <a
			href="/bicycle-regulation/bikes-on-public-transport/">take your bike on the train</a
		> to start the trip from Caboolture Station.
	</p>
	<Youtube
		url="https://www.youtube.com/watch?v=XMLOk_1Mmlg&amp;list=PLNAiXhy9-wI6AizT1V26NVt7vpr1mtmq1&amp;index=4"
		title="Riding the Wamuran Rail Trail"
	/>
	<p>
		There are also bike maintenance stations at either end if you need to pump up your tyres, or
		tighten any bolts. Both end also have water taps, seating and historical panels showing the
		history of the railway.
	</p>
	<Ad loadsScript />
	<h2>What to do in Wamuran</h2>
	<p>
		Located 50 km north-west of Brisbane, Wamuran is a small rural town and locality in the
		fruit-growing district nestled below Mount Mee in the D'Aguilar Range. The town is <a
			href="https://www.moretonbay.qld.gov.au/libraries/Discover/History-and-Heritage/Moreton-Bay-History/Caboolture-District-History/Caboolture-Regions/Wamuran-History"
			>named after a local Aboriginal leader Menvil Wanmaurn</a
		>, also known as Jackie Delaney. Delaney's Creek is a nearby district to this day.
	</p>
	<Image
		src={rail_trail_wamuran_picnic_area_0}
		alt="The Wamuran end of the trail has seating, water, and a bike repair station"
	/>
	<p>
		The town itself doesn't have any notable tourist attractions. There is a nice park at the end of
		the trail which the kids will appreciate, and the trail itself has been enhanced with historical
		information, signage, and artwork. There is an IGA at the end of the trail, and a number of
		shops and restaurants in the area to have breakfast or lunch.
	</p>
	<p>
		There are mountain bike trails in the area, including the <a
			href="https://www.alltrails.com/trail/australia/queensland/wamuran-loop-trail"
			>Wamuran Loop Trail</a
		>
		but they are a lot rougher and the reviews are mixed. If you know more,
		<a href="mailto:ash@kyd.com.au">shoot me an email</a>.
	</p>
	<Ad />
	<h2>Old Kilcoy rail line</h2>
	<Image
		src={wamuran_station_1967_1}
		alt="A steam train pulls up to a small wooden building at Wamuran station in 1967"
		align="right"
		caption="A steam train pulls into Wamuran station in 1967"
	/>
	<p>
		The old Kilcoy rail line opened from Caboolture to Woodford on 6 December 1909 and extended to
		Kilcoy in 1913.
	</p>
	<p>
		The Wamuran to Kilcoy section closed on 30 June 1964, but the Wamuran section continued running
		freight trains transporting produce until 1996.
	</p>
	<p>
		The line sat abandoned for a number of years until Moreton Bay Regional Council refurbished it
		into the rail trail you see today.
	</p>
	<p>
		The <a href="https://www.angrms.org.au/">Australian Narrow Gauge Railway Museum Society</a> has preserved
		a number of heritage trains from the region and runs a railway museum at the Woodford railway station,
		another 14 km down the road. The museum runs passenger services on the remaining section of railway
		on the first and third Sundays of each month.
	</p>
</ArticlePage>
