import {describe, expect, it} from "vitest";
import {groupByDepartment} from "../src/group-by-department.js";
import type {User} from "../src/types.js";

const users: User[] = [
	{
		firstName: "Emily",
		lastName: "Johnson",
		age: 29,
		gender: "female",
		hair: {color: "Brown"},
		address: {postalCode: "29112"},
		company: {department: "Engineering"},
	},
	{
		firstName: "Michael",
		lastName: "Williams",
		age: 36,
		gender: "male",
		hair: {color: "Green"},
		address: {postalCode: "38807"},
		company: {department: "Support"},
	},
	{
		firstName: "Sarah",
		lastName: "Brown",
		age: 41,
		gender: "male",
		hair: {color: "Brown"},
		address: {postalCode: "12345"},
		company: {department: "Engineering"},
	},
];

describe("groupByDepartment", () => {
	it("returns an empty object when there are no users", () => {
		expect(groupByDepartment([])).toEqual({});
	});

	it("groups users by department and builds each summary", () => {
		expect(groupByDepartment(users)).toEqual({
			Engineering: {
				male: 1,
				female: 1,
				ageRange: "29-41",
				hair: {Brown: 2},
				addressUser: {EmilyJohnson: "29112", SarahBrown: "12345"},
			},
			Support: {
				male: 1,
				female: 0,
				ageRange: "36-36",
				hair: {Green: 1},
				addressUser: {MichaelWilliams: "38807"},
			},
		});
	});
});
