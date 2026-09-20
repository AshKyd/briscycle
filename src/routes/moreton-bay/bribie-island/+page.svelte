<script lang="ts">
	import ArticlePage from '$lib/components/ArticlePage/ArticlePage.svelte';
	import Ad from '$lib/components/Ad/Ad.svelte';
	import { meta } from './meta.ts';
	import heroDesktop from './PXL_20250315_043824500-desktop.jpg?w=768;1080;1366;1920;2560;3840&format=webp;jpeg&enhanced';
	import heroMobile from './PXL_20250315_043824500.jpg?w=540;768;1080;1440&format=webp;jpeg&enhanced';
</script>

<ArticlePage
	{meta}
	hero={{
		desktop: heroDesktop,
		mobile: heroMobile,
		alt: 'A shady foreshore park on Bribie Island. A huge fig tree frames a path along the calm blue waters of Pumicestone Passage, with pandanus palms and people walking and sitting on the grass.'
	}}
	map={{
		centre: [153.148, -27.069],
		zoom: 13
	}}
>
	<p>
		Bribie Island is a large sand island about twenty kilometres east of Caboolture, and is
		connected to the mainland via a vehicle and pedestrian bridge.
	</p>
	<p>
		Bribie Island serves as the northern-most endpoint for the <a href="/moreton-bay/"
			>Moreton Bay Cycleway</a
		>, but very few bicycle facilities have yet been constructed between the island and Deception
		Bay so it's not advised to cycle this route unless you're a confident road cyclist.
	</p>
	<Ad loadsScript />
	<h2>Bikes on Bribie Island</h2>
	<p>Bribie Island itself is a great cycle destination for the novice and expert alike.</p>
	<p>
		There's an cycle network along the eastern side of the island, a comprehensive residential cycle
		network on the mainland between Sandstone Point and Ningi, and a cycle track most of the way
		between the bridge to the mainland and the beach at Woorim on the eastern side of the island.
	</p>
	<p>
		There are also bicycle hire facilities available from the plaza area to the south of the bridge
		at Bongaree.
	</p>
	<h2>What to do on Bribie Island</h2>
	<p>
		There's two main cycle destinations on Bribie Island; <em>Bongaree</em> on the west, and
		<em>Woorim</em> on the east.
	</p>
	<p>
		Bongaree sits on the bay side of the island and a great spot to eat and explore. There's
		everything from take-away fish &amp; chips to cafes, to pub meals. It's a great place to have
		lunch and unwind after a ride.
	</p>
	<Ad />
	<p>
		The beach at Woorim is arguably the main attraction of Bribie Island. It's the closest ocean
		beach to Brisbane and it's perfect if you're looking for waves and white sand. So bring your
		swimwear. There's a few shops for snacks on this side of the island, but the main attraction is
		the surf.
	</p>
	<h2>Bribie Island Attractions</h2>
	<p>
		The scenic <a
			href="https://www.moretonbay.qld.gov.au/Galleries-Museums/Locations/Seaside-Museum"
			>Bribie Island Seaside Museum</a
		> overlooks the iconic Pumicestone Passage at Bongaree. It displays collections celebrating the rich
		and fascinating history of Bribie Island, including stories from First Nations elders. Free entry.
	</p>
	<p>
		If arts is your thing, check out the <a href="https://www.bribieartscentre.com.au/"
			>Community Arts Centre &amp; Gallery</a
		> for wood crafters, visual arts, and the famous gem club. Free entry.
	</p>
	<p>
		If you're looking for a bikepacking tour there's a number of accommodation and campsites on
		Bribie Island, though many of the camps require a four-wheel-drive to get to. Check out the
		Queensland Government's <a href="https://parks.des.qld.gov.au/parks/bribie-island/camping"
			>guide to camping on Bribie</a
		>.
	</p>
	<p>
		On your way home, consider stopping by the <a href="https://abbeymuseum.com.au/">Abbey Museum</a
		>, halfway between Bribie and Caboolture, or time your visit around the
		<a href="https://www.abbeymedievalfestival.com/">Medieval Festival</a>.
	</p>
	<h2>Bribie Island Bridge</h2>
	<p>
		The bridge to Bribie Island is the only let-down, as it was originally built in 1963 and is in
		desperate need of an upgrade.
	</p>
	<p>
		The cycleway on either end narrows into a footway across the bridge, with bays to allow for
		passing. There is not enough room to even walk two abreast, and the railing can be a challenge
		if you get tangled in it.
	</p>
	<Ad />
	<p>
		Bribie Island is a booming suburban area, although replacing the aging bridge is a low priority.
		It's on the <a
			href="https://www.tmr.qld.gov.au/projects/caboolture-bribie-island-road-bribie-island-bridge-planning"
			>Queensland Government radar for upgrade</a
		>
		and there's a proposal to
		<a href="https://www.moretonbay.qld.gov.au/News/Media/Save-Bribie-Bridge-By-Turning-it-Green"
			>keep the heritage bridge as a green bridge</a
		>
		much like the <a href="../hornibrook-bridge/">Hornibrook Bridge</a> to the south.
	</p>
</ArticlePage>
