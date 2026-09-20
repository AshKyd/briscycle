import { derivativesOf, getImage, largest, srcset } from './images.ts';
import type { Hero, HeroModel } from '../../types.ts';

/**
 * Resolve a front matter `hero` into inputs the `Hero` component can render.
 */
export function resolveHero(hero: Hero, _pageUrl: string, directory: string): HeroModel {
	const { alt, attribution } = hero;

	const desktop = getImage(hero.desktop, directory);
	const mobile = getImage(hero.mobile, directory);
	const fallback = largest(derivativesOf(desktop, 'jpeg'));

	return {
		sources: [
			{
				srcset: srcset(derivativesOf(desktop, 'webp')),
				type: 'image/webp',
				media: '(orientation: landscape)'
			},
			{
				srcset: srcset(derivativesOf(mobile, 'webp')),
				type: 'image/webp',
				media: '(orientation: portrait)'
			}
		],
		src: fallback.url,
		alt,
		width: fallback.width,
		height: fallback.height,
		attribution
	};
}
