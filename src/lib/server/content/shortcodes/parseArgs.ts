const QUOTED = /"((?:[^"\\]|\\.)*)"/g;

/**
 * Pull the quoted arguments out of a shortcode body, positionally.
 *
 * Commas are ignored entirely, which is deliberate: several `{% image %}` calls in the content
 * are missing the comma before their caption, and eight append a stray fifth `"alignright"`
 * token. Reading quoted strings positionally parses all of them the way the author meant,
 * where a comma-aware parser would choke or silently mangle the caption.
 */
export const parseArgs = (body: string): string[] =>
	[...body.matchAll(QUOTED)].map(([, value]) => value.replace(/\\(.)/g, '$1'));
