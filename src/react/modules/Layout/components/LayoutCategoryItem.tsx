import { EyeSlashIcon } from '@heroicons/react/24/outline';

import { TypePriceCategory } from '@types';
import { Button, cn, Div, Span } from '@ui';

interface ILayoutCategoryItem {
	el: TypePriceCategory;
	active: boolean;
	onClick: () => void;
}

const LayoutCategoryItem = ({ el, active, onClick }: ILayoutCategoryItem) => (
	<Button variant="ghost" className="!px-2 !py-1 !justify-between" onClick={onClick}>
		<Span className={cn('text-nowrap truncate', active ? '!text-primary' : '')}>
			{el.category_title}
		</Span>

		{el.category_hide ? (
			<Div>
				<EyeSlashIcon className={active ? '!text-primary w-4 h-4' : 'w-4 h-4'} />
			</Div>
		) : null}
	</Button>
);

export default LayoutCategoryItem;
