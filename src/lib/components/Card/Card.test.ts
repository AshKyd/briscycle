import { describe, expect, it } from 'vitest';
import { render } from '@testing-library/svelte';
import Card from './Card.svelte';
import type { PageMeta } from '$lib/types';

const base: PageMeta = { url: '/brisbane-city/riverwalk/', title: 'The Riverwalk', tags: [] };

describe('Card', () => {
	it('links to the page', () => {
		const { container } = render(Card, { card: base });
		expect(container.querySelector('a')?.getAttribute('href')).toBe(base.url);
	});

	it('renders a responsive thumbnail when one exists', () => {
		const { container } = render(Card, {
			card: {
				...base,
				thumb: {
					img: { src: '/a/thumb.jpg', w: 480, h: 270 },
					sources: { webp: '/a/thumb.webp 480w' }
				}
			}
		});

		expect(container.querySelector('source')?.getAttribute('type')).toBe('image/webp');
		expect(container.querySelector('.card__thumbnail-image')?.getAttribute('src')).toBe(
			'/a/thumb.jpg'
		);
	});

	it('omits the thumbnail markup when a page has none', () => {
		const { container } = render(Card, { card: base });
		expect(container.querySelector('picture')).toBeNull();
	});
});
