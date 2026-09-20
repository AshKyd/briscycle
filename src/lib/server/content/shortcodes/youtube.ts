import { parseArgs } from './parseArgs.ts';

/**
 * Render a YouTube embed, preserving the legacy behaviour of carrying a playlist and a start
 * time through from the pasted watch URL.
 */
export function renderYoutube(body: string): string {
	const [src, title = 'YouTube video player'] = parseArgs(body);
	const url = new URL(src);

	const id = url.searchParams.get('v');
	const start = (url.searchParams.get('t') ?? '0s').replace('s', '');
	const list = url.searchParams.get('list') ?? '';
	const index = url.searchParams.get('index') ?? 0;
	const playlist = list ? `&list=${list}&index=${index}&loop=1` : '';

	const iframeUrl = `https://www.youtube.com/embed/${id}?rel=0&widget_referrer=briscycle.com&start=${start}${playlist}`;

	return `<div class="video">
    <iframe loading="lazy" width="560" height="315" src="${iframeUrl}" title="${escapeAttribute(title)}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
    </div>`;
}

/** Escape a string for use inside a double-quoted HTML attribute. */
export const escapeAttribute = (value: string): string =>
	value.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;');
