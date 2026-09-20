<script lang="ts">
	import ArticlePage from '$lib/components/ArticlePage/ArticlePage.svelte';
	import Image from '$lib/components/Image/Image.svelte';
	import { meta } from './meta.ts';
	import heroDesktop from './PXL_20241027_032957541-desktop.jpg?w=768;1080;1366;1920;2560;3840&format=webp;jpeg&enhanced';
	import heroMobile from './PXL_20241027_032957541.jpg?w=540;768;1080;1440&format=webp;jpeg&enhanced';
	import PXL_20241027_050540334_MP_0 from './PXL_20241027_050540334.MP.jpg?w=540;768;1080;1440;1920&format=webp;jpeg&enhanced';
</script>

<ArticlePage
	{meta}
	hero={{
		desktop: heroDesktop,
		mobile: heroMobile,
		alt: 'The Indooroopilly Green Bridge soars over Moggil Road'
	}}
	map={{
		geojsonUrl: '/geo/brisbane-city--western-freeway-bikeway.geo.json'
	}}
>
	<p>
		The Western Freeway Bikeway is a cycleway that runs parallel to the Western Freeway &amp;
		Centenary Highway from the west of Toowong all the way south through to Sumner.
	</p>
	<p>
		The bikeway is the best way to get to the western suburbs of Brisbane, and connects to the <a
			href="../bicentennial-bikeway/">Bicentennial Bikeway</a
		> via 1500 metres of on-road cycling through Toowong.
	</p>
	<h2>Hill climbing</h2>
	<p>
		This bikeway has some of the best downhill sections in Brisbane, but obviously what goes down
		must come up again.
	</p>
	<p>
		The outbound section from Toowong to Taringa must be one of the longest sustained inclines on a
		bikeway in Brisbane, and there are several other climbs and descents on this route.
	</p>
	<p>
		If you haven't done much cycling before you should take it easy and bring lots of water. And if
		you're planning to ride to work you'll almost certainly need to shower at an end of trip
		facility.
	</p>
	<h2>Things to do &amp; see</h2>
	<p>
		This route tends to be more of a commuter route, but there are several parks and destinations
		that you might be interested in.
	</p>
	<p>
		At the Brisbane end the bikeway starts at Anzac Park which is great for picnics and barbecues.
		Or across the Canon Garland Overpass it's a short ride to the sprawling Mt Coot-tha Botanic
		Gardens which is is a destination in itself. Or if you're up for a climb, visit the peak of Mt
		Coot-tha.
	</p>
	<p>
		Cliveden Park in Fig Tree Pocket is a green space with exercise equipment, junior cycle training
		tracks, a playground and a drone training area.
	</p>
	<Image
		src={PXL_20241027_050540334_MP_0}
		alt="Paperbark trees line a lagoon full of lillypads. A path curves around and a bridge crosses the water"
		align="right"
		caption="The Edenbrook bikeway in Sinnamon Park is a short, but lovely ride"
	/>
	<p>
		Further south across the Brisbane River you'll arrive at Jindalee Skate Park which is a short
		ride to DFO. And there's another generous riverside shared bike &amp; pedestrian path all the
		way to the heritage Rocks Riverside Park &amp; Oxley Wharf.
	</p>
	<p>
		A short detour from Rocks Riverside Park is the Edenbrook Bikeway, which is a shared path
		winding through the rainforest environment of Edenbrook Park, which links via back roads to
		Darra Station.
	</p>
	<h2>Riding to work on the Western Freeway</h2>
	<p>The Western Freeway is a largely dedicated offroad cycleway.</p>
	<p>
		Heading outbound, the route from Toowong to Indooroopilly is fully off-road and bike-only. After
		this you'll hit the occasional road crossing where you must stop and give way to traffic. Once
		you cross the railway past Sumner the bikeway starts to fall apart into a mix of on road and
		footpaths.
	</p>
	<p>
		Heading inbound cycleway ends near Mount Coot-Tha Road at Toowong, so if travelling to the city
		you should turn onto Sylvan Road and follow it until you reach Land Street, and subsequently the
		underpass to the <a href="../bicentennial-bikeway/">Bicentennial Bikeway</a>.
	</p>
	<p>The bikeway stops at:</p>
	<ul class="metro">
		<li>Anzac Park</li>
		<li class="connection">
			Canon Garland Overpass <div>
				to Mt Coot-tha botanical gardens &amp; on-road to Mt Coot-tha summit &amp; loop
			</div>
		</li>
		<li>Equinox St playground <span>Taringa</span></li>
		<li>Julie St <span>Indooroopilly</span></li>
		<li class="connection">
			Indooroopilly Cricket Club <div>
				Carinya Street on the opposite side of the motorway via underpass connection
			</div>
		</li>
		<li>Moggil Road</li>
		<li>Witton Road</li>
		<li class="connection">
			Market Street North &amp; South
			<div>via underpass connection</div>
		</li>
		<li>Fig Tree Pocket Road</li>
		<li>Norman Street</li>
		<li>Musgrave Street</li>
		<li>Spinkbrae Street <span>north of the Brisbane River</span></li>
		<li class="connection">
			Jindalee Skate Park
			<div>connections to DFO, Rocks Riverside Park</div>
		</li>
		<li>Kooringal Drive <span>Jindalee</span></li>
		<li>Sinnamon Road <span>Jindalee</span></li>
		<li>Capitol Drive <span>Jindalee</span></li>
		<li>Dandenong Road <span>Mount Ommaney</span></li>
		<li class="connection">
			Mount Ommaney Shopping Centre
			<div>underpass to Glen Ross Road</div>
		</li>
		<li>Andaman Street <span>north end</span></li>
		<li>Andaman Street <span>south end</span></li>
		<li>Sumners Road <span>Jamboree Heights</span></li>
		<li class="connection">
			Bullockhead Street
			<div>connection to Darra railway station</div>
		</li>
		<li>
			Cycleway ends at Ipswich road <div>though you can continue further south on-road</div>
		</li>
	</ul>
</ArticlePage>
