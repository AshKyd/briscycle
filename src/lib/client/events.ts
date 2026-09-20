import { read, remove, write } from './storage.ts';

/** Umami's tracker, injected asynchronously by the analytics script. */
interface Umami {
	track: (name: string, data?: unknown) => void;
}

const CACHE_KEY = 'eventCache';
/** Stop waiting for the analytics script after this long, and drop the queue. */
const GIVE_UP_AFTER = 15_000;
const POLL_INTERVAL = 1000;

interface QueuedEvent {
	eventName: string;
	data?: unknown;
}

const umami = (): Umami | undefined => (window as { umami?: Umami }).umami;

/**
 * Flush queued events once the analytics script has loaded.
 *
 * The queue is kept in session storage because the script often arrives after the click that
 * triggered the event — including on a page that has already navigated away — so events would
 * otherwise be lost. It is abandoned after fifteen seconds rather than retrying forever, which
 * is also what happens when an ad blocker stops the script loading at all.
 */
export function flushEvents(): void {
	const started = Date.now();
	const interval = setInterval(() => {
		const tracker = umami();

		if (!tracker) {
			if (Date.now() - started < GIVE_UP_AFTER) return;
			clearInterval(interval);
			remove(CACHE_KEY);
			return;
		}

		clearInterval(interval);
		read<QueuedEvent[]>(CACHE_KEY, []).forEach(({ eventName, data }) =>
			tracker.track(eventName, data)
		);
		remove(CACHE_KEY);
	}, POLL_INTERVAL);
}

/** Track an event now, or queue it until the analytics script is available. */
export function fireEvent(eventName: string, data?: unknown): void {
	const tracker = umami();
	if (tracker) return tracker.track(eventName, data);

	write(CACHE_KEY, [...read<QueuedEvent[]>(CACHE_KEY, []), { eventName, data }]);
	flushEvents();
}
