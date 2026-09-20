<script lang="ts">
	import Attribution from '$lib/components/Attribution/Attribution.svelte';
	import type { PageMeta } from '$lib/types';

	interface Props {
		card: PageMeta;
	}

	let { card }: Props = $props();

	/** Matches the card grid's breakpoints: four across on desktop, one across on a phone. */
	const SIZES = '(width <= 480px) 100vw,(width <= 768px) 50vw,(width <= 1366px) 33vw, 25vw';
</script>

<li class="card">
	<a class="card__link" href={card.url} data-umami-event="card-link">
		<div class="card__thumbnail">
			{#if card.icon}
				<img class="card__icon" src={card.icon} alt="" role="presentation" />
			{/if}
			{#if card.thumb}
				<enhanced:img
					class="card__thumbnail-image"
					src={card.thumb}
					alt=""
					sizes={SIZES}
					role="presentation"
					loading="lazy"
					decoding="async"
				/>
			{/if}
		</div>
		<div class="card__content">
			<div class="card__title h2">{card.title}</div>
			<p>{card.description ?? ''}</p>
		</div>
	</a>
	{#if card.thumbAttribution}
		<Attribution attribution={card.thumbAttribution} />
	{/if}
</li>
