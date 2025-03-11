import { observer } from 'mobx-react';
import { useNavigate } from 'react-router';

import { priceStore } from '@stores';
import { TypePriceCategory } from '@types';
import { Button, Card, Div, Stack } from '@ui';

import LayoutCategories from '../components/LayoutCategories';
import LayoutLogo from '../components/LayoutLogo';

const Component = () => {
	const navigate = useNavigate();

	const handleAdd = () => navigate('/category');

	const handleSelect = (id: TypePriceCategory['category_id']) => {
		navigate('/category/' + id, { replace: true });
	};

	return (
		<Card className="h-screen !max-h-screen max-w-64 min-w-64 !p-0 border-y-0 border-r border-l-0 flex flex-col !rounded-none justify-between">
			<LayoutLogo />

			{priceStore.price ? (
				<Stack className="h-full max-h-[calc(100vh-90px)] justify-between overflow-hidden grow-0">
					<LayoutCategories
						onAdd={handleAdd}
						onSelect={handleSelect}
						items={priceStore.categories}
					/>

					<Div className="py-4 mt-4 mx-4 border-t border-border-light dark:border-border-dark flex justify-center">
						<Button
							text="Сохранить прайс"
							disabled={!priceStore.categories || !priceStore.categories.length}
						/>
					</Div>
				</Stack>
			) : null}
		</Card>
	);
};

const LayoutSidebarContainer = observer(Component);

export default LayoutSidebarContainer;
