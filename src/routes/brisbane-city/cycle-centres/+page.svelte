<script lang="ts">
	import ArticlePage from '$lib/components/ArticlePage/ArticlePage.svelte';
	import Ad from '$lib/components/Ad/Ad.svelte';
	import { meta } from './meta.ts';
</script>

<ArticlePage
	{meta}
	map={{
		geojsonUrl: '/geo/brisbane-city--cycle-centres.geo.json'
	}}
>
	<p>
		If you're regularly riding to the city but your workplace doesn't have a shower or anywhere to
		park your bike, you should consider checking out one of the cycle centres.
	</p>
	<p>
		Brisbane City Council offers Cycle Centres which have secure bicycle parking as well as shower
		facilities and services such as towel laundering.
	</p>
	<Ad loadsScript />
	<p>
		Each cycle centre is leased out to a contractor to run, so each have their own pricing and
		perks. Generally you can subscribe for a yearly or monthly fee, or pay a little more for a
		single day's use of the facilities. It's convenient for commuters and recreational cyclists
		alike.
	</p>
	<h2>King George Square</h2>
	<p>
		The King George Square cycle centre — Cycle2City — was opened in May 2008 and is taking new
		memberships.
	</p>
	<p>
		You can get to the King George Square cycle centre from the Bicentennial Bikeway by getting off
		at the Turbot Street exit and following the cycleway until Roma Street.
	</p>
	<div id="hcard-Cycle2City" class="vcard cardify">
		<h3><a class="url fn n organization" href="http://www.cycle2city.com.au/">Cycle2City </a></h3>
		<p>
			<a class="email" href="mailto:administration@cycle2city.com.au"
				>administration@cycle2city.com.au</a
			>
		</p>
		<p class="adr"></p>
		<div class="street-address">87 Roma Street</div>
		<span class="locality">Brisbane</span>, <span class="region">Qld</span>,
		<span class="postal-code">4000</span> <span class="country-name">Australia</span>
		<p></p>
	</div>
	<p>Find out more at <a href="https://cycle2city.com.au/">cycle2city</a>.</p>
	<h2>Royal Brisbane Womens Hospital</h2>
	<p>
		The cycle centre at RBWH offers reasonably priced cycling facilities underneath the busway
		station.
	</p>
	<p>
		While not ideally located for CBD access, the RBWH cycle centre is open to hospital staff as
		well as the general public, and offers considerably lower prices than the central city
		facilities. You could also ride in from the northern bikeway and catch a bus in to the city.
	</p>
	<div id="hcard-Cycle2City" class="vcard cardify">
		<h3>
			<a class="url fn n organization" href="http://www.health.qld.gov.au/rbwh_cycle_centre/"
				>RBWH Cycle Centre</a
			>
		</h3>
		<a class="email" href="mailto:RBWH-Cycle-Centre@health.qld.gov.au"
			>RBWH-Cycle-Centre@health.qld.gov.au</a
		>
		<p class="adr"></p>
		<div class="street-address">Butterfield Street</div>
		<span class="locality">Herston</span>, <span class="region">Qld</span>,
		<span class="postal-code">4029</span> <span class="country-name">Australia</span>
		<p></p>
	</div>
	<p>
		Find out more at <a href="https://metronorth.health.qld.gov.au/rbwh/cycle-centre"
			>Metro North Health</a
		>
	</p>
	<Ad />
</ArticlePage>
