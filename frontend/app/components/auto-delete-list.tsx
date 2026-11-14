"use client";

import {useAutoReturnList} from "../hooks/use-auto-return-list";
import {ITEM_TYPES, type Item} from "../types/item";
import {ItemButton} from "./item-button";

const RETURN_DELAY_MS = 5000;

type AutoDeleteListProps = {
	initialItems: Item[];
};

export default function AutoDeleteList({initialItems}: AutoDeleteListProps) {
	const {mainList, movedItems, moveOut, moveBack} = useAutoReturnList(
		initialItems,
		RETURN_DELAY_MS,
	);

	return (
		<div className='grid w-full max-w-5xl grid-cols-1 gap-4 sm:grid-cols-3'>
			<div className='flex flex-col gap-2'>
				{mainList.map((item) => (
					<ItemButton
						key={item.name}
						label={item.name}
						onClick={() => moveOut(item)}
					/>
				))}
			</div>

			{ITEM_TYPES.map((type) => (
				<section
					key={type}
					className='flex min-h-112 flex-col border border-gray-300'
				>
					<h2 className='border-b border-gray-300 bg-gray-100 py-2 text-center font-semibold'>
						{type}
					</h2>
					<div className='flex flex-col gap-2 p-2'>
						{movedItems
							.filter((item) => item.type === type)
							.map((item) => (
								<ItemButton
									key={item.name}
									label={item.name}
									onClick={() => moveBack(item)}
								/>
							))}
					</div>
				</section>
			))}
		</div>
	);
}
