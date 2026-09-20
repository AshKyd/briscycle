import { describe, expect, it } from 'vitest';
import { interpolate } from './interpolate.ts';

describe('interpolate', () => {
	it('expands site tokens', () => {
		expect(interpolate('Welcome to {{site.title}}.', {})).toBe(
			'Welcome to Briscycle - Brisbane Cycling.'
		);
	});

	it('formats the page date readably', () => {
		expect(interpolate('{{page.date}}', { date: '2023-03-13T00:00:00.000Z' })).toBe(
			'13 March 2023'
		);
	});

	it('expands the governing law from page front matter', () => {
		expect(interpolate('{{governingLaw}}', { governingLaw: 'Brisbane, Australia' })).toBe(
			'Brisbane, Australia'
		);
	});

	// A silently-blank legal document is worse than a failed build.
	it('throws on an unknown token', () => {
		expect(() => interpolate('{{data.title}}', {})).toThrow('Unknown template token');
	});
});
