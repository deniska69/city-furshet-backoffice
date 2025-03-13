import { observer } from 'mobx-react';
import { useNavigate, useParams } from 'react-router';

import { priceStore } from '@stores';
import { Button, HStack, Stack } from '@ui';

import FormsProductCard from '../components/FormsProductCard';

const Component = () => {
	const { categoryId } = useParams();
	const navigate = useNavigate();

	const items = categoryId ? priceStore.getProducts(categoryId) : undefined;

	const handleBack = () =>
		navigate(`/category/${categoryId}`, { replace: true });

	const handleEdit = (productId: string) => {
		navigate(`/category/${categoryId}/products/${productId}`, {
			replace: true,
		});
	};

	return (
		<Stack className="items-start gap-y-3">
			<Button
				variant="link"
				onClick={handleBack}
				text="<< Вернуться в редактор категории"
			/>

			<HStack className="gap-6 flex-wrap">
				{items &&
					items.map((item, index) => (
						<FormsProductCard key={index} {...item} onEdit={handleEdit} />
					))}
			</HStack>
		</Stack>
	);
};

export const FormsProductsListScreen = observer(Component);
