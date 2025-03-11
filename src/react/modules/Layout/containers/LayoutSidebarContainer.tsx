import { observer } from 'mobx-react';
import { useNavigate } from 'react-router';

import { priceStore } from '@stores';
import { TypePriceCategory } from '@types';
import { Button, Card, cn, Div, Stack, Text } from '@ui';

import LayoutCategories from '../components/LayoutCategories';
import LayoutLogo from '../components/LayoutLogo';

const Component = () => {
	const navigate = useNavigate();

	const handleAdd = () => navigate('/category');

	const handleSelect = (id: TypePriceCategory['category_id']) => {
		navigate('/category/' + id, { replace: true });
	};

	const categories = priceStore.categories;
	const isCategories = priceStore.price && categories && categories.length > 0;

	return (
		<Card className="h-screen !max-h-screen max-w-64 min-w-64 !px-4 !py-0 border-y-0 border-r border-l-0 flex flex-col !rounded-none dev justify-between">
			<LayoutLogo />

			<Stack
				className={cn(
					'dev gap-y-3 h-full mb-4',
					isCategories ? 'justify-start pt-6' : 'justify-center',
				)}
			>
				{priceStore.price && categories && categories.length < 1 ? (
					<Text variant="muted" className="text-center">
						В прайсе нет найденных категорий, нажмите на кнопку добавить:
					</Text>
				) : null}

				{isCategories ? <LayoutCategories items={categories} onSelect={handleSelect} /> : null}

				{priceStore.price ? <Button text="+" variant="muted" onClick={handleAdd} /> : null}
			</Stack>

			{isCategories ? (
				<Div className="py-4 border-t border-border-light dark:border-border-dark flex justify-center">
					<Button text="Сохранить прайс" />
				</Div>
			) : null}
		</Card>
	);
};

const LayoutSidebarContainer = observer(Component);

export default LayoutSidebarContainer;
