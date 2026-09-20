<script lang="ts">
	import CardGrid from '$lib/components/CardGrid/CardGrid.svelte';
	import Seo from '$lib/components/Seo/Seo.svelte';
	import SiteFooter from '$lib/components/SiteFooter/SiteFooter.svelte';
	import { site } from '$lib/site';
	import { meta } from './meta.ts';

	/** The hero's own heading stands in for the article header every other page renders. */
	const scrollToContent = () =>
		document.querySelector('#content')?.scrollIntoView({ behavior: 'smooth' });
</script>

<Seo {meta} />

<div class="home-hero">
	<div class="container">
		<div class="home-hero__text-container">
			<h1 class="home-hero__line1 type-serif">Cycling<br /> in Brisbane</h1>
			<p class="home-hero__line2">
				Visiting Brisbane, or just looking for a day trip on the bike? Briscycle is your #1 resource
				for maps, bike paths and riding around Brisbane by bike.
			</p>
			<button class="btn btn-primary" onclick={scrollToContent}>Find out more</button>
		</div>
	</div>
</div>
<a id="content" aria-hidden="true"></a>

<CardGrid collection="home" />
<SiteFooter editUrl="{site.editBase}/+page.svelte" />

<style>
	/*
		The page is full-bleed over a photographic hero, so it sets the page background itself.
		`inlineStyleThreshold` puts this in the prerendered head, so the first paint is already
		correct and nothing has to run on the client to fix it up.
	*/
	:global(body) {
		background: var(--body-bg-blue);
		color: var(--body-fg);
	}

	.home-hero {
		min-height: 57vh;
		width: 100%;
		position: relative;
		overflow: hidden;
		display: flex;
		align-items: flex-end;
		background: #075697 url('/images/homepage/desktop-1366.webp') no-repeat center;
		background-size: cover;
	}
	.home-hero .container {
		display: flex;
		align-items: center;
		justify-content: flex-end;
	}
	.home-hero__text-container {
		color: var(--card-fg);
		padding: 30px;
		border-radius: 10px;
		width: 50%;
		background: var(--card-bg);
		margin-bottom: 50px;
	}
	.home-hero__line1 {
		font-weight: bold;
		text-align: left;
		font-size: 2em;
		margin: 0;
		line-height: 1;
	}

	@media (min-width: 1367px) {
		.home-hero {
			background-image: url('/images/homepage/desktop-1920.webp');
		}
	}
	@media (min-width: 1921px) {
		.home-hero {
			background-image: url('/images/homepage/desktop-3840.webp');
		}
	}
	@media (max-width: 767px) {
		.home-hero {
			background-image: url('/images/homepage/mobile-1440.webp');
		}
		.home-hero__text-container {
			width: 70%;
		}
	}
	@media (max-width: 415px) {
		.home-hero {
			background-image: url('/images/homepage/mobile-750.webp');
		}
		.home-hero__line1 {
			font-size: 1.5em;
		}
		.home-hero__text-container {
			width: 80%;
			font-size: 0.8em;
		}
	}
</style>
