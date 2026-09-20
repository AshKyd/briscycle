<script lang="ts">
	interface Props {
		/** The pasted watch URL. Playlist and start time are carried through to the embed. */
		url: string;
		title?: string;
	}

	let { url, title = 'YouTube video player' }: Props = $props();

	let embedUrl = $derived.by(() => {
		const { searchParams } = new URL(url);
		const id = searchParams.get('v');
		const start = (searchParams.get('t') ?? '0s').replace('s', '');
		const list = searchParams.get('list') ?? '';
		const index = searchParams.get('index') ?? 0;
		const playlist = list ? `&list=${list}&index=${index}&loop=1` : '';

		return `https://www.youtube.com/embed/${id}?rel=0&widget_referrer=briscycle.com&start=${start}${playlist}`;
	});
</script>

<div class="video">
	<iframe
		loading="lazy"
		width="560"
		height="315"
		src={embedUrl}
		{title}
		frameborder="0"
		allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
		allowfullscreen
	></iframe>
</div>
