<script lang="ts">
	import ArticlePage from '$lib/components/ArticlePage/ArticlePage.svelte';
	import { meta } from './meta.ts';
</script>

<ArticlePage {meta}>
	<p>Last Updated: <strong>20 September 2026</strong></p>
	<p>
		🌏 We are committed to making sure our websites and mobile applications have as little impact on
		the planet as possible.
	</p>
	<h2>Sustainability principles</h2>
	<ul>
		<li>
			This server is hosted with 100% renewable energy, as best the grid in Southeast Queensland can
			provide.
		</li>
		<li>Providers &amp; technologies are chosen based sustainability first.</li>
		<li>Development is done with 100% renewable energy on premise</li>
		<li>
			Static site generation with <a href="https://svelte.dev/">Svelte</a> means this site uses shared
			server resources and requires almost no cloud compute to maintain. This reduces energy consumption
			in the short term and results in less ewaste in the long term
		</li>
		<li>
			Efforts are made to optimise &amp; make the site faster for you. We aim to conserve bandwidth
			and reduce the time and energy required to download this site. We also aim to minimise
			client-side scripting to save your battery.
		</li>
	</ul>
	<h2>Third party services</h2>
	<ul>
		<li>
			Code hosting on Github has been <a
				href="https://github.blog/2021-04-22-environmental-sustainability-github/"
				>carbon neutral since 2019 and aims to be 100% renewable by 2025</a
			>
		</li>
		<li>
			Google Adsense provides ads for this site, but does not have an official sustainability
			policy. A portion of the advertising proceeds is donated to <a
				href="https://www.rainforestrescue.org.au/">Rainforest Rescue</a
			> to preserve and reforest the Daintree in North Queensland.
		</li>
	</ul>
</ArticlePage>
