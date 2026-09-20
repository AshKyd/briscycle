<script lang="ts">
	import ArticlePage from '$lib/components/ArticlePage/ArticlePage.svelte';
	import { meta } from './meta.ts';
	import heroDesktop from './kedron-brook-hero-desktop.jpg?w=768;1080;1366;1920;2560;3840&format=webp;jpeg&enhanced';
	import heroMobile from './kedron-brook-hero-mobile.jpg?w=540;768;1080;1440&format=webp;jpeg&enhanced';
</script>

<ArticlePage
	{meta}
	hero={{
		desktop: heroDesktop,
		mobile: heroMobile,
		alt: 'People picnicking in Kalinga Park, along the Kedron Brook bikeway.',
		attribution: {
			name: 'Brisbane City Council',
			title: 'Kalinga Park, Kalinga',
			url: 'https://www.flickr.com/photos/50553864@N06/10793131604',
			license: 'https://creativecommons.org/licenses/by/2.0/'
		}
	}}
	map={{
		centre: [153.028, -27.417],
		zoom: 14
	}}
>
	<p>
		The <em>Kedron Brook</em> bikeway is a major cycleway that links a number of suburbs from
		Mitchelton to both Gympie and Sandgate Roads. The cycleway also connects to the
		<a href="jim-soorley-bikeway/">Jim Soorley Bikeway</a>, and continues to the northern section of
		the <a href="/moreton-bay/">Moreton Bay Cycleway</a>.
	</p>
	<p>The cycleway runs along the nature corridor stemming from Kedron Brook.</p>
	<p>
		The cycleway consists of mostly concrete paths, although there are a few sections that connect
		to back roads. Motor vehicle traffic in these sections is extremely rare though, and you'll find
		it's quite a nice route.
	</p>
	<h3>Making a Day of Kedron Brook</h3>
	<p>
		Unless you live nearby, the easiest way to get there is to catch a train to either Toombul or
		Mitchelton railway stations. The cycleway doesn't run directly past either station, but there's
		less than 300 metres of road (or footpath) cycling to get there.
	</p>
	<p>
		The Kedron Brook Cycleway is relatively easy traveling, so expect to make good time. The entire
		trip from Toombul to Mitchelton probably won't take you more than an hour and a half.
	</p>
	<p>
		There's plenty of places to stop for water, although as always you're advised to take a bottle
		of your own. Mercer park is particularly nice to have a picnic in and has plenty of shelters and
		even some walking trails. Alternatively if you're looking for take-away, you could stop in at
		either Brookside or Toombul Shopping Centres at either end of the cycleway.
	</p>
</ArticlePage>
