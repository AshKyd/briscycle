<script lang="ts">
	import ArticlePage from '$lib/components/ArticlePage/ArticlePage.svelte';
	import { meta } from './meta.ts';
	import heroDesktop from './hero-desktop.webp?w=768;1080;1366;1920;2560;3840&format=webp;jpeg&enhanced';
	import heroMobile from './hero-mobile.webp?w=540;768;1080;1440&format=webp;jpeg&enhanced';
</script>

<ArticlePage
	{meta}
	hero={{
		desktop: heroDesktop,
		mobile: heroMobile,
		alt: 'By the edge of Lake Samsonvale there are lots of eucalyptus trees and picnic tables.'
	}}
	map={{
		geojsonUrl: '/geo/day-trips--lake-samsonvale.geo.json'
	}}
>
	<p>
		The trip to Lake Samsonvale is roughly ten kilometres from Petrie station, and is cycleway for
		the most of the journey.
	</p>
	<p>
		It's a pleasant trip to the lake, although as you might expect the journey involves climbing a
		few hills, particularly as you get closer to the dam. The dam is about forty-five metres above
		sea level and the railway station is about ten, so there's a moderate amount of climbing but
		none of it the hills are overly steep and the only truly "get-off-and-push" stretch is the
		sixteen-metre uphill right after you cross the North Pine River.
	</p>
	<p>
		The final leg of the journey requires some road cycling although this mainly involves
		residential back-streets aside for a 150 metre stretch along Forgan Road to get to Bullocky
		Rest.
	</p>
	<h2>Bullocky Rest</h2>
	<p>
		Bullocky Rest is a large picnic area on the eastern bank of Lake Samsonvale. It's a great place
		to have lunch or spend an evening, with picnic shelters, barbecue areas, playgrounds and other
		amenities.
	</p>
	<p>
		The picnic area has the usual facilities including picnic tables, electric barbecues, toilets
		and fresh drinking water, although you will need to bring your own food as there are no shops
		within cycling distance.
	</p>
	<p>There's also playgrounds and bushwalks starting nearby if you're feeling adventurous.</p>
</ArticlePage>
