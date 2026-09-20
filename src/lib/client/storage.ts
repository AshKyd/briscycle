/** JSON-safe session storage helpers that degrade quietly when storage is unavailable. */

export function read<T>(key: string, fallback: T): T {
	try {
		const raw = sessionStorage.getItem(key);
		return raw === null ? fallback : (JSON.parse(raw) as T);
	} catch {
		return fallback;
	}
}

export function write(key: string, value: unknown): void {
	try {
		sessionStorage.setItem(key, JSON.stringify(value));
	} catch {
		// Private browsing and blocked site data both throw; neither is worth surfacing.
	}
}

export function remove(key: string): void {
	try {
		sessionStorage.removeItem(key);
	} catch {
		// As above.
	}
}
