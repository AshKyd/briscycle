<script lang="ts">
	import '$lib/styles/all.css';
	import CrackdownBanner from '$lib/components/CrackdownBanner/CrackdownBanner.svelte';
	import SiteHeader from '$lib/components/SiteHeader/SiteHeader.svelte';
	import { enhanceContent } from '$lib/client/enhance';
	import { page } from '$app/state';
	import { VERSION } from '@sveltejs/kit';

	let { children } = $props();

	let bodyClass = $derived(page.data.page?.classNames ?? '');

	/**
	 * Keep the body class in sync on client-side navigation. It is stamped into the shell
	 * server-side for the first paint, but `<body>` lives outside the app root so nothing
	 * else updates it afterwards, and `_header.css` keys the transparent header off it.
	 */
	$effect(() => {
		document.body.className = bodyClass;
	});

	/** Re-run the content enhancements whenever the rendered page changes. */
	$effect(() => {
		void page.url.pathname;
		return enhanceContent(document);
	});
</script>

<svelte:head>
	<meta name="generator" content="SvelteKit {VERSION}" />
</svelte:head>

<CrackdownBanner />
<SiteHeader currentUrl={page.url.pathname} hasNavTarget={Boolean(page.data.page?.relatedCollection)} />

{@render children()}
