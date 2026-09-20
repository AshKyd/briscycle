import { derivativesOf, getImage, largest, srcset } from './images.ts';
import type { CardSummary, CardThumb, ContentFile, Thumb } from '../../types.ts';


/** Widths the card grid requests, matching the legacy thumbnail `sizes` breakpoints. */
const THUMB_SIZES =
	'(width <= 480px) 100vw,(width <= 768px) 50vw,(width <= 1366px) 33vw, 25vw';

/**
 * Resolve a front matter `thumb` into markup inputs.
 *
 * Two pipelines survive from the legacy site: `image` names a pair of committed
 * `-desktop` / `-mobile` assets, while `source` names an original photo whose responsive
 * derivatives come from `npm run images`.
 */
function resolveThumb(thumb: Thumb, directory: string): CardThumb {
	if (thumb.type === 'paired') {
		return {
			sources: [
				{ srcset: `${thumb.image}-mobile.${thumb.format}`, media: '(max-width: 1024px)' }
			],
			src: `${thumb.image}-desktop.${thumb.format}`
		};
	}

	const entry = getImage(thumb.source, directory);
	const fallback = largest(derivativesOf(entry, 'jpeg'));

	return {
		sources: [
			{
				srcset: srcset(derivativesOf(entry, 'webp')),
				type: 'image/webp',
				sizes: THUMB_SIZES
			}
		],
		src: fallback.url,
		width: fallback.width,
		height: fallback.height
	};
}

/** Reduce a parsed page to the subset a card needs. */
export function toCardSummary({ url, directory, frontmatter }: ContentFile): CardSummary {
	const { title, description, icon, thumb } = frontmatter;
	return {
		url,
		title,
		description,
		icon,
		thumb: thumb ? resolveThumb(thumb, directory) : undefined,
		attribution: thumb?.attribution
	};
}
