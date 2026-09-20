/**
 * Pick the highest-resolution URL out of a srcset string.
 *
 * Used for `data-zoom-src`, so that clicking to zoom loads the full-size image rather than the
 * (correctly small) one the browser already chose for the thumbnail slot.
 */
export function largestSrc(srcset: string | undefined): string | undefined {
	const candidates = (srcset ?? '')
		.split(',')
		.map((candidate) => candidate.trim().split(/\s+/))
		.filter(([url]) => url)
		.map(([url, descriptor = '0w']) => ({ url, width: Number(descriptor.replace(/[wx]$/, '')) }));

	if (candidates.length === 0) return undefined;
	return candidates.reduce((best, next) => (next.width > best.width ? next : best)).url;
}
