import { useState } from 'react';
import { observer } from 'mobx-react';
import { useNavigate, useParams } from 'react-router';

import { Button, HStack, Stack } from '@ui';

import { FormsProductEditContainer } from '../containers/FormsProductEditContainer';
import { FormsProductsListContainer } from '../containers/FormsProductsListContainer';

const Component = () => {
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
					activeProductId={item}
					categoryId={categoryId}
					onEdit={handleEdit}
					onAdd={handleAdd}
				/>
				{item ? (
					<FormsProductEditContainer
						categoryId={categoryId}
						productId={item}
						onClose={handleClose}
					/>
				) : null}
			</HStack>
		</Stack>
	);
};

export const FormsProductsListScreen = observer(Component);
