import { describe, expect, it } from 'vitest';
import { parseArgs } from './parseArgs.ts';

describe('parseArgs', () => {
	it('reads well-formed comma separated arguments', () => {
		expect(parseArgs('"./site/a.jpg", "Alt text", "alignright", "A caption"')).toEqual([
			'./site/a.jpg',
			'Alt text',
			'alignright',
			'A caption'
		]);
	});

	// Eight calls in the content append a stray fifth token after the caption.
	it('ignores a trailing token appended after the caption', () => {
		const body =
			'"./site/brisbane-city/breakfast-creek-bridge/PXL.jpg", "Joggers cross the bridge at sunset", "alignright", "The bridge is a popular link to the north side" "alignright"';
		const [, , className, caption] = parseArgs(body);
		expect(className).toBe('alignright');
		expect(caption).toBe('The bridge is a popular link to the north side');
	});

	// Several calls omit the comma before the caption entirely.
	it('recovers when the comma before the caption is missing', () => {
		const body = '"./site/a.jpg", "Some alt", "" "The caption"';
		expect(parseArgs(body)).toEqual(['./site/a.jpg', 'Some alt', '', 'The caption']);
	});

	it('handles a two argument call', () => {
		expect(parseArgs('"./site/a.webp", "Just alt text"')).toHaveLength(2);
	});

	it('unescapes escaped quotes', () => {
		expect(parseArgs('"a \\"quoted\\" word"')).toEqual(['a "quoted" word']);
	});
});
