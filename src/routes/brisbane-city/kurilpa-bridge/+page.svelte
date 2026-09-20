<script lang="ts">
	import ArticlePage from '$lib/components/ArticlePage/ArticlePage.svelte';
	import { meta } from './meta.ts';
	import heroDesktop from './hero-desktop.jpg?w=768;1080;1366;1920;2560;3840&format=webp;jpeg&enhanced';
	import heroMobile from './hero-mobile.jpg?w=540;768;1080;1440&format=webp;jpeg&enhanced';
</script>

<ArticlePage
	{meta}
	hero={{
		desktop: heroDesktop,
		mobile: heroMobile,
		alt: 'Kurilpa Bridge at night, the cantilevers lit in red. GOMA is illuminated blue in the background. The footpath is brightly lit in warm light.'
	}}
	map={{
		geojsonUrl: '/geo/brisbane-city--kurilpa-bridge.geo.json'
	}}
>
	<p>
		The Kurilpa Bridge is a pedestrian and cycle bridge which connects the northern end of the
		Brisbane CBD to South Bank.
	</p>
	<p>
		Kurilpa Bridge is unique in that it's the first major pedestrian bridge in the world to use
		tensegrity cable stay principles. This design gives the bridge it's distinctive spiky appearance
		which has led people nickname it the "sticks bridge", or other variations on the name.
	</p>
	<p>
		The Kurilpa Bridge connects areas on the north such as the Roma Street train station,
		Bicentennial Bikeway, and Roma Street Parklands to areas on the south like South Bank itself, as
		well as the Gallery of Modern Art and further on to Montague Road.
	</p>
	<h3>Getting to the Kurilpa Bridge</h3>
	Getting to the Kuripla Bridge is easy from South Brisbane. You can ride along the river in either direction,
	so you can keep following the waterfront until you get to one of the bridges. To get to the bridge from
	West End, you can either duck down to the waterfront via Jane Street, or Montague Road isn't too bad
	if you're comfortable cycling on the road.
	<p>
		Access from the north side is generally trickier, with the only access via Tank Street. Tank
		Street itself has a counterflow bike lane and bike friendly traffic lights so you can ride to
		and from the lane on George Street. The roads on the north side of the river are confusing, so
		you should consult a map in advance or be prepared to stick to the footpath.
	</p>
	<p>
		Access from the Bicentennial Bikeway is not recommended due to steep hills and a major road
		crossing. It's recommended that you use the Go Between Bridge or the Goodwill Bridge if you're
		using the Bicentennial Bikeway.
	</p>
	<h3>Interesting Facts about Kurilpa Bridge</h3>
	The Kurilpa Bridge uses tensegrity construction principles to stay upright. Basically this means that
	each pillar is held up by the tension in the cables between pillars. None of the pillars need to touch
	each other to keep upright.
	<p>
		The bridge is additionally completely solar powered, requiring no input from the grid to keep
		itself lit up. The bridge has 84 solar panels which can provide 38 MWh annually, with excess
		power being fed back into the power grid. In addition, the Kurilpa Bridge has an advanced array
		of LED lighting that can be used to participate in light shows such as RiverFire, though the
		solar capacity alone isn't enough to keep the bridge fully lit up.
	</p>
	<p>
		The bridge was named World Transport Building of the Year at the World Architecture Festival in
		2011.
	</p>
</ArticlePage>
