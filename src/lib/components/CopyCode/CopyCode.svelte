<script lang="ts">
	interface Props {
		/** The promo code, shown to the reader and copied to the clipboard. */
		code: string;
		label?: string;
	}

	let { code, label = 'Copy code' }: Props = $props();

	let clicked = $state(false);

	const copy = async () => {
		await navigator.clipboard.writeText(code).catch(() => undefined);
		clicked = true;
	};
</script>

<aside class="copy-code">
	<code class="copy-code__text">{code}</code>
	<button type="button" class={['copy-code__button', clicked && 'clicked']} onclick={copy}>
		{label}
	</button>
</aside>
