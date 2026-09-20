<script lang="ts">
	interface Props {
		title: string;
	}

	let { title }: Props = $props();

	// Long titles wrap onto a second line and need the taller header treatment.
	let lengthClass = $derived(
		title.split(' ').length > 3 ? 'article-header--long' : 'article-header--short'
	);
</script>

<header class="article-header container type-serif {lengthClass}">
	<h1 itemprop="name">{title}</h1>
</header>
