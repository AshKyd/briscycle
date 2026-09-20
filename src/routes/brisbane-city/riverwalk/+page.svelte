<script lang="ts">
	import ArticlePage from '$lib/components/ArticlePage/ArticlePage.svelte';
	import Ad from '$lib/components/Ad/Ad.svelte';
	import Image from '$lib/components/Image/Image.svelte';
	import { meta } from './meta.ts';
	import heroDesktop from './riverwalk-tilt-shift-hero.jpg?w=768;1080;1366;1920;2560;3840&format=webp;jpeg&enhanced';
	import PXL_20241103_062001277_RAW_01_COVER_0 from './PXL_20241103_062001277.RAW-01.COVER.jpg?w=540;768;1080;1440;1920&format=webp;jpeg&enhanced';
</script>

<ArticlePage
	{meta}
	hero={{
		desktop: heroDesktop,
		mobile: heroDesktop,
		alt: 'The Riverwalk winds through Howard Smith Wharves, and out into the Brisbane River'
	}}
	map={{
		geojsonUrl: '/geo/brisbane-city--riverwalk.geo.json'
	}}
>
	<p>
		The Brisbane Riverwalk connects Brisbane to New Farm via Howard Smith Wharves, along the north
		side of the Brisbane River.
	</p>
	<p>
		The Riverwalk connects to the City Reach Boardwalk taking you right into the Brisbane CBD. It
		continues on to the <a href="../bicentennial-bikeway/">Bicentennial Bikeway</a> which continues
		to Toowong, as well as the <a href="../southeast-freeway-bikeway/">V1 Bikeway</a> via the
		<a href="../goodwill-bridge/">Goodwill Bridge</a>.
	</p>
	<h2>The Riverwalk</h2>
	<p>
		The Riverwalk is a great way to get from New Farm to the city as it follows along the river
		rather than winding through the steep hills approaching Fortitude Valley. The Riverwalk has
		segregated pedestrian and cycle lanes for most of the way, so you're free to ride or walk at
		whichever pace you choose.
	</p>
	<p>The Riverwalk includes shaded rest and viewing areas similar to other bikeways in the area.</p>
	<ul class="metro">
		<li>
			City Reach Boardwalk <div>
				Connects at the city end to QUT, South Bank and the CityLink Cycleway. Ivory Lane takes you
				on-road to the Story Bridge via one of Brisbane's steepest climbs.
			</div>
		</li>
		<li>
			Howard Smith Wharves <div>Via a busy road with no shoulder. Take care.</div>
		</li>
		<li>
			Main Lawn <div>Stairs &amp; elevator connection to Bowen Terrace.</div>
		</li>
		<li>
			Brisbane Riverwalk <div>Stop at one of the many lookouts to admire the river</div>
		</li>
		<li>
			Merthyr Road <div>
				Cycleway ends. Continue 450 metres on-road to Sydney Street ferry terminal where bikeway
				connects through to New Farm Park, Brisbane Powerhouse and on to <a
					href="/brisbane-city/breakfast-creek-bridge/">Yowoggera Bridge</a
				> and&nbsp;beyond.
			</div>
		</li>
	</ul>
	<Ad loadsScript />
	<h2>Howard Smith Wharves</h2>
	<Image
		src={PXL_20241103_062001277_RAW_01_COVER_0}
		alt="Joggers and scooters dart around each other at the leafy cliffside Howard Smith Wharves"
		align="right"
		caption="The path turns into a shared footpath"
	/>
	<p>
		Howard Smith Wharves is a historic precinct along the Brisbane Waterfront a great place for
		lunch, dinner or a drink within cycling distance of the CBD. Take the stairs (or free elevator)
		to the top of the cliffs for a great view of the Story Bridge and Brisbane skyline, or enjoy a
		beer at popular chains like Felons Brewing.
	</p>
	<p>
		The precinct was redeveloped in 2018 and Brisbane City Council left the developers to do as they
		pleased with the dedicated cycleway. As such it's no longer a cycleway through the precinct,
		instead a combination of shared footpath and roads. Be very careful around the western end
		because the footpath ends abruptly in a busy street with no footpath. There are no alternative
		routes around this area.
	</p>
	<h2>What happened to the old Riverwalk?</h2>
	<p>
		The original walkway was based on a floating design, but during the 2011 floods it became
		partially submerged and at risk of breaking up. While the flooding was ongoing the riverwalk was
		planned to be demolished to prevent any damage to property such as the <a
			href="/moreton-bay/gateway-bridge-cycleway/">gateway bridge</a
		>
		downstream. But before this could happen it broke up of its own accord, and was
		<a
			href="http://www.brisbanetimes.com.au/environment/weather/explosives-destroy-riverwalk-20110112-19nwp.html"
			>escorted safely down the Brisbane River by a tug boat</a
		>.
	</p>
	<h2>Rebuilding the Riverwalk</h2>
	<p>
		Lord Mayor Graham Quirk announced in April 2013 that having secured funding from the federal and
		state governments, the iconic Riverwalk linking New Farm to Brisbane City would start
		construction and be completed in mid 2014.
	</p>
	<p>He said:</p>
	<blockquote>
		<p>
			In its time before being washed downstream in the devastating 2011 floods, the original
			Riverwalk hosted more than 3,000 cyclists, pedestrians and runners on a daily basis, making it
			one of the most popular links within Brisbane.
		</p>
		<p>
			It was an iconic feature of the city, and the completion of these works will help bring it
			back bigger and better than ever.
		</p>
	</blockquote>
	<Ad />
	<p>
		The main focuses of the reconstruction project were cost and sturdiness. The new construction is
		a fixed walkway constructed 3.4 metres above the mean sea level and follows a similar route to
		the previous structure. But was designed to have a significantly lower maintenance cost, and is
		expected to be able to survive a one-in-2000 year flood.
	</p>
</ArticlePage>
