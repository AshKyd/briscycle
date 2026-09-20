<script lang="ts">
	import Attribution from '$lib/components/Attribution/Attribution.svelte';
	import type { HeroImage } from '$lib/types';

	interface Props {
		hero: HeroImage;
	}

	let { hero }: Props = $props();

	/**
	 * Art direction, which `<enhanced:img>` cannot express: almost every page pairs a landscape
	 * crop with a separately framed portrait one.
	 *
	 * A browser takes the first `<source>` matching both `type` and `media`, so the pair has to
	 * be emitted per format — portrait first — rather than all portrait sources then all
	 * landscape ones. The two crops can resolve to different fallback formats (an image with an
	 * alpha channel falls back to png, one without to jpg), so the landscape side is guarded.
	 */
	let formats = $derived(
		Object.entries(hero.mobile.sources).map(([format, portrait]) => ({
			format,
			portrait,
			landscape: hero.desktop.sources[format]
		}))
	);
</script>

<div class="hero-default-image-container">
	<picture class="hero-default-image">
		{#each formats as { format, portrait, landscape } (format)}
			<source
				srcset={portrait}
				type="image/{format}"
				media="(orientation: portrait)"
				sizes="100vw"
			/>
			{#if landscape}
				<source
					srcset={landscape}
					type="image/{format}"
					media="(orientation: landscape)"
					sizes="100vw"
				/>
			{/if}
		{/each}
		<!-- The intrinsic size is the desktop crop's, as it was before, so CLS is unchanged. -->
		<img
			class="hero-default-image__image"
			src={hero.desktop.img.src}
			alt={hero.alt}
			width={hero.desktop.img.w}
			height={hero.desktop.img.h}
			fetchpriority="high"
			decoding="async"
		/>
	</picture>

	{#if hero.attribution}
		<Attribution attribution={hero.attribution} />
	{/if}
</div>
