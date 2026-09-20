import path from 'node:path';
import { describe, expect, it } from 'vitest';
import { contentTypeFor } from './content-assets.ts';

describe('contentTypeFor', () => {
	// An <img> silently refuses to render an SVG served without this type, which is how the
	// card icons disappeared in development while the AVIF heroes kept working.
	it('serves SVG as image/svg+xml', () => {
		expect(contentTypeFor('bicycle-regulation/police.svg')).toBe('image/svg+xml');
	});

	it.each([
		['hero.avif', 'image/avif'],
		['thumb-desktop.webp', 'image/webp'],
		['hero.jpg', 'image/jpeg'],
		['riverloop.geo.json', 'application/json']
	])('serves %s correctly', (file, type) => expect(contentTypeFor(file)).toBe(type));

	it('is case insensitive', () => {
		expect(contentTypeFor(path.join('a', 'B.SVG'))).toBe('image/svg+xml');
	});

	it('returns nothing for an unknown extension', () => {
		expect(contentTypeFor('a/b.wikitext')).toBeUndefined();
	});
});
