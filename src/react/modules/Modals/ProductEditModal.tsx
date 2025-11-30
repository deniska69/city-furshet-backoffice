import { observer } from 'mobx-react';

import { useEscape } from '@hooks';
import FormsHeader from '@modules/Forms/components/FormsHeader';
import { layoutStore } from '@stores';
import { Card, Stack } from '@ui';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import 'swiper/css';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import 'swiper/css/pagination';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import 'swiper/css/navigation';

import FormsProductEditContainer from '@modules/Forms/containers/FormsProductEditContainer';

export const ProductEditModal = observer(() => {
	const handleClose = () => layoutStore.hideProductEditModal();

	useEscape(handleClose);

	if (!layoutStore.productEditModal?.isShow) return null;

	const categoryId = layoutStore.productEditModal?.categoryId;
	const productId = layoutStore.productEditModal?.productId;
	const isNew = !productId;

	if (!categoryId) {
		layoutStore.setError('ProductEditModal - отсутствует обязательный параметр categoryId');
		return null;
	}

	const handleSaveCallback = (_productId: string) => {
		layoutStore.showProductEditModal({ categoryId, productId: _productId });
	};

	return (
		<Stack
			className="bg-bg-dark/50 backdrop-blur-xs absolute z-[51] flex h-screen w-full items-center justify-center"
			onClick={handleClose}
		>
			<Card className="!min-w-[900px] !max-w-[900px] p-0!" onClick={(e) => e.stopPropagation()}>
				<FormsHeader
					onClose={handleClose}
					title="Редактор товара"
					titleNew={isNew ? 'Новый товар' : undefined}
				/>
				<FormsProductEditContainer
					onClose={handleClose}
					{...{ categoryId, productId }}
					onSaveCallback={handleSaveCallback}
				/>
			</Card>
		</Stack>
	);
});
