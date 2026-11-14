export const ITEM_TYPES = ["Fruit", "Vegetable"] as const;

export type ItemType = (typeof ITEM_TYPES)[number];

export type Item = {
	type: ItemType;
	name: string;
};
