import manifest from '../../generated/images.json' with { type: 'json' };
import { toContentPath } from './paths.ts';

/** One generated derivative of a source image. */
export interface Derivative {
	url: string;
	width: number;
	height: number;
	format: 'webp' | 'jpeg';
}

/** A source image and every derivative `npm run images` produced from it. */
export interface ManifestEntry {
	mtimeMs: number;
	size: number;
	optionsHash: string;
	intrinsic: { width: number; height: number };
	derivatives: Derivative[];
}

export type ImageManifest = Record<string, ManifestEntry>;

const images = manifest as ImageManifest;

/**
 * Look up a source image's derivatives. Throws rather than degrading, because a miss means
 * `npm run images` has not been run since the content changed and the page would otherwise
 * ship a broken `<img>`.
 */
export function getImage(src: string, pageDirectory = ''): ManifestEntry {
	const key = toContentPath(src, pageDirectory);
	const entry = images[key];
	if (!entry) {
		throw new Error(`No generated derivatives for "${key}". Run \`npm run images\`.`);
	}
	return entry;
}

const byWidthAscending = (a: Derivative, b: Derivative) => a.width - b.width;

/** Derivatives of one format, smallest first. */
export const derivativesOf = (entry: ManifestEntry, format: Derivative['format']): Derivative[] =>
	entry.derivatives.filter((derivative) => derivative.format === format).sort(byWidthAscending);

/** Build a `srcset` attribute value from a set of derivatives. */
export const srcset = (derivatives: Derivative[]): string =>
	derivatives.map(({ url, width }) => `${url} ${width}w`).join(', ');

/** The largest derivative, used for the JPEG fallback `src` and the zoom target. */
export const largest = (derivatives: Derivative[]): Derivative =>
	derivatives[derivatives.length - 1];
