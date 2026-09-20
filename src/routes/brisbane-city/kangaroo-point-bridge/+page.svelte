<script lang="ts">
	import ArticlePage from '$lib/components/ArticlePage/ArticlePage.svelte';
	import Ad from '$lib/components/Ad/Ad.svelte';
	import Image from '$lib/components/Image/Image.svelte';
	import { meta } from './meta.ts';
	import heroDesktop from './hero-desktop.jpg?w=768;1080;1366;1920;2560;3840&format=webp;jpeg&enhanced';
	import heroMobile from './hero-mobile.jpg?w=540;768;1080;1440&format=webp;jpeg&enhanced';
	import PXL_20230907_003618396_0 from './PXL_20230907_003618396.jpg?w=540;768;1080;1440;1920&format=webp;jpeg&enhanced';
	import PXL_20241107_061405920_1 from './PXL_20241107_061405920.jpg?w=540;768;1080;1440;1920&format=webp;jpeg&enhanced';
	import kp_story_bridge_tunnel_complete_2 from './kp-story-bridge-tunnel-complete.jpg?w=540;768;1080;1440;1920&format=webp;jpeg&enhanced';
	import PXL_20241107_055421322_3 from './PXL_20241107_055421322.jpg?w=540;768;1080;1440;1920&format=webp;jpeg&enhanced';
</script>

<ArticlePage
	{meta}
	hero={{
		desktop: heroDesktop,
		mobile: heroMobile,
		alt: 'The sails of the Kangaroo Point Green Bridge glisten in the afternoon sun'
	}}
	map={{
		geojsonUrl: '/geo/brisbane-city--kangaroo-point-bridge.geo.json'
	}}
	openDate="15 December 2024"
>
	<p>
		The KP green bridge will connect Kangaroo Point with the CBD at the north end of the city
		botanical gardens with dedicated cycle lanes. The bridge is closed to motor traffic, so it's a
		safe way to walk, scoot, and cycle around the city.
	</p>
	<p>
		When it's completed, you can get from the CBD, Eagle Street/Riverside precinct, and botanical
		gardens directly across to the Kangaroo Point Cliffs and Captain Burke Park.
	</p>
	<p>
		A new tunnel under the Story Bridge will also link up with the <a
			href="/brisbane-city/east-brisbane-bikeway/">East Brisbane bikeway</a
		> along Shafston Avenue/Lytton Road for communters in East Brisbane and beyond. It's going to be great.
	</p>
	<p>
		The bridge will be shaded by solar panels along the entire length, and have integrated
		vegetation to help keep things cool in the hot subtropical climate. The bridge will have a
		restaurant over the water, and the public viewing platforms will be a great spot to pause and
		enjoy the river views or snap some photos.
	</p>
	<p>The bridge has at most a gentle 1:20 grade for even novice cyclists to power up.</p>
	<Ad loadsScript />
	<h2>Kangaroo Point bridge construction</h2>
	<Image
		src={PXL_20230907_003618396_0}
		alt="In 2023, a photo of The Kangaroo Point Bridge heads out from the city shore, but doesn't cross the whole river yet"
		align="right"
		caption="The bridge when it was under construction"
	/>
	<p>
		The bridge is a 460 metre long single-mast <a
			href="https://en.wikipedia.org/wiki/Cable-stayed_bridge">cable-stayed</a
		>
		pedestrian bridge, similar to
		<a href="/brisbane-city/neville-bonner-bridge/">the Neville Bonner bridge</a>. It's one of the
		longest cable-stayed pedestrian bridges of its kind in the world. The mast towers 83 metres
		above the bridge deck.
	</p>
	<p>
		BESIX Watpac was awarded the contract to design and build the Green Bridge. Construction started
		in 2021 and will finish later in 2024.
	</p>
	<p>
		The bridge includes a number of best-practice sustainable features including solar panels on the
		shade cover to power the bridge’s lighting, rain gardens at C.T. White Park to slow stormwater
		run-off, and extensive use of native plants in new landscaping.
	</p>
	<h2>November 2024 status</h2>
	<p>As of January 2024 the bridge is still under construction but looks visibly complete.</p>
	<p>
		The Kangaroo Point end crosses the existing bikeway at Hamilton Street, and the tunnel at Main
		Street is open to the public. On the city end the bikeway has reopened at the Botanic Gardens
		while construction continues.
	</p>
	<p>The bridge is scheduled to open in December.</p>
	<div class="gallery">
		<Image
			src={PXL_20241107_061405920_1}
			alt="The bridge spans the river from the botanic gardens to Kangaroo Point"
			caption="The bridge spans the river from the botanic gardens to Kangaroo Point"
		/>
		<Image
			src={kp_story_bridge_tunnel_complete_2}
			alt="A tunnel and bikeway connection underneath the Story Bridge"
			caption="The tunnel connects to the East Brisbane bikeway"
		/>
		<Image
			src={PXL_20241107_055421322_3}
			alt="The Kangaroo Point end has clearly separated bike and pedestrian lanes"
			caption="The Kangaroo Point end has clearly separated bike and pedestrian lanes"
		/>
	</div>
	<h2>Interesting Things Nearby</h2>
	<p>
		There are plenty of dining options nearby. The bridge includes an integrated restaurant and
		coffee options. The Eagle Street precinct on the CBD side has plenty of dining and drinks
		options. The Kangaroo Point end is close to the Baildon Street precinct, home of the Story
		Bridge Hotel.
	</p>
	<Ad />
	<p>
		What about free things to do in Brisbane? The Botanical Gardens, or Kangaroo Point Cliffs are
		always good for a stroll or a picnic. Captain Burke Park and The Cliffs have free barbecues and
		picnic shelters.
	</p>
	<p>
		Alternatively if you're up for a scenic hike or bike, you can do a loop around the City Reach
		Boardwalk, across the Kangaroo Point Green Bridge (once it's completed), up and over the Story
		Bridge, then down Ivory Lane to Howard Smith Wharves.
	</p>
</ArticlePage>
