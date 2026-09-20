<script lang="ts">
	import { largestSrc } from '$lib/content/srcset';
	import { zoom } from '$lib/client/zoom.svelte';
	import type { Picture } from 'vite-imagetools';

	interface Props {
		src: Picture;
		alt: string;
		/** Floats the image beside the text, where it occupies half the column. */
		align?: 'left' | 'right';
		caption?: string;
	}

	let { src, alt, align, caption }: Props = $props();

	// An aligned image only occupies half the column, so it advertises a narrower slot.
	let sizes = $derived(align ? '50vw' : '100vw');
	let alignClass = $derived(align ? `align${align}` : undefined);
	// Zoom opens the full-size image rather than the thumbnail the browser picked for this slot.
	let zoomSrc = $derived(largestSrc(src.sources.webp) ?? src.img.src);
</script>

{#if caption}
	<figure class={alignClass}>
		<enhanced:img
			{src}
			{alt}
			{sizes}
			loading="lazy"
			decoding="async"
			data-zoom-src={zoomSrc}
			use:zoom
		/>
		<figcaption>{caption}</figcaption>
	</figure>
{:else}
	<enhanced:img
		{src}
		{alt}
		{sizes}
		class={alignClass}
		loading="lazy"
		decoding="async"
		data-zoom-src={zoomSrc}
		use:zoom
	/>
{/if}
