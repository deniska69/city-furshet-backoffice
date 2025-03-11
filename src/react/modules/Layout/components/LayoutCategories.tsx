import { useLocation } from 'react-router';

import { TypePriceCategory } from '@types';
import { Button, cn, Span, Stack } from '@ui';

import LayoutCategoryItem from './LayoutCategoryItem';

interface ILayoutCategories {
	items?: Array<TypePriceCategory>;
	onSelect: (id: TypePriceCategory['category_id']) => void;
	onAdd: () => void;
}

const LayoutCategories = ({ items, onSelect, onAdd }: ILayoutCategories) => {
	const alias = useLocation()?.pathname.split('/')[1];
	const aliasSecond = useLocation()?.pathname.split('/')[2];

	return (
		<Stack
			className={cn(
				'px-4 gap-y-3 h-full max-h-[calc(100vh-190px)]',
				items && items.length > 0 ? 'justify-start' : 'justify-center',
			)}
		>
			<Stack className="max-h-full w-full overflow-y-auto overflow-x-hidden gap-y-2">
				{items && items.length ? (
					items.map((el) => (
						<LayoutCategoryItem
							el={el}
							key={el.category_id}
							onClick={() => onSelect(el.category_id)}
							active={alias === 'category' && aliasSecond === el.category_id}
						/>
					))
				) : (
					<Span variant="muted" className="text-center">
						В прайсе нет найденных категорий, нажмите на кнопку добавить:
					</Span>
				)}
			</Stack>

			<Button className="w-full" variant="muted" text="+" onClick={onAdd} />
		</Stack>
	);
};

export default LayoutCategories;
