import { PencilIcon, PlusIcon } from '@heroicons/react/24/outline';

import { TypePriceProduct } from '@types';
import { Button, Card, Div, Image, Span, Stack } from '@ui';

interface IFormsProductCard extends TypePriceProduct {
	onEdit: (id: string) => void;
}

const FormsProductCard = (props: IFormsProductCard) => {
	const {
		product_id,
		product_title,
		product_title_description,
		product_price,
		product_cover,
		onEdit,
	} = props;

	const handleEdit = () => onEdit(product_id);

	return (
		<Card className="relative group flex flex-col h-full items-start max-w-[234px] justify-between">
			<Stack>
				<Image
					src={product_cover}
					className="w-[200px] h-[200px] rounded-lg"
				/>
				<Span className="font-semibold mt-1" text={product_title} />
				<Span variant="muted" text={product_title_description} />
			</Stack>

			<Button className="mt-2 !rounded-full !px-3">
				<Span className="!text-white" text={`${product_price || 0} ₽`} />
				<PlusIcon className="w-6" />
			</Button>

			<Div
				onClick={handleEdit}
				className="hidden group-hover:flex ml-[calc(-1rem-1px)] mt-[calc(-1rem-1px)] rounded-xl absolute flex-col gap-y-3 h-full min-w-full items-center justify-center bg-white/10 backdrop-blur-xs z-50 cursor-pointer"
			>
				<PencilIcon className="w-8 text-text-light" />
				<Button
					variant="link"
					text="Редактировать"
					className="dark:!text-text-light"
				/>
			</Div>
		</Card>
	);
};

export default FormsProductCard;
