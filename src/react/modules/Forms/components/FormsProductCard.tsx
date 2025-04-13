import { EyeSlashIcon, PlusIcon } from '@heroicons/react/24/outline';

import { getImageUrl, isHide } from '@helpers';
import { Button, Card, cn, Div, Image, Span, Stack } from '@ui';

interface IFormsProductCard extends TypePriceProduct {
	onEdit: (id: string) => void;
	onOpen: (id: string) => void;
	active?: boolean;
	categoryId?: string;
}

const FormsProductCard = (props: IFormsProductCard) => {
	const {
		product_id,
		product_title,
		product_price,
		product_cover,
		product_hide,
		product_note,
		onEdit,
		onOpen,
		active,
		categoryId,
	} = props;

	const handleOpen = () => onOpen(product_id);

	const handleEdit = () => onEdit(product_id);

	return (
		<Card
			className={cn(
				'relative group flex flex-col h-auto items-start max-w-[234px] justify-between',
				active && '!border-primary',
			)}
		>
			<Stack>
				<Div className="relative">
					<Image
						className="w-[200px] h-[200px] rounded-lg object-cover"
						src={
							product_cover ? getImageUrl(categoryId, product_id, product_cover) : undefined
						}
					/>
					{isHide(product_hide) ? (
						<Div className="bg-black/20 dark:bg-black/30 absolute w-full top-0 h-full rounded-lg flex items-center justify-center backdrop-blur-[3px]">
							<EyeSlashIcon className="w-24 text-text-dark dark:text-text-light" />
						</Div>
					) : null}
				</Div>
				<Span className="font-semibold mt-1" text={product_title} />
				<Span variant="muted" text={product_note} />
			</Stack>

			<Button className="mt-2 !rounded-full !px-3">
				<Span className="!text-white" text={`${product_price || 0} ₽`} />
				<PlusIcon className="w-6" />
			</Button>

			<Div className="hidden group-hover:flex ml-[calc(-1rem)] mt-[calc(-1rem)] rounded-xl absolute flex-col gap-y-3 h-full min-w-full items-center justify-center bg-black/10 dark:bg-white/10 backdrop-blur-xs z-50">
				<Button onClick={handleOpen} text="Открыть" variant="solid" className="w-48" />
				<Button onClick={handleEdit} text="Редактировать" variant="muted" className="w-48" />
			</Div>
		</Card>
	);
};

export default FormsProductCard;
