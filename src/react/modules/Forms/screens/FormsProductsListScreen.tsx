import { useState } from 'react';
import { useNavigate, useParams } from 'react-router';

import { Button, HStack, Stack } from '@ui';

import { FormsProductEditContainer } from '../containers/FormsProductEditContainer';
import { FormsProductsListContainer } from '../containers/FormsProductsListContainer';

export const FormsProductsListScreen = () => {
	const navigate = useNavigate();
	const { categoryId } = useParams();
	const [item, setItem] = useState<string | undefined>(undefined);

	const handleBack = () => navigate(`/category/${categoryId}`, { replace: true });

	const handleEdit = (id: string) => setItem(id);

	const handleAdd = () => setItem('new');

	const handleClose = () => setItem(undefined);

	return (
		<Stack className="items-start gap-y-3">
			<Button variant="link" onClick={handleBack} text="<< Вернуться в редактор категории" />

			<HStack className="items-start gap-x-6">
				<FormsProductsListContainer
					onAdd={handleAdd}
					onEdit={handleEdit}
					activeProductId={item}
					categoryId={categoryId}
				/>
				{item ? (
					<FormsProductEditContainer
						productId={item}
						onClose={handleClose}
						categoryId={categoryId}
					/>
				) : null}
			</HStack>
		</Stack>
	);
};
