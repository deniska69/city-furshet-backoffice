import { observer } from 'mobx-react';
import { useNavigate, useParams } from 'react-router';

import { priceStore } from '@stores';
import { Button, HStack, Stack } from '@ui';

import FormsProductCard from '../components/FormsProductCard';

const Component = () => {
	const { id } = useParams();
	const navigate = useNavigate();

	const items = id ? priceStore.getProducts(id) : undefined;

	const handleBack = () => navigate(`/category/${id}`, { replace: true });

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
						<FormsProductCard key={index} {...item} />
					))}
			</HStack>
		</Stack>
	);
};

export const FormsCategoryProductsScreen = observer(Component);
