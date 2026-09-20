<script lang="ts">
	import ArticlePage from '$lib/components/ArticlePage/ArticlePage.svelte';
	import { meta } from './meta.ts';
	import heroDesktop from './PXL_20241107_023728861-desktop.jpg?w=768;1080;1366;1920;2560;3840&format=webp;jpeg&enhanced';
	import heroMobile from './PXL_20241107_023728861.jpg?w=540;768;1080;1440&format=webp;jpeg&enhanced';
</script>

<ArticlePage
	{meta}
	hero={{
		desktop: heroDesktop,
		mobile: heroMobile,
		alt: 'Looking along the Goodwill Bridge on a sunny day as people walk by, QUT, the Captain Cook Bridge and Kangaroo Point in the background.'
	}}
	map={{
		geojsonUrl: '/geo/brisbane-city--goodwill-bridge.geo.json'
	}}
>
	<p>
		The Goodwill bridge is a pedestrian and cycle structure connecting the QUT Gardens Point campus
		and the southernmost part of the CBD with South Bank and the South East Bikeway.
	</p>
	<p>
		The bridge was built in 2001 and was the first of a succession of non-motor bridges to be built
		in the area. Other bridges include the Kurilpa Bridge less than 2 km to the north, and the
		Eleanor Schonell Bridge further up the river.
	</p>
	<p>
		Like the Kurilpa Bridge, the Goodwill Bridge includes several seating bays, which provide a
		great spot to stop and admire the view. The Goodwill Bridge has the added benefit of having the
		Cafe on the Bridge, a coffee cart which serves coffee, tea and desserts all week round.
	</p>
	<h3>Getting to the Goodwill Bridge</h3>
	<p>
		The Goodwill Bridge is accessible from all sides and is a great way to get to and from the city.
		The bikeway follows the river on both sides so it's pretty difficult to miss it.
	</p>
	<p>
		The northern landing takes you to Gardens Point where you can continue on to the QUT Gardens
		Point campus, turn right through the Botanic Gardens and on to the <a
			href="/brisbane-city/riverwalk/">Riverwalk</a
		>, or left onto the <a href="/brisbane-city/bicentennial-bikeway/">Bicentennial Bikeway</a> to Toowong.
	</p>
	<p>
		The southern end lands at South Bank where you can stop at the pub, or continue left or right
		along the river. To get to the <a href="/brisbane-city/southeast-freeway-bikeway/"
			>Southeast Bikeway</a
		> and southern suburbs, turn left and follow the water until you see the M1 Motorway overhead.
	</p>
	<h3>Interesting Things Nearby</h3>
	<p>
		There's plenty of dining nearby, including the Ship Inn pub at the southern end, and South Bank
		beyond. Alternatively you might want to stop at the top and grab a coffee while you admire the
		view.
	</p>
	<p>
		The Queensland Maritime Museum is also at the southern foot of the bridge. The museum has a show
		of models and vessels including the Diamantina, a World War 2 navy frigate which you can explore
		top to bottom.
	</p>
	<p>
		Or if you're feeling like a picnic or barbecue lunch, there are plenty of spots around South
		Bank and the Kangaroo Point Cliffs.
	</p>
</ArticlePage>
