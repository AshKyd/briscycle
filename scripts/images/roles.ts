/** How a source image is used, which determines the widths and quality it is rendered at. */
export type Role = 'heroDesktop' | 'heroMobile' | 'thumb' | 'inline' | 'inlineAligned';

export interface FormatSpec {
	format: 'avif' | 'jpeg';
	widths: number[];
	quality: number;
}

/**
 * Width and quality sets per role, carried over from the legacy Eleventy image pipeline so
 * the generated derivatives stay the same size and weight as the ones the site shipped.
 *
 * An aligned inline image only occupies half the column, so it stops at 960px rather than
 * generating the 1024/800 steps a full-width one needs.
 */
export const ROLE_SPECS: Record<Role, FormatSpec[]> = {
	heroDesktop: [
		{ format: 'avif', widths: [3840, 3000, 1920, 1366, 1080, 750], quality: 50 },
		{ format: 'jpeg', widths: [750], quality: 75 }
	],
	heroMobile: [
		{ format: 'avif', widths: [1700, 1366, 1080, 750], quality: 50 },
		{ format: 'jpeg', widths: [750], quality: 75 }
	],
	thumb: [
		{ format: 'avif', widths: [1320, 1206, 1000, 750, 600, 480], quality: 35 },
		{ format: 'jpeg', widths: [480], quality: 75 }
	],
	inline: [
		{ format: 'avif', widths: [3353, 1920, 1440, 1024, 800], quality: 60 },
		{ format: 'jpeg', widths: [960], quality: 75 }
	],
	inlineAligned: [
		{ format: 'avif', widths: [3353, 1920, 1440, 960], quality: 60 },
		{ format: 'jpeg', widths: [960], quality: 75 }
	]
};

/**
 * Combine the specs for every role a source is used in.
 *
 * A few photos serve double duty — a hero on one page and a card thumbnail on another — so
 * their widths are unioned. Where two roles disagree on quality the higher setting wins: the
 * same derivative serves both, and the most demanding use sets the floor. Thumbnails are small
 * enough that carrying hero quality costs very little, whereas a hero rendered at thumbnail
 * quality is visibly worse.
 */
export function mergeSpecs(roles: Role[]): FormatSpec[] {
	const byFormat = roles
		.flatMap((role) => ROLE_SPECS[role])
		.reduce<Map<FormatSpec['format'], FormatSpec>>((merged, spec) => {
			const existing = merged.get(spec.format);
			if (!existing) return merged.set(spec.format, { ...spec, widths: [...spec.widths] });

			existing.widths = [...new Set([...existing.widths, ...spec.widths])];
			existing.quality = Math.max(existing.quality, spec.quality);
			return merged;
		}, new Map());

	return [...byFormat.values()].map((spec) => ({
		...spec,
		widths: spec.widths.toSorted((a, b) => b - a)
	}));
}
