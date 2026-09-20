<script lang="ts">
	import Card from '$lib/components/Card/Card.svelte';
	import { collections } from '$lib/content/manifest';

	interface Props {
		/** Name of the collection to show, from the page's `related`. */
		collection: string;
	}

	let { collection }: Props = $props();

	// Compile-time constant, so this is one shared chunk rather than a payload on every page.
	let cards = $derived(collections[collection] ?? []);
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
