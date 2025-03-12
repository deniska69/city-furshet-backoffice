import { PencilIcon, PlusIcon } from '@heroicons/react/24/outline';

import { TypePriceProduct } from '@types';
import { Button, Card, Div, Image, Span, Stack } from '@ui';

const FormsProductCard = (props: TypePriceProduct) => {
	const {
		product_id,
		product_hide,
		product_title,
		product_title_description,
		product_description,
		product_note,
		product_price,
		product_cover,
		product_gallery,
	} = props;

	return (
		<Div className="relative">
			<Card className="group flex flex-col h-full items-start max-w-[234px] justify-between">
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

				<Div className="hidden group-hover:flex ml-[calc(-1rem-1px)] mt-[calc(-1rem-1px)] rounded-xl absolute flex-col gap-y-3 h-full min-w-full items-center justify-center bg-white/10 backdrop-blur-xs z-50 cursor-pointer">
					<PencilIcon className="w-8 text-text-light" />
					<Button
						variant="link"
						text="Редактировать"
						className="dark:!text-text-light"
					/>
				</Div>
			</Card>
		</Div>
	);
};

export default FormsProductCard;
