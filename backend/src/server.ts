import {createApp} from "./app.js";
import {cached} from "./cache.js";
import {groupByDepartment} from "./group-by-department.js";
import {fetchUsers} from "./user-api.js";

const PORT = Number(process.env.PORT ?? 3001);
const CACHE_TTL_MS = 60_000;

async function getUsersByDepartment() {
	const users = await fetchUsers();
	return groupByDepartment(users);
}

const app = createApp(cached(getUsersByDepartment, CACHE_TTL_MS));

app.listen(PORT, () => {
	console.log(`Server running at http://localhost:${PORT}/users/by-department`);
});
