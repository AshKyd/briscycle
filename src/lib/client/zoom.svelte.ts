import mediumZoom from 'medium-zoom';
import { fireEvent } from './events.ts';

/**
 * Click-to-zoom on an inline photo.
 *
 * An action rather than the old whole-document query: each image owns its zoom instance and
 * tears it down with itself, so a client-side navigation no longer has to re-scan the DOM.
 */
export function zoom(node: HTMLImageElement) {
	const instance = mediumZoom(node);
	instance.on('open', () => fireEvent('image-zoom'));

	return {
		destroy: () => instance.detach()
	};
}
