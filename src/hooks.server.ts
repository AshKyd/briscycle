import type { Handle } from '@sveltejs/kit';

/**
 * Stamp the per-page body class into the shell.
 *
 * The legacy site put front matter `classNames` on `<body>`, and `_header.css` still keys the
 * transparent overlay header off `body.hero-menu`, so the class has to land on the real body
 * element rather than a wrapper.
 */
export const handle: Handle = async ({ event, resolve }) =>
	resolve(event, {
		transformPageChunk: ({ html }) =>
			html.replace('%briscycle.bodyClass%', event.locals.bodyClass ?? '')
	});
