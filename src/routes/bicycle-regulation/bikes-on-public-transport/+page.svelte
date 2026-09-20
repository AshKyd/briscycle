<script lang="ts">
	import ArticlePage from '$lib/components/ArticlePage/ArticlePage.svelte';
	import Ad from '$lib/components/Ad/Ad.svelte';
	import { meta } from './meta.ts';
	import heroDesktop from './hero-desktop.webp?w=768;1080;1366;1920;2560;3840&format=webp;jpeg&enhanced';
	import heroMobile from './hero-mobile.webp?w=540;768;1080;1440&format=webp;jpeg&enhanced';
</script>

<ArticlePage
	{meta}
	hero={{
		desktop: heroDesktop,
		mobile: heroMobile,
		alt: 'A blue bike in a mostly empty train carriage'
	}}
>
	<p>Bikes are permitted on most forms of public transport in Brisbane.</p>
	<h2>🚂 Bike &amp; scooters on trains</h2>
	<p>
		You're allowed to travel freely on weekends, public holidays, and off-peak (including in the
		opposite direction of peak traffic). Although if the carriage fills up you may be asked to get
		off to make room for passengers.
	</p>
	<p>Bikes are only permitted on trains during peak times under certain conditions:</p>
	<Ad loadsScript />
	<ul>
		<li>board using the first or last carriages of six-car trains only</li>
		<li>
			ensure only two people with bikes or e-scooters are in the first or last carriage at any time,
			or wait for another train
		</li>
		<li>keep clear of access to priority seating</li>
		<li>keep your bike or e-scooter clear of aisles and doorways</li>
		<li>stay with your bike or e-scooter at all times.</li>
	</ul>
	<p>
		If there is not enough space available, you may be asked to catch another service. Please follow
		the direction of staff.
	</p>
	<p>Peak times are:</p>
	<ul>
		<li>7am - 9:30am towards the CBD</li>
		<li>3pm - 6:30pm outwards from the CBD</li>
	</ul>
	<h2>👔 Commuting by bike on public transport</h2>
	<p>
		Most stations have parking rails, and some have bicycle lockers you can rent, although these are
		often in high demand.
	</p>
	<p>
		If you're commuting, a folding bike may be an option as these are accepted at all times (in a
		bag no bigger than 90cm x 70cm x 36cm).
	</p>
	<p>
		Scooters can be taken on any service as long as they're folded up. If you're travelling by bus,
		fold your scooter and store it in the luggage racks. Please take care to not block the aisle or
		doors.
	</p>
	<p>
		For more info see the Translink <a
			href="https://translink.com.au/travel-with-us/cycling-and-walking">bike locker info.</a
		>
	</p>
	<h2>⛴️ Bikes on ferries</h2>
	<p>Bikes are allowed any time on CityCats, but this is dependent on capacity.</p>
	<p>
		Regular CityCats have dedicated areas to store your bike, the attendent will direct you when you
		board. I'm not sure if smaller KittyCats allow bikes (<a href="mailto:ash@kyd.com.au"
			>let me know</a
		>!)
	</p>
	<p>
		Bikes can be carried onto all vehicle barges to the Southern Moreton Bay Islands, Coochiemudlo
		Island and North Stradbroke Island. You can take bikes on some passenger ferry services subject
		to space availability but it's best to check with the individual operators before setting out.
	</p>
	<Ad />
	<h2>🚌 Bikes on buses</h2>
	<p>
		Brisbane city does not provide any bicycle facilities on buses, so unless you have a foldable
		bike you can't take it on the bus.
	</p>
	<p>
		If you're unfortunate enough to be catching a rail replacement bus, Queensland Rail says you're
		out of luck and can go eat worms. Most rail replacement buses have a luggage area and if you're
		lucky the driver might let you stash your bike. Otherwise you'll have to ride the rest of the
		way!)
	</p>
	<p>
		Cycling in bus lanes and transit lanes is allowed which can be helpful in the CBD, but you can't
		cycle along actual dedicated busways.
	</p>
	<p>
		There was a brief trial of bike racks on buses way back in in 2002, but that never went
		anywhere. Maybe talk to your local councillor.
	</p>
</ArticlePage>
