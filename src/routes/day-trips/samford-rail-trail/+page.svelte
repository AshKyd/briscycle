<script lang="ts">
	import ArticlePage from '$lib/components/ArticlePage/ArticlePage.svelte';
	import Ad from '$lib/components/Ad/Ad.svelte';
	import Image from '$lib/components/Image/Image.svelte';
	import Youtube from '$lib/components/Youtube/Youtube.svelte';
	import { meta } from './meta.ts';
	import heroDesktop from './hero-4k.webp?w=768;1080;1366;1920;2560;3840&format=webp;jpeg&enhanced';
	import heroMobile from './hero-mobile-1440.webp?w=540;768;1080;1440&format=webp;jpeg&enhanced';
	import heritage_museum_desktop_0 from './heritage-museum-desktop.webp?w=540;768;1080;1440;1920&format=webp;jpeg&enhanced';
	import samford_link_desktop_1 from './samford-link-desktop.webp?w=540;768;1080;1440;1920&format=webp;jpeg&enhanced';
</script>

<ArticlePage
	{meta}
	hero={{
		desktop: heroDesktop,
		mobile: heroMobile,
		alt: 'A bike path stretches off into the Australian bushland'
	}}
	map={{
		googleMaps:
			'https://www.google.com/maps/dir/-27.4009717,152.9341717/Samford+Village+QLD/@-27.3900902,152.8894016,14.07z/data=!4m14!4m13!1m5!3m4!1m2!1d152.8924926!2d-27.3851133!3s0x6b9155b6c0b4b30b:0xd04a1e06b1fe3b2d!1m5!1m1!1s0x6b9155bcd4331cc3:0x502a35af3de97c0!2m2!1d152.8865195!2d-27.3736793!3e1',
		geojsonUrl: '/day-trips/samford-rail-trail/samford.geo.json'
	}}
>
	<p>
		Samford is a rural area nestled in the rolling hills northwest of Brisbane. The area has a
		vibrant cafe scene, a welcoming atmosphere and old fashioned country hospitality.
	</p>
	<p>
		Samford's natural beauty and convenient location between Brisbane and the Sunshine Coast make it
		a great choice for a day trip, with plenty of activities to explore.
	</p>
	<Ad loadsScript />
	<h2>Samford Link &amp; the rail trail</h2>
	<p>
		The Samford Link (also known as the Samford Rail Trail) is a relatively flat walking, cycling
		and scooter route between Samford Village and Ferny Grove Train Station.
	</p>
	<p>
		The trail is made from several quiet back roads, and a few off-road paved cycling paths to
		connect the route up, and a small amount of on-road cycling.
	</p>
	<p>
		The rail trail takes you off-road from Ferny Grove along a 1.5 km bushland trail that follows
		the gently sloped route of the old railway line. The trail meets up with the mostly quiet rural
		back-streets of Camp Mountain and takes you onward to Samford.
	</p>
	<p>
		Once in Samford there's plenty of options for food, water taps, and a bike repair station at the
		southern end of John Scott Park.
	</p>
	<p>
		While the rail trail slopes upward to Samford, the trip back is a treat, as it's largely
		downhill. Check out the video:
	</p>
	<Youtube
		url="https://www.youtube.com/watch?v=RO_mI6p4jSE&amp;list=PLNAiXhy9-wI6AizT1V26NVt7vpr1mtmq1&amp;index=3"
		title="The Samford rail trail"
	/>
	<h2>Riding from Brisbane to Samford</h2>
	<p>
		It's possible to ride directly from Brisbane to Samford on mostly bike paths. Take the Northern
		Bikeway, then turn left onto the <a href="/day-trips/kedron-brook-cycleway/"
			>Kedron Brook Bikeway</a
		>, then ride the remainder of the way to Ferny Grove station where you meet up with the Samford
		Link. The trip is a little under 40 km depending on your route, and while it's mostly uphill
		it's a very gentle grade.
	</p>
	<p>
		If you're looking for an easier day trip, take your bike on the train. The Samford Link follows
		the route of the old railway line that now terminates at Ferny Grove station. So you can take
		your bike on the train and end up directly at the foot of the bike route.
	</p>
	<p>
		The ride back from Samford to Brisbane is largely downhill, and even if you're not an especially
		strong cyclist I recommend giving it a go. The Kedron Brook bikeway follows pretty close to the
		Ferny Grove line, so if you change your mind you can jump on a train at stations like Keperra,
		Mitchelton, or Toombul.
	</p>
	<Ad />
	<h2>What to do on a day trip to Samford</h2>
	<p>
		After riding up the path to Clear Mountain, you'll probably be in the mood for food. There's
		plenty of options to choose from, whether you're after pizza, seafood, pub food, or a stop at a
		cafe.
	</p>
	<Image
		src={heritage_museum_desktop_0}
		alt="A sign pointing to blacksmith shop, tool shed, stationary engines, toy memories &amp; wartime memories"
		align="right"
		caption="Walk through old buildings and discover relics restored by the volunteers at Samford Historical Museum"
	/>
	<p>
		Head down Main Street&nbsp; from the roundabout and you'll find plenty of cafes and pubs. Or for
		a cheap option grab something from the IGA and use the free barbecues at the park.
	</p>
	<p>
		Once you've recharged, check out the rest of the heritage of the town. The <a
			href="https://www.samfordmuseum.com.au/">Samford Historical Museum</a
		> ($5 adult entry) is a great place to wander around and explore the history of the region. Check
		out the blacksmith at work (on the first Sunday of each month).
	</p>
	<p>
		The <a href="https://www.thehutsamfordartandcraft.com/">Slab Hut Art and Craft gallery</a> is nearby
		and worth a peek. There's also a free heritage walk around the town to discover the secrets, history,
		and architecture of the village.
	</p>
	<p>
		So you won't be short of something to do. For more info, the Moreton Bay Council also has a <a
			href="https://www.visitmoretonbayregion.com.au/blog/samford-best-day-trips-from-brisbane"
			>travel guide for Samford</a
		> you might want to check out.
	</p>
	<Ad />
	<h2>What to expect</h2>
	<p>
		The cycle link was built in 2 stages from late 2015 to early 2018, at a total cost of $3.2
		million.
	</p>
	<Image
		src={samford_link_desktop_1}
		alt="A bike path with a small bridge weaves through a grassy rural area"
		align="right"
		caption="The bits of the Samford Link that follow the old rail route are smooth and delightful"
	/>
	<p>
		At the Samford end of the link, the railway line was lost to private development so the route
		stops abruptly a short distance from Samford. When I did this trip I found it to be some of the
		most unexpectedly steep uphill-downhill stretches of on-road riding I've ever had the misfortune
		of pushing my single-speed bike up. Oops!
	</p>
	<p>
		Coming into Samford Village there is a stretch of on-road riding along Camp Mountain Road with a
		60 km/h speed limit and no shoulder. Again, I ran out of steam and had to push my single-speed
		up the ditch next to the road to avoid cars.
	</p>
	<p>
		This was largely my own fault for taking a single speed bike, and you'll probably be okay with a
		bit of gearing. But I mention it because if you aren't confident or were thinking of taking your
		kids I'd advise caution.
	</p>
	<p>
		Once in Samford you can just lock your bike to the fence and go exploring! Whether that's
		finding a good cafe, checking out the heritage, or just chilling in the park.
	</p>
	<Ad />
</ArticlePage>
