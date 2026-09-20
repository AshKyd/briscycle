import { describe, expect, it } from 'vitest';
import { render } from '@testing-library/svelte';
import Hero from './Hero.svelte';
import type { Picture } from 'vite-imagetools';

const picture = (name: string, formats = ['avif', 'webp', 'jpeg']): Picture => ({
	img: { src: `/a/${name}.jpg`, w: 1920, h: 1080 },
	sources: Object.fromEntries(formats.map((format) => [format, `/a/${name}.${format} 1920w`]))
});

describe('Hero', () => {
	it('falls back to the desktop crop, at its intrinsic size', () => {
		const { container } = render(Hero, {
			hero: { desktop: picture('desktop'), mobile: picture('mobile'), alt: 'A boardwalk' }
		});

		const img = container.querySelector('img');
		expect(img?.getAttribute('src')).toBe('/a/desktop.jpg');
		expect(img?.getAttribute('width')).toBe('1920');
		expect(img?.getAttribute('height')).toBe('1080');
	});

	/**
	 * A browser takes the first `<source>` matching both `type` and `media`, so the portrait and
	 * landscape crops have to be paired per format rather than grouped by orientation.
	 */
	it('pairs each format portrait-first so art direction wins over format order', () => {
		const { container } = render(Hero, {
			hero: { desktop: picture('desktop'), mobile: picture('mobile'), alt: 'A bridge' }
		});

		const sources = [...container.querySelectorAll('source')].map((source) => [
			source.getAttribute('type'),
			source.getAttribute('media')
		]);

		expect(sources).toEqual([
			['image/avif', '(orientation: portrait)'],
			['image/avif', '(orientation: landscape)'],
			['image/webp', '(orientation: portrait)'],
			['image/webp', '(orientation: landscape)'],
			['image/jpeg', '(orientation: portrait)'],
			['image/jpeg', '(orientation: landscape)']
		]);
	});

	/** An image with an alpha channel falls back to png, one without to jpg. */
	it('skips a landscape source the desktop crop has no format for', () => {
		const { container } = render(Hero, {
			hero: {
				desktop: picture('desktop', ['webp']),
				mobile: picture('mobile', ['webp', 'png']),
				alt: 'A path'
			}
		});

		const media = [...container.querySelectorAll('source')].map((s) => s.getAttribute('type'));
		expect(media).toEqual(['image/webp', 'image/webp', 'image/png']);
	});

	it('credits the photographer when an attribution exists', () => {
		const { container } = render(Hero, {
			hero: {
				desktop: picture('desktop'),
				mobile: picture('mobile'),
				alt: 'Police on bikes',
				attribution: {
					name: 'Tony Hisgett',
					title: 'Police Bikes 2',
					url: 'https://www.flickr.com/photos/hisgett/30738809600/',
					license: 'https://creativecommons.org/licenses/by/2.0/'
				}
			}
		});
		expect(container.querySelector('.card__thumbnail-attribution')).toBeTruthy();
	});
});
