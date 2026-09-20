<script lang="ts">
	import ArticlePage from '$lib/components/ArticlePage/ArticlePage.svelte';
	import { meta } from './meta.ts';
	import heroDesktop from './hero-desktop.webp?w=768;1080;1366;1920;2560;3840&format=webp;jpeg&enhanced';
	import heroMobile from './hero-mobile-1440.webp?w=540;768;1080;1440&format=webp;jpeg&enhanced';
</script>

<ArticlePage
	{meta}
	hero={{
		desktop: heroDesktop,
		mobile: heroMobile,
		alt: 'A boardwalk alongside water, pine trees and a bright blue sky'
	}}
	map={{
		centre: [153.271, -27.526],
		zoom: 13
	}}
>
	<p>Redland City has a comprehensive cycling network for both recreation and commuting.</p>
	<p>
		It's possible to cycle from the top to the bottom with very few instances requiring cycling on
		the road. And while the Moreton Bay Cycleway is neither completed or well signed, a number of
		coastal cycleways exist to take you as fas south as Cleveland.
	</p>
	<p>
		In addition to mainland cycling, Redland City also has attractive off-shore cycling routes,
		including a number of tourist facilities on the Bay Islands and North Stradbroke Island. The
		islands are only accessible by ferry.
	</p>
</ArticlePage>
