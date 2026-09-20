import '@testing-library/svelte/vitest';
import { vi } from 'vitest';

/** jsdom has no layout engine, so nothing is ever measured as visible. */
Object.defineProperty(window, 'matchMedia', {
	writable: true,
	value: vi.fn().mockImplementation((query: string) => ({
		matches: false,
		media: query,
		addEventListener: vi.fn(),
		removeEventListener: vi.fn()
	}))
});
