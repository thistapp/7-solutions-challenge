// data from https://dummyjson.com/users

export type Gender = "male" | "female";

export type User = {
	firstName: string;
	lastName: string;
	age: number;
	gender: Gender;
	hair: {
		color: string;
	};
	address: {
		postalCode: string;
	};
	company: {
		department: string;
	};
};

export type UsersResponse = {
	users: User[];
	total: number;
	skip: number;
	limit: number;
};

// users group by department

export type DepartmentSummary = {
	male: number;
	female: number;
	ageRange: string;
	hair: Record<string, number>;
	addressUser: Record<string, string>;
};

export type UsersByDepartment = Record<string, DepartmentSummary>;
