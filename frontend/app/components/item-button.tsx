type ItemButtonProps = {
	label: string;
	onClick: () => void;
};

export function ItemButton({label, onClick}: ItemButtonProps) {
	return (
		<button
			type='button'
			onClick={onClick}
			className='w-full cursor-pointer border border-gray-300 bg-white px-4 py-2 text-center transition-colors hover:bg-gray-100 active:bg-gray-200'
		>
			{label}
		</button>
	);
}
