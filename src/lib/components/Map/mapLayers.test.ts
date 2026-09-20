import { describe, expect, it } from 'vitest';
import type { FeatureCollection } from 'geojson';
import { allCoordinates, popupPoints } from './mapLayers.ts';

const collection: FeatureCollection = {
	type: 'FeatureCollection',
	features: [
		{
			type: 'Feature',
			properties: { html: '<a href="#">Website</a>' },
			geometry: { type: 'Point', coordinates: [153.02, -27.47] }
		},
		{
			type: 'Feature',
			properties: null,
			geometry: { type: 'Point', coordinates: [153.03, -27.48] }
		},
		{
			type: 'Feature',
			properties: { highway: 'path' },
			geometry: {
				type: 'LineString',
				coordinates: [
					[153.0, -27.4],
					[153.1, -27.5]
				]
			}
		}
	]
};

describe('popupPoints', () => {
	it('returns only points that carry popup markup', () => {
		expect(popupPoints(collection)).toHaveLength(1);
	});
});

describe('allCoordinates', () => {
	it('flattens points and line strings into one list', () => {
		expect(allCoordinates(collection)).toEqual([
			[153.02, -27.47],
			[153.03, -27.48],
			[153.0, -27.4],
			[153.1, -27.5]
		]);
	});
});
