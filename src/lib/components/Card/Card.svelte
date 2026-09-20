<script lang="ts">
	import Attribution from '$lib/components/Attribution/Attribution.svelte';
	import type { CardSummary } from '$lib/types';

	interface Props {
		card: CardSummary;
	}

	let { card }: Props = $props();
</script>

<li class="card">
	<a class="card__link" href={card.url} data-umami-event="card-link">
		<div class="card__thumbnail">
			{#if card.icon}
				<img class="card__icon" src={card.icon} alt="" role="presentation" />
			{/if}
			{#if card.thumb}
				<picture>
					{#each card.thumb.sources as source, index (index)}
						<source
							srcset={source.srcset}
							type={source.type}
							media={source.media}
							sizes={source.sizes}
						/>
					{/each}
					<img
						class="card__thumbnail-image"
						src={card.thumb.src}
						alt=""
						width={card.thumb.width}
						height={card.thumb.height}
						role="presentation"
						loading="lazy"
						decoding="async"
					/>
				</picture>
			{/if}
		</div>
		<div class="card__content">
			<div class="card__title h2">{card.title}</div>
			<p>{card.description ?? ''}</p>
		</div>
	</a>
	{#if card.attribution}
		<Attribution attribution={card.attribution} />
	{/if}
</li>
