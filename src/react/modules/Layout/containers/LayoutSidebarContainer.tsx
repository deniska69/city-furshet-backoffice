import { EyeSlashIcon } from '@heroicons/react/24/outline';
import { observer } from 'mobx-react';
import { useLocation, useNavigate } from 'react-router';

import { priceStore } from '@stores';
import { TypePriceCategory } from '@types';
import { Button, Card, cn, Stack, Text } from '@ui';

import LayoutLogo from '../components/LayoutLogo';

const Component = () => {
	const navigate = useNavigate();
	const alias = useLocation()?.pathname.split('/')[1];
	const aliasSecond = useLocation()?.pathname.split('/')[2];

	const handleAdd = () => navigate('/category');

	const handleSelect = (id: TypePriceCategory['category_id']) => {
		navigate('/category/' + id, { replace: true });
	};

	const categories = priceStore.getCategories();

	return (
		<Card className="h-screen max-w-64 min-w-64 !px-4 !py-0 border-y-0 border-r border-l-0 flex flex-col !rounded-none">
			<LayoutLogo />

			<Stack
				className={cn(
					'h-full gap-y-3',
					!priceStore.price || (priceStore.price && !categories)
						? 'justify-center'
						: 'justify-start pt-6',
				)}
			>
				{!priceStore.price ? (
					<Text variant="muted" className="text-center">
						Для отображения категорий необходимо получить прайс
					</Text>
				) : null}

				{priceStore.price && !categories ? (
					<Text variant="muted" className="text-center">
						В прайсе нет найденных категорий, нажмите на кнопку добавить:
					</Text>
				) : null}

				{categories &&
					categories.map((el) => (
						<Button
							variant="link"
							key={el.category_id}
							className="px-4 !justify-between"
							onClick={() => handleSelect(el.category_id)}
						>
							<Text
								className={
									alias === 'category' && aliasSecond === el.category_id
										? '!text-primary'
										: ''
								}
							>
								{el.category_title}
							</Text>
							{el.category_hide ? (
								<EyeSlashIcon
									className={
										alias === 'category' && aliasSecond === el.category_id
											? '!text-primary w-4'
											: 'w-4'
									}
								/>
							) : null}
						</Button>
					))}

				{priceStore.price ? <Button text="+" variant="muted" onClick={handleAdd} /> : null}
			</Stack>
		</Card>
	);
};

const LayoutSidebarContainer = observer(Component);

export default LayoutSidebarContainer;
