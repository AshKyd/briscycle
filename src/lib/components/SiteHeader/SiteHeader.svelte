<script lang="ts">
	import siteData from 'virtual:briscycle/site';

	interface Props {
		/** URL of the page being viewed, used to mark the matching menu item active. */
		currentUrl: string;
	}

	let { currentUrl }: Props = $props();

	/** A section is active when the current page sits anywhere beneath it. */
	const isActive = (url: string) => currentUrl.startsWith(url);
</script>

<header class="header inverse-links">
	<div class="header__flex">
		<h1 class="header__main">
			<a href="/">
				<img class="header__logo" src="/images/header-logo.webp" alt="" role="presentation" />
				Briscycle
			</a>
		</h1>
		<ol class="header__menu">
			{#each siteData.menu as item (item.url)}
				<li
					class={[
						'header__item',
						'header__item--desktop',
						isActive(item.url) && 'header__item--active'
					]}
				>
					<a href={item.url} data-umami-event="header-menu">{item.shortName}</a>
				</li>
			{/each}
			<li class="header__item header__item--mobile">
				<a href="#nav" class="header__button btn" data-umami-event="header-mobile-nav">
					<svg viewBox="0 0 100 80" width="40" height="40" class="header__icon">
						<rect width="100" height="20"></rect>
						<rect y="30" width="100" height="20"></rect>
						<rect y="60" width="100" height="20"></rect>
					</svg>
					Menu
				</a>
			</li>
		</ol>
	</div>
</header>
