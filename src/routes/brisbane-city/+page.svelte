<script lang="ts">
	import ArticlePage from '$lib/components/ArticlePage/ArticlePage.svelte';
	import Youtube from '$lib/components/Youtube/Youtube.svelte';
	import { meta } from './meta.ts';
</script>

<ArticlePage
	{meta}
	map={{
		centre: [153.02, -27.47],
		zoom: 13,
		title: 'Map of Brisbane Bike Paths'
	}}
>
	<p>
		Brisbane is a fantastic place to explore by bike. With plenty of bikeways, paths and bike lanes,
		cycling in Brisbane is the best way to see the sights and get some exercise along the way.
	</p>
	<p>
		Most of the Brisbane River has flat bike paths from Toowong &amp; West End all the way through
		to Portside Hamilton, as well as paths through the suburbs and CBD. There's a route for
		everyone, no matter what your cycling ability or preference.
	</p>
	<ul>
		<li>
			The best tourist route would have to be along South Bank, the <a href="goodwill-bridge/"
				>Goodwill Bridge</a
			>, then along the City Reach Boardwalk to Howard Smith Wharves.
		</li>
		<li>
			Don't have your own bike? Check out our guide to <a href="bike-hire-in-brisbane/"
				>bike &amp; scooter hire</a
			> in brisbane and pick yourself up a sweet e-bike.
		</li>
		<li>
			Or if you're looking for a challenge, check out the Brisbane <a href="river-loop/"
				>River Loop</a
			>, with a long and short version depending on your skill level.
		</li>
		<li>More about brisbane bike paths below…</li>
	</ul>
	<h2>What's it like riding in Brisbane?</h2>
	<p>
		It's easy to find off-road paths to explore the city. Check out this scenic ride from West End
		to South Bank, Kangaroo Point, over the Story Bridge and back through the City Botanical
		Gardens.
	</p>
	<Youtube
		url="https://www.youtube.com/watch?v=K8-k3Qt0sLw&amp;list=PLNAiXhy9-wI6AizT1V26NVt7vpr1mtmq1&amp;index=1"
		title="Riding around Brisbane, South Bank, Kangaroo Point and the Story Bridge"
	/>
</ArticlePage>
