import { site } from '../../../site.ts';

const TOKEN = /\{\{\s*([\w.]+)\s*\}\}/g;

/** Long-form Australian date, e.g. `13 March 2023`. */
const formatDate = (iso: string): string =>
	new Date(iso).toLocaleDateString('en-AU', { day: 'numeric', month: 'long', year: 'numeric' });

/**
 * Expand the handful of `{{ }}` tokens used in the legal pages.
 *
 * A whitelist rather than a general expression evaluator: an unrecognised token throws, so a
 * typo in a legal document fails the build instead of silently rendering an empty string —
 * which is exactly what `{{data.title}}` did on the old privacy policy.
 */
export function interpolate(
	body: string,
	values: { governingLaw?: string; date?: string }
): string {
	const lookup: Record<string, string | undefined> = {
		'site.title': site.title,
		'site.supportEmail': site.supportEmail,
		'page.date': values.date && formatDate(values.date),
		governingLaw: values.governingLaw
	};

	return body.replace(TOKEN, (match, token: string) => {
		if (!(token in lookup)) throw new Error(`Unknown template token ${match}`);
		return lookup[token] ?? '';
	});
}
