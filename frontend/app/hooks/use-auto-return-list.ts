import {useEffect, useRef, useState} from "react";
import type {Item} from "../types/item";

type TimerId = ReturnType<typeof setTimeout>;

export function useAutoReturnList(initialItems: Item[], delayMs: number) {
	const [mainList, setMainList] = useState(initialItems);
	const [movedItems, setMovedItems] = useState<Item[]>([]);
	const timers = useRef(new Map<string, TimerId>());

	const moveBack = (item: Item) => {
		clearTimeout(timers.current.get(item.name));
		timers.current.delete(item.name);

		setMovedItems((items) => items.filter((i) => i.name !== item.name));
		setMainList((items) => [...items, item]);
	};

	const moveOut = (item: Item) => {
		setMainList((items) => items.filter((i) => i.name !== item.name));
		setMovedItems((items) => [...items, item]);

		timers.current.set(
			item.name,
			setTimeout(() => moveBack(item), delayMs),
		);
	};

	useEffect(() => {
		const pending = timers.current;
		return () => {
			pending.forEach(clearTimeout);
			pending.clear();
		};
	}, []);

	return {mainList, movedItems, moveOut, moveBack};
}
