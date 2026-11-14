import AutoDeleteList from "./components/auto-delete-list";
import {ITEMS} from "./data/items";

export default function Home() {
	return (
		<div className='flex flex-1 justify-center bg-white p-6 text-gray-900'>
			<AutoDeleteList initialItems={ITEMS} />
		</div>
	);
}
