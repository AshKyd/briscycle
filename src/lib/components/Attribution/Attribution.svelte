<script lang="ts">
	import type { Attribution } from '$lib/types';

	interface Props {
		attribution: Attribution;
	}

	let { attribution }: Props = $props();

	let credit = $derived(
		`'${attribution.title}' by ${attribution.name} is licensed under a Creative Commons license`
	);
</script>

<a href={attribution.url} title="{credit} {attribution.license}">
	<img alt={credit} src="/images/cc-by.svg" class="card__thumbnail-attribution" />
</a>
