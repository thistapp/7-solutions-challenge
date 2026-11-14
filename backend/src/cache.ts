export function cached<T>(
	load: () => Promise<T>,
	ttlMs: number,
): () => Promise<T> {
	let value: Promise<T> | undefined;
	let expiresAt = 0;

	return () => {
		if (!value || Date.now() >= expiresAt) {
			expiresAt = Date.now() + ttlMs;
			value = load().catch((error) => {
				value = undefined;
				throw error;
			});
		}
		return value;
	};
}
