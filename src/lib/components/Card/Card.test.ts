import { describe, expect, it } from 'vitest';
import { render } from '@testing-library/svelte';
import Card from './Card.svelte';

const base = { url: '/brisbane-city/riverwalk/', title: 'The Riverwalk' };

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
					sources: [{ srcset: '/i/a-480.min.webp 480w', type: 'image/webp' }],
					src: '/i/a-480.min.jpg',
					width: 480,
					height: 270
				}
			}
		});
		expect(container.querySelector('source')?.getAttribute('type')).toBe('image/webp');
		expect(container.querySelector('.card__thumbnail-image')?.getAttribute('src')).toBe(
			'/i/a-480.min.jpg'
		);
	});

	it('omits the thumbnail markup when a page has none', () => {
		const { container } = render(Card, { card: base });
		expect(container.querySelector('picture')).toBeNull();
	});
});
