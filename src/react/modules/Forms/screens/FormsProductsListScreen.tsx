import { observer } from 'mobx-react';
import { useNavigate, useParams } from 'react-router';

import { priceStore } from '@stores';
import { Button, HStack, Stack } from '@ui';

import FormsProductCard from '../components/FormsProductCard';
import FormsProductNewCard from '../components/FormsProductNewCard';

const Component = () => {
	const { categoryId } = useParams();
	const navigate = useNavigate();

	const items = categoryId ? priceStore.getProducts(categoryId) : undefined;

	const handleBack = () => {
		navigate(`/category/${categoryId}`, { replace: true });
	};

	const handleEdit = (productId?: string) => {
		navigate(
			`/category/${categoryId}/product${productId ? '/' + productId : ''}`,
			{ replace: true },
		);
	};

	const handleAdd = () => {
		navigate(`/category/${categoryId}/product`, { replace: true });
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
						<FormsProductCard
							{...item}
							key={index}
							onClick={handleEdit}
						/>
					))}
				<FormsProductNewCard onClick={handleAdd} />
			</HStack>
		</Stack>
	);
};

export const FormsProductsListScreen = observer(Component);
