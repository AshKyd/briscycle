import MarkdownIt from 'markdown-it';
import { renderImage } from './shortcodes/image.ts';
import { renderYoutube } from './shortcodes/youtube.ts';
import { interpolate } from './shortcodes/interpolate.ts';
import type { ContentFile } from '../../types.ts';

/**
 * Matches Eleventy's default markdown-it configuration, which the content was written
 * against. In particular `breaks` stays off — several pages wrap prose across source lines
 * and would otherwise gain spurious `<br>`s — and `html` stays on, because 28 of the 47 pages
 * contain hand-written HTML.
 */
const markdown = new MarkdownIt({
	html: true,
	breaks: false,
	linkify: false,
	typographer: false
});

/**
 * Where an `{% ad %}` stood. Left in the HTML as a comment so that the rendered string can be
 * split on it afterwards, letting the page interleave real `<Ad />` components between the
 * segments — a component cannot be mounted inside an `{@html}` block.
 */
const AD_MARKER = '<!--briscycle:ad-->';

const SHORTCODE = /\{%\s*(ad|image|youtube)\s*([\s\S]*?)%\}/g;

/** Expand the three Eleventy shortcodes still used in page bodies. */
function expandShortcodes(body: string, pageDirectory: string): string {
	return body.replace(SHORTCODE, (_match, name: string, args: string) => {
		if (name === 'ad') return AD_MARKER;
		if (name === 'youtube') return renderYoutube(args);
		return renderImage(args, pageDirectory);
	});
}

/**
 * Render one page body to HTML, split at its ad slots.
 *
 * Runs at prerender time only — this module is reachable only from `+page.server.ts`, which
 * keeps markdown-it and the markdown sources out of the client bundle.
 */
export function renderBody({ body, directory, frontmatter }: ContentFile): string[] {
	const { governingLaw, date } = frontmatter;
	const interpolated = interpolate(body, { governingLaw, date });
	const expanded = expandShortcodes(interpolated, directory);

	return markdown.render(expanded).split(AD_MARKER);
}
