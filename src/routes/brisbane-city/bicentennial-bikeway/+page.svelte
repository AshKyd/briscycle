<script lang="ts">
	import ArticlePage from '$lib/components/ArticlePage/ArticlePage.svelte';
	import Ad from '$lib/components/Ad/Ad.svelte';
	import { meta } from './meta.ts';
	import heroDesktop from './bicentennial-bikeway-hero-desktop.jpg?w=768;1080;1366;1920;2560;3840&format=webp;jpeg&enhanced';
</script>

<ArticlePage
	{meta}
	hero={{
		desktop: heroDesktop,
		mobile: heroDesktop,
		alt: 'Sunny day, pedestrians and cyclists on separated paths by the Brisbane River. An overpass pylon decorated with abstract street art and a big fluffy dog on a leash.'
	}}
	map={{
		geojsonUrl: '/geo/brisbane-city--bicentennial-bikeway.geo.json'
	}}
>
	<p>
		The Bicentennial Bikeway is a popular Brisbane cycleway running past the Brisbane CBD and
		helping connect Toowong and the western suburbs.
	</p>
	<p>
		The bikeway has entrances from the <a href="../goodwill-bridge/">Goodwill Bridge</a> to Toowong, and
		is a great way to explore the city.
	</p>
	<Ad loadsScript />
	<h2>Getting to and from the city by bike</h2>
	<p>
		The bikeway starts at the foot of the <a href="../goodwill-bridge/">Goodwill Bridge</a>, where
		you have access to South Bank and the Botanic Gardens.
	</p>
	<p>
		As you travel along the river through the Queens Wharf development there's plenty of sightseeing
		and relaxation spots. Stop for a walk or sit on Mangrove Walk riverwalk, or play some table
		tennis under the freeway at Waterline Park.
	</p>
	<h2>Getting to Queen Street</h2>
	<p>
		From the bikeway, you have elevator, stair, and ramp access to Queen Street. At the landing of
		the victoria bridge
	</p>
	<ul>
		<li>On the right take the elevator or stairs</li>
		<li>On the left is a fairly steep ramp. It's more fun to go down than up (but take care!)</li>
	</ul>
	<p>Cross at the lights and bike parking is in Reddacliffe Place, by the library.</p>
	<h2>Other city access</h2>
	<p>
		To get to the Kurilpa Bridge, Roma Street Station, Roma Street Parklands or the Northern
		Bikeway, take the ramp leading to Turbot or Herschel streets.
	</p>
	<p>
		This isn't super well connected at the time of writing, but you can take the footpath across
		past the Supreme Court, or travel around the block to get the Kurilpa Bridge bikeway.
	</p>
	<h2>Cycling Along Coronation Drive</h2>
	<p>
		You can use the Go Between Bridge to get access to South Bank and beyond. If you're looking for
		a bridge adventure you can cross this bridge and loop back around to the Kurilpa Bridge.
	</p>
	<p>Other exits include:</p>
	<ul>
		<li>
			Cribb Street/Little Cribb Street: Two exits, one ramp to Coronation drive, and one underpass
			that takes you around the back away from the traffic.
		</li>
		<li>
			Graham Street/Park Road: A ramp that takes you to the intersection of Graham Street and
			Coronation drive. There are pedestrian lights to help you cross, and Park Road is a short ride
			from away.
		</li>
		<li>
			Lang Parade: A ramp leading to the intersection of Lang Parade and coronation drive which will
			take you through to Auchenflower train station.
		</li>
		<li>
			Land Street/Western Suburbs: If you're heading to the Western Suburbs, taken the Land Street
			underpass, and then follow Sylvan Road until you reach the the Western Freeway Bikeway.
		</li>
	</ul>
	<h2>Riding to and from Toowong</h2>
	<p>
		At the Toowong end of the Bicentennial Bikeway, the path merges with the footpath and travels
		alongside Coronation Drive. From here you have bike access to Sylvan Road, as well as Toowong
		Village including the retail and dining nearby.
	</p>
	<p>
		After Toowong, there is a bike route to St Lucia and the University of Queensland, as well as
		through to Taringa.
	</p>
	<h2>Riding to the western suburbs</h2>
	<p>
		If you're interested in heading further south or west, check out the <a
			href="../western-freeway-bikeway/">Western Freeway</a
		> page for maps and information.
	</p>
	<h2>Things to Do</h2>
	<p>
		With plenty of ebikes around, this bikeway is a great way of sightseeing around the city. Take a
		day trip along the river, and see all the sights by pedal power.
	</p>
	<p>
		If you're looking for restaurants, stop off at Park Road road in Milton, check out Toowong, or
		explore South Bank.
	</p>
</ArticlePage>
