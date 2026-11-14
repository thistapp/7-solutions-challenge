import {afterEach, beforeEach, describe, expect, it, vi} from "vitest";
import {cached} from "../src/cache.js";

describe("cached", () => {
	beforeEach(() => vi.useFakeTimers());
	afterEach(() => vi.useRealTimers());

	it("reuses the result until it expires", async () => {
		const load = vi.fn().mockResolvedValue("data");
		const get = cached(load, 1000);

		await get();
		await get();
		expect(load).toHaveBeenCalledTimes(1);

		vi.advanceTimersByTime(1000);
		await get();
		expect(load).toHaveBeenCalledTimes(2);
	});

	it("does not keep a failed result", async () => {
		const load = vi
			.fn()
			.mockRejectedValueOnce(new Error("down"))
			.mockResolvedValue("data");
		const get = cached(load, 1000);

		await expect(get()).rejects.toThrow("down");
		await expect(get()).resolves.toBe("data");
	});
});
