<script lang="ts">
	import ArticleHeader from '$lib/components/ArticleHeader/ArticleHeader.svelte';
	import SiteFooter from '$lib/components/SiteFooter/SiteFooter.svelte';
	import { site } from '$lib/site';
	import { page } from '$app/state';
</script>

<svelte:head>
	<title>That's no good - {site.title}</title>
	<meta name="robots" content="noindex" />
</svelte:head>

<article class="article article-type-page" itemscope itemprop="blogPost">
	<div class="article-content">
		<div class="article-inner">
			<ArticleHeader title="That's no good" />
			<div class="article-entry container" itemprop="articleBody">
				<div style="text-align:center">
					<img
						src="/images/broken-citycycle.webp"
						alt="An old docked bike hire bike with a warped and broken wheel"
						style="max-width:400px"
					/>
					<p>Whatever it was, it's gone. Sorry &#128542;</p>
					<p>
						{#if page.status !== 404}{page.error?.message ?? 'Something went wrong.'}{:else}For
							cycling guides around Brisbane, check the <a href="/">home page</a>.{/if}
					</p>
				</div>
			</div>
		</div>
	</div>
</article>

<SiteFooter />
