<script lang="ts">
	import ArticlePage from '$lib/components/ArticlePage/ArticlePage.svelte';
	import Ad from '$lib/components/Ad/Ad.svelte';
	import CopyCode from '$lib/components/CopyCode/CopyCode.svelte';
	import Youtube from '$lib/components/Youtube/Youtube.svelte';
	import { meta } from './meta.ts';
	import heroDesktop from './PXL_20241109_044636213-desktop.jpg?w=768;1080;1366;1920;2560;3840&format=webp;jpeg&enhanced';
	import heroMobile from './PXL_20241109_044607647.jpg?w=540;768;1080;1440&format=webp;jpeg&enhanced';
</script>

<ArticlePage
	{meta}
	hero={{
		desktop: heroDesktop,
		mobile: heroMobile,
		alt: 'A green Lime bike sits next to the Brisbane River'
	}}
>
	<p>
		One of the better ways to explore a new city is by bike, because you can take as much time as
		you like, stop wherever something catches your eye, and get a real perspective of life in
		Brisbane.
	</p>
	<p>
		Brisbane is a great city for cycling because the city centre is ringed with bike paths, and
		there are two bike and scooter share schemes in the city.
	</p>
	<Ad loadsScript />
	<h2>🚲 Bike share (and scooters too!)</h2>
	<p>
		Before heading out, you should download and sign up to both <a href="https://www.li.me/en-au/"
			>Lime</a
		> app.
	</p>
	<p>
		Subscription is free, and you can see a map of all the bikes and scooters available to hire in
		your area.
	</p>
	<h2>💰 Free trips with Lime and Neuron</h2>
	<p>Use my signup code to get free credit on hire bikes:</p>
	<div class="cards">
		<div class="card__link">
			<div class="card__content" style="display:flex;">
				<div style="margin-right:10px;">
					<img
						src="/brisbane-city/bike-hire-in-brisbane/lime.webp"
						alt=""
						role="presentation"
						width="32"
						height="32"
					/>
				</div>
				<div>
					<h3>Lime signup code</h3>
					<p>Get $4 off your first ride:</p>
					<CopyCode code="R7UVNJ3IU6E" />
				</div>
			</div>
		</div>
	</div>
	<Ad />
	<h2>🤑 Life hack: get a day pass</h2>
	<p>
		Beam and Lime aren't exactly cheap. If you're doing anything more than a quick scoot, a daily or
		weekly pass is much better value.
	</p>
	<ul>
		<li>
			<strong>BEAM</strong>: 3 day pass on Beam costs $13 and gives you 60 minutes ride time. You
			may only use the pass
			<a
				href="https://support.ridebeam.com/en/articles/6795893-am-i-able-to-use-my-pass-in-other-cities"
				>in the city where you bought it</a
			>.
		</li>
		<li>
			<strong>Lime</strong>: Lime passes are more straightforward, you can buy 30, 60, 160, and 300
			minute passes for use within various time periods, starting at $7.99 for 30 minutes.
		</li>
	</ul>
	<p>
		While this sounds like a lot of money, a couple of trips can easily exceed the price of a daily
		pass so it often works out cheaper to just get one.
	</p>
	<h2>Video: What's it like riding in Brisbane?</h2>
	<Youtube
		url="https://www.youtube.com/watch?v=K8-k3Qt0sLw&amp;list=PLNAiXhy9-wI6AizT1V26NVt7vpr1mtmq1&amp;index=1"
		title="Riding around Brisbane, South Bank, Kangaroo Point and the Story Bridge"
	/>
	<h2>Longer bike rentals</h2>
	<p>
		If you're in the city for a week you can <a
			href="https://riverlife.com.au/project/brisbane-bike-hire/"
			>hire a bike from Riverlife for $199</a
		>. They're located at the <a href="/brisbane-city/kangaroo-point-bridge/">Kangaroo Point</a> cliffs,
		a short ferry ride or bike from the CBD. Riverlife also offer kayaks and rollerblades if you want
		a different kind of adventure.
	</p>
	<p>
		If you want something higher end, <a href="https://www.epiccycles.com.au/service/bike-hire/"
			>Epic Cycles is a reputable brand that offers road bikes, foldables, ebikes and cargo bikes</a
		> to get you around. City bikes start at $360/week, and you can score yourself an ebike from $650/week.
		Epic Cycles isn't too far from Milton train station, or it's a 15 minute walk from the ferry.
	</p>
	<h2>🪖 Wear a helmet</h2>
	<p>
		Australian law requires you wear a helmet at all times while you ride a bicycle. This is
		strictly enforced and the fines are quite steep, so don't risk it.
	</p>
	<p>
		There are usually helmets provided on the bikes, although occasionally it may be damaged or
		missing.
	</p>
	<p>
		There will usually be another bike nearby with a helmet (or occasionally left in a tree or
		garden), so check around. You can also buy a cheap helmet for under $25 from department stores
		like Big W or Target if you'd prefer to use your own.
	</p>
	<p>Check out more <a href="/bicycle-regulation/">rules on riding bikes</a>.</p>
	<h2>🚲 What happened to CityCycle</h2>
	<p>
		CityCycle was the old yellow bike hire scheme, which opened in 2010 and was retired in 2021.
	</p>
	<p>
		If you're interested in a little look back through memory lane, check my <a
			href="https://ashk.au/2022/01/30/brisbane-citycycle/">CityCycle history and eulogy</a
		> (off site).
	</p>
	<Ad />
</ArticlePage>
