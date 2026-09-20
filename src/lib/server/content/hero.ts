import { derivativesOf, getImage, largest, srcset } from './images.ts';
import { resolveAgainstPage } from './paths.ts';
import type { Hero, HeroModel, SourceDescriptor } from '../../types.ts';


/** Dimensions the legacy paired heroes were cropped to. */
const PAIRED_DESKTOP = { width: 3353, height: 897 };
const PAIRED_MOBILE = { width: 828, height: 222 };

/**
 * Resolve any of the three hero shapes into one model the `Hero` component can render.
 *
 * Two markup fixes are applied along the way. The AVIF `<source>` elements gain the
 * `type="image/avif"` the originals omitted, and the `<img>` always gets a real `src` —
 * the hand-written `variations` heroes previously emitted a bare `<img>` with no `src` at
 * all, which renders nothing if no `<source>` happens to match.
 */
export function resolveHero(hero: Hero, pageUrl: string, directory: string): HeroModel {
	const { alt, attribution } = hero;

	if (hero.type === 'variations') {
		const sources = hero.sources.map((source) => ({
			...source,
			srcset: resolveAgainstPage(source.srcset, pageUrl)
		}));
		const [primary] = sources;
		return { sources, src: primary.srcset, alt, ...dimensionsOf(primary), attribution };
	}

	if (hero.type === 'defaultImage') {
		return {
			sources: [
				{
					srcset: `${hero.image}-mobile.${hero.format}`,
					media: '(max-width: 767px)',
					...PAIRED_MOBILE
				}
			],
			src: `${hero.image}-desktop.${hero.format}`,
			alt,
			...PAIRED_DESKTOP,
			attribution
		};
	}

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

const dimensionsOf = ({ width, height }: SourceDescriptor) => ({ width, height });
