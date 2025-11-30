import { useNavigate, useParams } from 'react-router';

import { ErrorScreen } from '@modules/Error';
import { layoutStore } from '@stores';
import { Button, HStack, Stack } from '@ui';

import FormsProductsListContainer from '../containers/FormsProductsListContainer';

const FormsProductsListScreen = () => {
	const navigate = useNavigate();
	const { categoryId } = useParams();

	if (!categoryId) return <ErrorScreen text='Отсутствует "categoryId"' />;

	const handleBack = () => navigate(`/category/${categoryId}`, { replace: true });

	const handleEdit = (productId: string) => {
		layoutStore.showProductEditModal({ categoryId, productId });
	};

	const handleAdd = () => {
		layoutStore.showProductEditModal({ categoryId });
	};

	const handleOpen = (productId: string) => {
		layoutStore.showProductViewModal({ categoryId, productId });
	};

	return (
		<Stack className="items-start gap-y-3">
			<Button variant="link" onClick={handleBack} text="<< Вернуться в редактор категории" />

			<HStack className="items-start gap-x-6">
				<FormsProductsListContainer
					onAdd={handleAdd}
					onEdit={handleEdit}
					onPreview={handleOpen}
					categoryId={categoryId}
				/>
			</HStack>
		</Stack>
	);
};

export default FormsProductsListScreen;
