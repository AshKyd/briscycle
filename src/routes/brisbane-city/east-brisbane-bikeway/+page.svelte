<script lang="ts">
	import ArticlePage from '$lib/components/ArticlePage/ArticlePage.svelte';
	import Ad from '$lib/components/Ad/Ad.svelte';
	import Image from '$lib/components/Image/Image.svelte';
	import { meta } from './meta.ts';
	import heroDesktop from './lytton-road-bikeway-3840-hq.avif?w=768;1080;1366;1920;2560;3840&format=webp;jpeg&enhanced';
	import heroMobile from './lytton-road-bikeway-upscale.jpg?w=540;768;1080;1440&format=webp;jpeg&enhanced';
	import kp_story_bridge_tunnel_complete_0 from './kp-story-bridge-tunnel-complete.jpg?w=540;768;1080;1440;1920&format=webp;jpeg&enhanced';
</script>

<ArticlePage
	{meta}
	hero={{
		desktop: heroDesktop,
		mobile: heroMobile,
		alt: "The bikeway runs alongside Lytton road. There's lots of plants and greenery, and a pedestrian crossing coming up ahead."
	}}
	map={{
		geojsonUrl: '/geo/brisbane-city--east-brisbane-bikeway.geo.json'
	}}
>
	<p>
		The Lytton Road bikeway runs most of the way from Kangaroo Point to Norman Park completely
		offroad.
	</p>
	<h2>Getting to the East Brisbane Bikeway</h2>
	<p>
		As of early 2024 there isn't a direct way to get to the bikeway form the CBD. You must either
		cross at the Goodwill Bridge and double back to Kangaroo Point, or cross the Story Bridge.
	</p>
	<p>
		From Kangaroo Point the bikeway begins at the southern end of Deakin Street, following alongside
		Shafston Avenue and Lytton Road. The Shafston Avenue segment has a pretty steep hill outbound (I
		couldn't make it up on my single speed bike), so you'll often see people riding the back roads
		along Lambert Street.
	</p>
	<p>
		Once you're on the bikeway it's an easy breezy route with plenty of space, and only a few
		traffic lights.
	</p>
	<p>
		At the far end of the bikeway you can continue on road or footpath to the eastern suburbs
		including Hawthorne, Balmoral, Bulimba, Morningside etc.
	</p>
	<Ad loadsScript />
	<h2>Construction status</h2>
	<Image
		src={kp_story_bridge_tunnel_complete_0}
		alt="A tunnel and bikeway connection underneath the Story Bridge"
		align="right"
		caption="The tunnel connects to the Kangaroo Point Green Bridge"
	/>
	<p>
		When the <a href="/brisbane-city/kangaroo-point-bridge/">Kangaroo Point</a> is finished later in 2024,
		you will be able to ride straight from the CBD to Norman Park via a tunnel under the Story Bridge.
	</p>
	<p>
		The bikeway was planned to be built in stages. It currently runs as far east as Canning Bridge
		at Norman Park before reverting to a narrow footpath. The next phase of the project isn't listed
		on the Brisbane Council website and isn't likely any time soon.
	</p>
	<h2>Interesting Things Nearby</h2>
	<p>
		The bikeway runs right past Mowbray Park which is a a good spot for a bbq. You can also take
		your bike on the ferry to or from Mowbray Park Terminal to get across the New Farm Park and
		beyond.
	</p>
	<p>
		This is mainly a commuter route, but the Shafston Hotel is nearby, as well as a few takeaway
		food options opposite the park.
	</p>
	<p>
		At the Norman Park end of the bikeway you can continue along the Norman Creek Bikeway. At the
		Kangaroo Point end you can check out Captain Burke Park and continue along the Kangaroo Point
		bikeway.
	</p>
</ArticlePage>
