import { EyeSlashIcon } from '@heroicons/react/24/outline';

import { TypePriceCategory } from '@types';
import { Button, Span } from '@ui';

interface ILayoutCategoryItem {
	el: TypePriceCategory;
	active: boolean;
	onClick: () => void;
}

const LayoutCategoryItem = ({ el, active, onClick }: ILayoutCategoryItem) => (
	<Button variant="link" className="px-4 !justify-between" onClick={onClick}>
		<Span className={active ? '!text-primary' : ''}>{el.category_title}</Span>
		{el.category_hide ? <EyeSlashIcon className={active ? '!text-primary w-4' : 'w-4'} /> : null}
	</Button>
);

export default LayoutCategoryItem;
