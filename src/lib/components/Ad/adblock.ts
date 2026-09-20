/**
 * Detect whether an ad slot has been blocked.
 *
 * Three signals, because blockers differ: the `<ins>` may be hidden outright, the slot may
 * simply never gain any height, or the network request may be blocked with the element left
 * looking fine. The pixel probe covers the last case by loading a favicon from a domain that
 * blocklists reliably cover.
 */
export async function isBlocked(slot: HTMLElement): Promise<boolean> {
	const ins = slot.querySelector('.adsbygoogle');
	if (ins && getComputedStyle(ins).display === 'none') return true;
	if (getComputedStyle(slot).height === '0px') return true;
	return isPixelBlocked();
}

/** Resolves true when a request to a commonly-blocked domain fails. */
const isPixelBlocked = (): Promise<boolean> =>
	new Promise((resolve) => {
		const probe = new Image(1, 1);
		probe.referrerPolicy = 'no-referrer';
		probe.addEventListener('error', () => resolve(true));
		probe.addEventListener('load', () => resolve(false));
		probe.src = 'https://apps.facebook.com/favicon.ico';
	});

/**
 * Watch a slot for the delayed blocking Safari content blockers apply, which lands after the
 * first measurement has already come back clean.
 */
export function watchForLateBlocking(slot: HTMLElement, onBlocked: () => void): () => void {
	const observer = new MutationObserver(() => {
		if (getComputedStyle(slot).height === '0px') onBlocked();
	});
	observer.observe(slot, { attributes: true });
	return () => observer.disconnect();
}
