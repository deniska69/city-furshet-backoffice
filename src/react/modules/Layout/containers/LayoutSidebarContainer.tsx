import { observer } from 'mobx-react';
import { useNavigate } from 'react-router';

import logoFull from '@assets/logo_full.png';
import { priceStore } from '@stores';
import { Button, Card, Div, Image, Pressable, Span, Stack } from '@ui';

import LayoutCategories from '../components/LayoutCategories';

const Component = () => {
	const navigate = useNavigate();

	const handleAdd = () => navigate('/category', { replace: true });

	const handleSelect = (id: TypePriceCategory['category_id']) => {
		navigate('/category/' + id, { replace: true });
	};

	const handleSave = () => priceStore.savePrice();

	const handleReset = () => priceStore.getPrice();

	return (
		<Card className="h-screen !max-h-screen max-w-64 min-w-64 !p-0 border-y-0 border-r border-l-0 flex flex-col !rounded-none justify-between">
			<Div className="flex min-h-16 items-center justify-center">
				<Image src={logoFull} className="max-h-12" />
			</Div>

			{priceStore.price ? (
				<Stack className="h-full max-h-[calc(100vh-90px)] justify-between overflow-hidden grow-0">
					<LayoutCategories
						onAdd={handleAdd}
						onSelect={handleSelect}
						items={priceStore.categories}
					/>

					<Stack className="py-4 mt-4 mx-4 border-t border-border-light dark:border-border-dark flex justify-center gap-y-3">
						<Button
							onClick={handleSave}
							text="Сохранить прайс"
							disabled={!priceStore.categories || !priceStore.categories.length}
						/>
						{priceStore.isNeedSaved ? (
							<Stack className="gap-y-3 items-center">
								<Span variant="primary" className="text-sm self-center">
									Есть несохранённые изменения
								</Span>
								<Pressable onClick={handleReset}>
									<Span variant="muted" className="hover:underline text-sm">
										Сбросить
									</Span>
								</Pressable>
							</Stack>
						) : null}
					</Stack>
				</Stack>
			) : null}
		</Card>
	);
};

const LayoutSidebarContainer = observer(Component);

export default LayoutSidebarContainer;
