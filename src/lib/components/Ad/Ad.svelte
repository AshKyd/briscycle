<script lang="ts">
	import { fireEvent } from '$lib/client/events';
	import { read, write } from '$lib/client/storage';
	import { isBlocked, watchForLateBlocking } from './adblock.ts';
	import { nextHouseAd, type HouseAd } from './houseAds.ts';

	interface Props {
		/** Render the AdSense loader tag. Set on the first slot of a page only. */
		loadsScript?: boolean;
	}

	let { loadsScript = false }: Props = $props();

	/** Set once the slot has been measured and found to be blocked. */
	let fallback = $state<HouseAd | undefined>();
	let slot = $state<HTMLElement>();

	/**
	 * Ask AdSense to fill the slot, then check whether anything actually arrived. When nothing
	 * does, the space is given to a house ad rather than left as a gap in the article.
	 */
	$effect(() => {
		if (!slot) return;
		const element = slot;

		try {
			const adsbygoogle = ((window as { adsbygoogle?: unknown[] }).adsbygoogle ??= []);
			adsbygoogle.push({});
		} catch {
			// AdSense is absent (blocked, or offline); the detection below handles it.
		}

		const showFallback = () => {
			fallback ??= nextHouseAd(read, write);
		};

		isBlocked(element).then((blocked) => blocked && showFallback());
		return watchForLateBlocking(element, showFallback);
	});
</script>

<!--
	The AdSense loader lives here rather than in app.html so pages without an ad slot never pay
	for the request. Svelte does not deduplicate head content, so the page marks a single slot
	as the one that loads it.
-->
<svelte:head>
	{#if loadsScript}
		<script
			async
			src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-0801621623358731"
			crossorigin="anonymous"
		></script>
	{/if}
</svelte:head>

<div class="eleventyad">
	<aside bind:this={slot} style="min-height: 200px">
		{#if fallback}
			<a
				href={fallback.link}
				target="_blank"
				rel="noopener"
				class="eleventyad-fallback"
				style={fallback.style}
				onclick={() => fireEvent(`fallback-ads__${fallback?.id}`)}
			>
				<div class="eleventyad-fallback__left">
					<h3>{fallback.title}</h3>
					<p>{fallback.description}</p>
				</div>
				<div class="eleventyad-fallback__right">
					<div class="eleventyad-fallback__button">{fallback.cta}</div>
				</div>
			</a>
		{:else}
			<ins
				class="adsbygoogle"
				style="display:block; text-align:center;"
				data-ad-layout="in-article"
				data-ad-format="fluid"
				data-ad-client="ca-pub-0801621623358731"
				data-ad-slot="5298906050"
			></ins>
		{/if}
	</aside>
</div>
