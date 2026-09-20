import { describe, expect, it } from 'vitest';
import { render } from '@testing-library/svelte';
import Hero from './Hero.svelte';

describe('Hero', () => {
	// The hand-written `variations` heroes used to emit an <img> with no src at all.
	it('always gives the fallback image a src', () => {
		const { container } = render(Hero, {
			hero: {
				sources: [{ srcset: '/a/hero-desktop.webp', media: '(orientation: landscape)' }],
				src: '/a/hero-desktop.webp',
				alt: 'A boardwalk'
			}
		});
		expect(container.querySelector('img')?.getAttribute('src')).toBe('/a/hero-desktop.webp');
	});

	it('renders one source per variation', () => {
		const { container } = render(Hero, {
			hero: {
				sources: [
					{ srcset: '/a/d.webp', media: '(orientation: landscape)' },
					{ srcset: '/a/m.webp', media: '(max-width: 414px)' }
				],
				src: '/a/d.webp',
				alt: 'A bridge'
			}
		});
		expect(container.querySelectorAll('source')).toHaveLength(2);
	});

	it('credits the photographer when an attribution exists', () => {
		const { container } = render(Hero, {
			hero: {
				sources: [],
				src: '/a/hero.jpg',
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
