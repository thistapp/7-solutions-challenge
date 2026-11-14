import type {DepartmentSummary, User, UsersByDepartment} from "./types.js";

function createEmptySummary(): DepartmentSummary {
	return {male: 0, female: 0, ageRange: "", hair: {}, addressUser: {}};
}

export function groupByDepartment(users: User[]): UsersByDepartment {
	const result: UsersByDepartment = {};
	const ages: Record<string, {min: number; max: number}> = {};

	for (const user of users) {
		const department = user.company.department;
		if (!result[department]) {
			result[department] = createEmptySummary();
			ages[department] = {min: user.age, max: user.age};
		}

		const summary = result[department];
		summary[user.gender]++;

		const hairColor = user.hair.color;
		summary.hair[hairColor] = (summary.hair[hairColor] ?? 0) + 1;

		summary.addressUser[user.firstName + user.lastName] =
			user.address.postalCode;

		const age = ages[department];
		age.min = Math.min(age.min, user.age);
		age.max = Math.max(age.max, user.age);
	}

	for (const department in result) {
		result[department].ageRange =
			`${ages[department].min}-${ages[department].max}`;
	}

	return result;
}
