import { describe, expect, it } from 'vitest';
import { HOUSE_ADS, nextHouseAd } from './houseAds.ts';

describe('nextHouseAd', () => {
	it('advances the rotation so consecutive slots differ', () => {
		const store = new Map<string, number>();
		const read = (key: string, fallback: number) => store.get(key) ?? fallback;
		const write = (key: string, value: number) => void store.set(key, value);

		const shown = Array.from({ length: HOUSE_ADS.length }, () => nextHouseAd(read, write));
		expect(new Set(shown.map(({ id }) => id)).size).toBe(HOUSE_ADS.length);
	});

	it('wraps back to the start', () => {
		const store = new Map<string, number>([['fallbackRotation', HOUSE_ADS.length - 1]]);
		const read = (key: string, fallback: number) => store.get(key) ?? fallback;
		const write = (key: string, value: number) => void store.set(key, value);

		expect(nextHouseAd(read, write).id).toBe(HOUSE_ADS.at(-1)?.id);
		expect(nextHouseAd(read, write).id).toBe(HOUSE_ADS[0].id);
	});
});
