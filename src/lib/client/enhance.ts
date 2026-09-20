import mediumZoom from 'medium-zoom';
import { fireEvent, flushEvents } from './events.ts';

/**
 * Wire up the progressive enhancements the article content expects: click-to-zoom on inline
 * photos, and copy buttons on the bike-hire promo codes.
 *
 * Returns a teardown, because the content is replaced on every client-side navigation and the
 * zoom instance holds references to the old nodes.
 */
export function enhanceContent(root: ParentNode): () => void {
	const zoom = mediumZoom(root.querySelectorAll('[data-zoom-src]'));
	zoom.on('open', () => fireEvent('image-zoom'));

	const copyButtons = [...root.querySelectorAll<HTMLElement>('.copy-code__button')];
	const listeners = copyButtons.map((button) => {
		const onClick = async () => {
			const target = document.querySelector(button.dataset.clipboardTarget ?? '');
			if (!target?.textContent) return;
			await navigator.clipboard.writeText(target.textContent.trim()).catch(() => undefined);
			button.classList.add('clicked');
		};
		button.addEventListener('click', onClick);
		return () => button.removeEventListener('click', onClick);
	});

	flushEvents();

	return () => {
		zoom.detach();
		listeners.forEach((remove) => remove());
	};
}
