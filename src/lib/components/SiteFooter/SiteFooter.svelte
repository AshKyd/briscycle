<script lang="ts">
	import { footer } from '$lib/content/manifest';
	import { site } from '$lib/site';

	interface Props {
		/** GitHub URL for the current page's source. */
		editUrl?: string;
		/** Page-specific addition to the acknowledgement of Country. */
		country?: string;
	}

	let { editUrl, country }: Props = $props();

	const legalItems = footer.legal;

	const columns = [
		{ heading: 'The City', url: '/brisbane-city/', items: footer.brisbane },
		{ heading: 'Day Trips', url: '/day-trips/', items: footer['day-trips'] },
		{ heading: 'Moreton Bay', url: '/moreton-bay/', items: footer['moreton-bay'] },
		{ heading: 'The Law', url: '/bicycle-regulation/', items: footer.rules }
	];
</script>

<footer class="footer wide-container">
	<div class="footer__logo">
		<div class="footer-branding">
			<img
				class="footer-branding__logo"
				src="/images/header-logo.webp"
				alt=""
				role="presentation"
			/>
			<h2 class="footer-branding__text">Briscycle</h2>
		</div>
	</div>
	<div class="footer__a">
		<p class="footer__paragraph">
			Briscycle is a side project by <a href="https://ashk.au/">Ash</a>. Any advice provided is of a
			general nature only and does not take into account your personal needs, ability or changed
			conditions.
		</p>
		<p class="footer__paragraph">
			For feedback, corrections, or suggestions
			<a href="mailto:{site.supportEmail}">shoot me an email</a>.
			{#if editUrl}
				Or <a rel="nofollow" href={editUrl}>Edit this page on Github</a>.
			{/if}
		</p>
		<p class="footer__paragraph">
			The Jagera people and the Turrbal people are traditional custodians of the place we now call
			Brisbane. {country ?? ''} We pay respects their elders, past and present.
		</p>
	</div>
	<div class="footer__b">
		<ul class="nested-list">
			{#each columns as column (column.url)}
				<li>
					<h3 class="nested-list__heading"><a href={column.url}>{column.heading}</a></h3>
					<ul>
						{#each column.items as item (item.url)}
							<li><a href={item.url}>{item.shortName}</a></li>
						{/each}
					</ul>
				</li>
			{/each}
		</ul>
	</div>
	<div class="footer__c">
		Copyright &copy; {__BUILD_YEAR__} <a href="https://ashk.au/">Ash Kyd</a>.
	</div>
	<div class="footer__d">
		<ul class="inline-list footer__flexend">
			{#each legalItems as item (item.url)}
				<li><a href={item.url}>{item.shortName}</a></li>
			{/each}
			<li><a href="https://qr.kyd.au/">Make a QR Code</a></li>
		</ul>
	</div>
</footer>
