<script lang="ts">
	import Card from '$lib/components/Card/Card.svelte';
	import { page } from '$app/state';

	interface Props {
		/** Name of the collection to show, from front matter `related`. */
		collection: string;
	}

	let { collection }: Props = $props();

	let cards = $derived(page.data.siteData?.cards?.[collection] ?? []);
</script>

{#if cards.length > 0}
	<div id="nav" class="wide-container">
		<ul class="cards">
			{#each cards as card (card.url)}
				<Card {card} />
			{/each}
		</ul>
	</div>
{/if}
