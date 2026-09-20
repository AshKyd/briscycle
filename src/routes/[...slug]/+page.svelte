<script lang="ts">
	import Ad from '$lib/components/Ad/Ad.svelte';
	import ArticleHeader from '$lib/components/ArticleHeader/ArticleHeader.svelte';
	import CardGrid from '$lib/components/CardGrid/CardGrid.svelte';
	import Hero from '$lib/components/Hero/Hero.svelte';
	import InfoBox from '$lib/components/InfoBox/InfoBox.svelte';
	import Map from '$lib/components/Map/Map.svelte';
	import MapSection from '$lib/components/MapSection/MapSection.svelte';
	import SiteFooter from '$lib/components/SiteFooter/SiteFooter.svelte';
	import { site } from '$lib/site';
	import type { PageProps } from './$types.js';

	let { data }: PageProps = $props();
	let page = $derived(data.page);
</script>

<svelte:head>
	<title>{page.title} - {site.title}</title>
	<meta name="description" content={page.description} />
	<meta property="og:site_name" content={site.title} />
	<meta property="og:title" content={page.title} />
	<meta property="og:description" content={page.description} />
	<meta property="og:url" content="{site.origin}{page.url}" />
	{#if page.icbm}
		<meta name="ICBM" content={page.icbm} />
	{/if}
</svelte:head>

<!--
	The body of the article, with a house/AdSense slot wherever the markdown had an `{% ad %}`.
	The segments are pre-rendered HTML strings, so the ads have to be interleaved here rather
	than embedded in the markup — a component cannot be mounted inside an `{@html}` block.
-->
{#snippet articleBody()}
	{#each page.htmlSegments as segment, index (index)}
		{#if index > 0}
			<Ad />
		{/if}
		{@html segment}
	{/each}
{/snippet}

<!-- A full-page map: no heading, container or footer, so the map fills the viewport. -->
{#if page.layout === 'bigmap'}
	{#if page.map}
		<Map
			geojsonUrl={page.map.geojsonUrl}
			centre={page.map.centre}
			zoom={page.map.zoom}
			height={page.map.height}
			bigMap={page.map.bigMap}
			colour={page.map.colour}
			googleMaps={page.map.googleMaps}
		/>
	{/if}
{:else if page.layout === 'custom'}
	{@render articleBody()}
	{#if page.relatedCollection}
		<CardGrid collection={page.relatedCollection} />
	{/if}
	<SiteFooter editUrl={page.editUrl} country={page.country} />
{:else}
	{#if page.hero}
		<Hero hero={page.hero} />
	{/if}

	<article class="article article-type-{page.layout}" itemscope itemprop="blogPost">
		<div class="article-content">
			<div class="article-inner">
				{#if page.showHeader}
					<ArticleHeader title={page.title} />
				{/if}
				<div class="article-entry container" itemprop="articleBody">
					<InfoBox facets={page.facets} openDate={page.openDate} />
					{@render articleBody()}
				</div>
			</div>
		</div>
	</article>

	{#if page.map}
		<MapSection config={page.map} />
	{/if}
	{#if page.relatedCollection}
		<CardGrid collection={page.relatedCollection} />
	{/if}
	<SiteFooter editUrl={page.editUrl} country={page.country} />
{/if}
