import { derivativesOf, getImage, largest, srcset } from '../images.ts';
import { parseArgs } from './parseArgs.ts';
import { escapeAttribute } from './youtube.ts';

/**
 * Render an inline `{% image %}` as a responsive `<picture>`, optionally wrapped in a
 * `<figure>` with a caption.
 *
 * An aligned image (one with a class such as `alignright`) only occupies half the column, so
 * it advertises `sizes="50vw"`; a full-width one advertises `100vw`.
 */
export function renderImage(body: string, pageDirectory: string): string {
	const [src, alt = '', className = '', caption = ''] = parseArgs(body);
	if (!src) throw new Error(`{% image %} with no source in ${pageDirectory}`);

	const entry = getImage(src, pageDirectory);
	const avif = derivativesOf(entry, 'avif');
	const fallback = largest(derivativesOf(entry, 'jpeg'));
	const sizes = className ? '50vw' : '100vw';

	const picture = `<picture><source type="image/avif" srcset="${srcset(avif)}" sizes="${sizes}"><img src="${fallback.url}" alt="${escapeAttribute(alt)}" width="${fallback.width}" height="${fallback.height}" sizes="${sizes}" loading="lazy" decoding="async" data-zoom-src="${largest(avif).url}"${className && !caption ? ` class="${className}"` : ''}></picture>`;

	if (!caption) return picture;
	return `<figure class="${className}">${picture}<figcaption>${caption}</figcaption></figure>`;
}
