import express from "express";
import type {UsersByDepartment} from "./types.js";

export function createApp(
	getUsersByDepartment: () => Promise<UsersByDepartment>,
) {
	const app = express();

	app.get("/users/by-department", async (_req, res) => {
		try {
			const data = await getUsersByDepartment();
			res.json(data);
		} catch (error) {
			console.error(error);
			res.status(502).json({error: "Could not load users from dummyjson.com"});
		}
	});

	return app;
}
