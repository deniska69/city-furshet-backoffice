import { MinusIcon, PlusIcon } from '@heroicons/react/24/outline';
import { observer } from 'mobx-react';

import { getImageUrl } from '@helpers';
import { useEscape } from '@hooks';
import FormsHeader from '@modules/Forms/components/FormsHeader';
import { layoutStore, priceStore } from '@stores';
import { Button, Card, HStack, Image, Span, Stack } from '@ui';

const Component = () => {
	const handleClose = () => layoutStore.hideProductModal();

	useEscape(handleClose);

	if (!layoutStore.productModal) return null;

	const { categoryId, productId } = layoutStore.productModal;

	const product = priceStore.getProduct(categoryId, productId);

	if (!product) return null;

	const {
		product_cover,
		product_title,
		product_description,
		product_note,
		product_price,
		product_note_additional,
	} = product;

	const cover = getImageUrl(categoryId, productId, product_cover);

	return (
		<Stack className="bg-bg-dark/50 backdrop-blur-xs absolute z-[100] flex h-screen w-full items-center justify-center">
			<Card className="!min-w-[900px] !max-w-[900px]">
				<FormsHeader title={product_title} onClose={handleClose} />

				<HStack className="mt-4 items-start relative">
					<Image
						src={cover}
						className="min-w-[400px] min-h-[400px] w-[400px] aspect-square rounded-lg object-cover"
					/>

					<Stack className="px-6 gap-y-3">
						<Span className="text-xl font-light">{product_description}</Span>
						<Span className="text-xl font-light" variant="muted">
							{product_note}
						</Span>

						<HStack className="items-center gap-x-3">
							<Button
								className="mt-2 !rounded-full !px-3 hover:cursor-default"
								variant="muted"
							>
								<MinusIcon className="w-6 text-white" />
							</Button>
							<Span className="text-2xl mt-1">0</Span>
							<Button className="mt-2 !rounded-full !px-3 hover:cursor-default">
								<Span className="!text-white" text={`${product_price || 0} ₽`} />
								<PlusIcon className="w-6" />
							</Button>
						</HStack>

						<Span className="text-xl font-light" variant="muted">
							{product_note_additional}
						</Span>
					</Stack>
				</HStack>
			</Card>
		</Stack>
	);
};

export const FormsProductModalScreen = observer(Component);
