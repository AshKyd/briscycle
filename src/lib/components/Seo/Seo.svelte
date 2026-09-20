<script lang="ts">
	import { site } from '$lib/site';
	import type { PageMeta } from '$lib/types';
	import type { Picture } from 'vite-imagetools';

	interface Props {
		meta: PageMeta;
		/**
		 * Image to unfurl with. Built assets are content-hashed, which is what we want here: the
		 * URL is baked into the same build that emits the file, so a changed image invalidates
		 * every scraper's cache for free.
		 */
		image?: Picture;
	}

	let { meta, image }: Props = $props();

	let description = $derived(meta.description ?? site.description);
	let canonical = $derived(`${site.origin}${meta.url}`);
</script>

<svelte:head>
	<title>{meta.title} - {site.title}</title>
	<meta name="description" content={description} />
	<link rel="canonical" href={canonical} />
	<meta property="og:site_name" content={site.title} />
	<meta property="og:type" content="article" />
	<meta property="og:title" content={meta.title} />
	<meta property="og:description" content={description} />
	<meta property="og:url" content={canonical} />
	{#if image}
		<meta property="og:image" content="{site.origin}{image.img.src}" />
		<meta property="og:image:width" content={String(image.img.w)} />
		<meta property="og:image:height" content={String(image.img.h)} />
	{/if}
	{#if meta.icbm}
		<meta name="ICBM" content={meta.icbm} />
	{/if}
</svelte:head>
