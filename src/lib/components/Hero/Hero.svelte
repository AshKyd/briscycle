<script lang="ts">
	import Attribution from '$lib/components/Attribution/Attribution.svelte';
	import type { HeroModel } from '$lib/types';

	interface Props {
		hero: HeroModel;
	}

	let { hero }: Props = $props();
</script>

<div class="hero-default-image-container">
	<picture class="hero-default-image">
		{#each hero.sources as source, index (index)}
			<source
				srcset={source.srcset}
				type={source.type}
				media={source.media}
				sizes={source.sizes}
				width={source.width}
				height={source.height}
			/>
		{/each}
		<img
			class="hero-default-image__image"
			src={hero.src}
			alt={hero.alt}
			width={hero.width}
			height={hero.height}
			decoding="async"
		/>
	</picture>

	{#if hero.attribution}
		<Attribution attribution={hero.attribution} />
	{/if}
</div>
