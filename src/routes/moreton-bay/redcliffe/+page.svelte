<script lang="ts">
	import ArticlePage from '$lib/components/ArticlePage/ArticlePage.svelte';
	import Image from '$lib/components/Image/Image.svelte';
	import { meta } from './meta.ts';
	import gayundah_0 from './gayundah.jpg?w=540;768;1080;1440;1920&format=webp;jpeg&enhanced';
</script>

<ArticlePage
	{meta}
	map={{
		centre: [153.1, -27.228],
		zoom: 12
	}}
>
	<p>
		If you're looking for a great bike ride, check out the Moreton Bay Cycleway at Redcliffe. It
		follows the waterfront from Clontarf to Scarborough via Redcliffe.
	</p>
	<p>
		But heads up, the cycleway isn't completely finished yet and the signs aren't always clear. In
		Woody Point, the path disappears and you can take either the footpath or a quiet road to the
		opposite section.
	</p>
	<Image
		src={gayundah_0}
		alt="The HMQS Gayundah Wreck off Woody Point"
		align="right"
		caption="You can view the HMQS Gayundah wreck at Woody Point"
	/>
	<p>
		Overall, the ride is really enjoyable, especially along Hornibrook Esplanade where you can go
		pretty fast with a tailwind. But in Redcliffe because you'll be sharing the path with
		pedestrians, and it can get crowded on weekends so sure you have a working bell.
	</p>
	<p>
		The cycleway goes through Scarborough and loops back around the Redcliffe Peninsula. At Kippa
		Ring the cycleway splits in two. Anzac Avenue will take you to North Lakes and Kallangur, but if
		you want to stay on the Moreton Bay Cycleway, take Nathan Road to Deception Bay.
	</p>
	<h2>What To Do In Redcliffe</h2>
	<p>
		Redcliffe is a great seaside destination. The majority of the cycleway is through seaside
		parkland, notably on the south near Clontarf, but there's also a number of parks in Scarborough
		and Redcliffe itself.
	</p>
	<ul>
		<li>
			Pelican Park and Bicentennial Park — either side of Bells Beach — are both great destinations.
			The cycleway weaves through both, and there's plenty of places to stop for water, picnics, or
			eateries.
		</li>
		<li>
			Redcliffe Lagoon, at the very end of Anzac Avenue, is a decent family area. The man-made
			lagoon is great for the younger ones, but there's picnic areas and shopping areas to explore
			as well.
		</li>
		<li>
			Visit the Gayundah Wreck at Woody Point for your fix of maritime history and a rest stop in
			the surrounding parkland.
		</li>
	</ul>
</ArticlePage>
