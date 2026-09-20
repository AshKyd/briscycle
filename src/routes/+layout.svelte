<script lang="ts">
	import '$lib/styles/all.css';
	import CrackdownBanner from '$lib/components/CrackdownBanner/CrackdownBanner.svelte';
	import SiteHeader from '$lib/components/SiteHeader/SiteHeader.svelte';
	import { flushEvents } from '$lib/client/events';
	import { afterNavigate } from '$app/navigation';
	import { page } from '$app/state';
	import { VERSION } from '@sveltejs/kit';

	let { children } = $props();

	// Zoom and copy buttons are wired per-component now, so the only thing left to do on
	// navigation is drain the analytics queue.
	afterNavigate(flushEvents);
</script>

<svelte:head>
	<meta name="generator" content="SvelteKit {VERSION}" />
</svelte:head>

<CrackdownBanner />
<SiteHeader currentUrl={page.url.pathname} />

<main id="main">
	{@render children()}
</main>
