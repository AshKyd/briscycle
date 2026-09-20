import { describe, expect, it } from 'vitest';
import { getStyle } from './style.ts';

describe('getStyle', () => {
	it('adds a cycle-lane casing for every road and path line layer', () => {
		const { layers } = getStyle();
		const casings = layers.filter(({ id }) => id.endsWith('_cycle-lane-casing'));
		expect(casings.length).toBeGreaterThan(0);
		expect(layers.find(({ id }) => id === 'path_cycleway_cycle-lane-casing')).toBeDefined();
	});

	// The legacy version mutated the imported style, so a second map on the page threw on
	// duplicate layer ids.
	it('returns an independent style each call', () => {
		const [first, second] = [getStyle(), getStyle()];
		expect(first.layers.length).toBe(second.layers.length);
		expect(first.layers).not.toBe(second.layers);
	});

	it('never produces duplicate layer ids', () => {
		const ids = getStyle().layers.map(({ id }) => id);
		expect(new Set(ids).size).toBe(ids.length);
	});

	it('widens the casing past the road it traces', () => {
		const casing = getStyle().layers.find(({ id }) => id === 'road_minor_cycle-lane-casing');
		expect(casing).toBeDefined();

		type StopsPaint = Record<string, { stops: [number, number][] }>;
		const paint = (casing as unknown as { paint: StopsPaint }).paint;

		const [, gapWidth] = paint['line-gap-width'].stops[0];
		const [, lineWidth] = paint['line-width'].stops[0];
		expect(lineWidth).toBeGreaterThan(gapWidth);
	});
});
