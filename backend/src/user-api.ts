import type {User, UsersResponse} from "./types.js";

const USERS_URL =
	"https://dummyjson.com/users?limit=0&select=firstName,lastName,age,gender,hair,address,company";

export async function fetchUsers(): Promise<User[]> {
	const response = await fetch(USERS_URL);

	if (!response.ok) {
		throw new Error(`Failed to fetch users: ${response.status}`);
	}

	const data = (await response.json()) as UsersResponse;
	return data.users;
}
