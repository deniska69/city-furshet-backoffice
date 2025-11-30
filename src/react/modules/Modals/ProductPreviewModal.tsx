import { MinusIcon, PlusIcon } from '@heroicons/react/24/outline';
import { observer } from 'mobx-react';
import { Swiper, SwiperSlide } from 'swiper/react';

import { getGallery, getImageUrl } from '@helpers';
import { useEscape } from '@hooks';
import FormsHeader from '@modules/Forms/components/FormsHeader';
import { layoutStore, priceStore } from '@stores';
import { Card, Div, HStack, Image, Span, Stack } from '@ui';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import 'swiper/css';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import 'swiper/css/pagination';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import 'swiper/css/navigation';

import { Navigation, Pagination } from 'swiper/modules';

export const ProductPreviewModal = observer(() => {
	const handleClose = () => layoutStore.hideProductViewModal();

	useEscape(handleClose);

	if (!layoutStore.productViewModal) return null;

	const { categoryId, productId } = layoutStore.productViewModal;

	const product = priceStore.getProduct(categoryId, productId);

	if (!product) return null;

	const {
		product_cover,
		product_title,
		product_description,
		product_note,
		product_price,
		product_note_additional,
		product_gallery,
	} = product;

	const cover = getImageUrl(categoryId, productId, product_cover);

	const gallery = getGallery(categoryId, productId, product_gallery);

	return (
		<Stack
			className="bg-bg-dark/50 backdrop-blur-xs absolute z-[100] flex h-screen w-full items-center justify-center"
			onClick={handleClose}
		>
			<Card className="!min-w-[900px] !max-w-[900px] p-0!" onClick={(e) => e.stopPropagation()}>
				<FormsHeader title={product_title} titleNew="Предпросмотр" onClose={handleClose} />

				<HStack className="items-start relative p-4">
					{gallery ? (
						<Div className="max-w-[400px] min-h-[400px] max-h-[400px] rounded-lg overflow-hidden">
							<Swiper
								pagination={true}
								navigation={true}
								modules={[Navigation, Pagination]}
								className="min-h-[400px]"
							>
								{cover ? (
									<SwiperSlide>
										<Image
											src={cover}
											className="min-w-[400px] min-h-[400px] max-h-[400px] w-[400px] aspect-square rounded-lg object-cover"
										/>
									</SwiperSlide>
								) : null}

								{gallery.map((el, index) => (
									<SwiperSlide key={index}>
										<Image
											src={el}
											className="min-w-[400px] min-h-[400px] max-h-[400px] w-[400px] aspect-square rounded-lg object-cover"
										/>
									</SwiperSlide>
								))}
							</Swiper>
						</Div>
					) : (
						<Image
							src={cover}
							className="min-w-[400px] min-h-[400px] w-[400px] aspect-square rounded-lg object-cover"
						/>
					)}

					<Stack className="px-6 gap-y-3">
						<Span className="text-xl font-light">{product_description}</Span>
						<Span className="text-xl font-light" variant="muted">
							{product_note}
						</Span>

						<HStack className="items-center gap-x-3">
							<Div className="mt-2 !rounded-full !px-3 hover:cursor-default bg-neutral-400 dark:bg-neutral-600 py-1">
								<MinusIcon className="w-6 text-white" />
							</Div>
							<Span className="text-2xl mt-1">0</Span>
							<Div className="mt-2 !rounded-full !px-3 hover:cursor-default bg-primary py-1 flex flex-row gap-x-1">
								<Span className="!text-white" text={`${product_price || 0} ₽`} />
								<PlusIcon className="w-6 text-white" />
							</Div>
						</HStack>

						<Span className="text-xl font-light" variant="muted">
							{product_note_additional}
						</Span>
					</Stack>
				</HStack>
			</Card>
		</Stack>
	);
});
