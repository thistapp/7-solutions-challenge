import type {Server} from "node:http";
import type {AddressInfo} from "node:net";
import {afterEach, describe, expect, it, vi} from "vitest";
import {createApp} from "../src/app.js";
import type {UsersByDepartment} from "../src/types.js";

let server: Server | undefined;

afterEach(() => {
	server?.close();
});

async function callRoute(getData: () => Promise<UsersByDepartment>) {
	server = createApp(getData).listen(0);
	await new Promise((resolve) => server!.once("listening", resolve));

	const {port} = server.address() as AddressInfo;
	return fetch(`http://localhost:${port}/users/by-department`);
}

describe("GET /users/by-department", () => {
	it("returns the grouped data as JSON", async () => {
		const data: UsersByDepartment = {
			Engineering: {
				male: 1,
				female: 0,
				ageRange: "30-30",
				hair: {Black: 1},
				addressUser: {JohnDoe: "10000"},
			},
		};

		const response = await callRoute(async () => data);

		expect(response.status).toBe(200);
		expect(await response.json()).toEqual(data);
	});

	it("returns 502 when the users cannot be loaded", async () => {
		vi.spyOn(console, "error").mockImplementation(() => {});

		const response = await callRoute(async () => {
			throw new Error("dummyjson is down");
		});

		expect(response.status).toBe(502);
	});
});
