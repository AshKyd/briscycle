<script lang="ts">
	import { site } from '$lib/site';
	import { page } from '$app/state';

	interface Props {
		/** GitHub URL for the current page's markdown source. */
		editUrl?: string;
		/** Page-specific addition to the acknowledgement of Country. */
		country?: string;
	}

	let { editUrl, country }: Props = $props();

	let siteData = $derived(page.data.siteData);
	let buildYear = $derived(siteData?.buildYear ?? new Date().getFullYear());
	let legalItems = $derived(siteData?.footer?.legal ?? []);

	let columns = $derived([
		{ heading: 'The City', url: '/brisbane-city/', items: siteData?.footer?.brisbane ?? [] },
		{ heading: 'Day Trips', url: '/day-trips/', items: siteData?.footer?.['day-trips'] ?? [] },
		{ heading: 'Moreton Bay', url: '/moreton-bay/', items: siteData?.footer?.['moreton-bay'] ?? [] },
		{ heading: 'The Law', url: '/bicycle-regulation/', items: siteData?.footer?.rules ?? [] }
	]);
</script>

<footer class="footer wide-container">
	<div class="footer__logo">
		<div class="footer-branding">
			<img class="footer-branding__logo" src="/images/header-logo.webp" alt="" role="presentation" />
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
		Copyright &copy; {buildYear} <a href="https://ashk.au/">Ash Kyd</a>.
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
