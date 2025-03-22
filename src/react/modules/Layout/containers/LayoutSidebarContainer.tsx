import { observer } from 'mobx-react';
import { useNavigate } from 'react-router';

import { priceStore } from '@stores';
import { Button, Card, Div, Stack } from '@ui';

import LayoutCategories from '../components/LayoutCategories';
import LayoutLogo from '../components/LayoutLogo';

const Component = () => {
	const navigate = useNavigate();

	const handleAdd = () => navigate('/category', { replace: true });

	const handleSelect = (id: TypePriceCategory['category_id']) => {
		navigate('/category/' + id, { replace: true });
	};

	const handleSave = () => priceStore.savePrice();

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
							onClick={handleSave}
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
