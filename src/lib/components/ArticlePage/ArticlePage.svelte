<script lang="ts">
	import ArticleHeader from '$lib/components/ArticleHeader/ArticleHeader.svelte';
	import CardGrid from '$lib/components/CardGrid/CardGrid.svelte';
	import Hero from '$lib/components/Hero/Hero.svelte';
	import InfoBox from '$lib/components/InfoBox/InfoBox.svelte';
	import MapSection from '$lib/components/MapSection/MapSection.svelte';
	import Seo from '$lib/components/Seo/Seo.svelte';
	import SiteFooter from '$lib/components/SiteFooter/SiteFooter.svelte';
	import { facetsFor } from '$lib/facets';
	import { site } from '$lib/site';
	import type { HeroImage, MapConfig, PageMeta } from '$lib/types';
	import type { Snippet } from 'svelte';

	interface Props {
		meta: PageMeta;
		hero?: HeroImage;
		/** Omit `title` to get the default "Map of <page title>" heading. */
		map?: Omit<MapConfig, 'title' | 'bigMap'> & { title?: string; bigMap?: boolean };
		/** Shows the `<h1>`. The home page draws its own title into the hero instead. */
		showHeader?: boolean;
		/** When set, the route is not open yet and gets an "under construction" badge. */
		openDate?: string;
		children: Snippet;
	}

	let { meta, hero, map, showHeader = true, openDate, children }: Props = $props();

	let facets = $derived(facetsFor(meta.tags));
	let mapConfig = $derived(
		map && { bigMap: false, ...map, title: map.title ?? `Map of ${meta.title}` }
	);
	// The hero is the better unfurl image; the card thumbnail is the fallback.
	let ogImage = $derived(hero?.desktop ?? meta.thumb);
	let editUrl = $derived(`${site.editBase}${meta.url}+page.svelte`);
</script>

<Seo {meta} image={ogImage} />

{#if hero}
	<Hero {hero} />
{/if}

<article class="article article-type-page" itemscope itemprop="blogPost">
	<div class="article-content">
		<div class="article-inner">
			{#if showHeader}
				<ArticleHeader title={meta.title} />
			{/if}
			<div class="article-entry container" itemprop="articleBody">
				<InfoBox {facets} {openDate} />
				{@render children()}
			</div>
		</div>
	</div>
</article>

{#if mapConfig}
	<MapSection config={mapConfig} />
{/if}
{#if meta.related}
	<CardGrid collection={meta.related} />
{/if}
<SiteFooter {editUrl} country={meta.country} />
