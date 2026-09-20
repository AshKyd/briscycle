<script lang="ts">
	import InfoBoxItem from '$lib/components/InfoBoxItem/InfoBoxItem.svelte';
	import { OPEN_DATE_FACET } from '$lib/facets';
	import type { Facet } from '$lib/types';

	interface Props {
		/** Route attribute badges derived from the page's tags. */
		facets: Facet[];
		/** When set, the route is not open yet and gets an "under construction" badge. */
		openDate?: string;
	}

	let { facets, openDate }: Props = $props();
</script>

<!--
	Unlike the legacy template, the wrapper is omitted entirely when there is nothing to show.
	That template keyed off the presence of `tags`, so pages tagged only for collection
	membership emitted an empty `<aside>`.
-->
{#if facets.length > 0 || openDate}
	<aside class="infobox">
		{#if openDate}
			<InfoBoxItem {...OPEN_DATE_FACET}>
				This route should open sometime in {openDate}
			</InfoBoxItem>
		{/if}
		{#each facets as facet (facet.tag)}
			<InfoBoxItem
				colour={facet.colour}
				iconUrl={facet.iconUrl}
				title={facet.title}
				iconName={facet.iconName}
				contributor={facet.contributor}
			>
				{facet.body}
			</InfoBoxItem>
		{/each}
	</aside>
{/if}
