import { EyeSlashIcon } from '@heroicons/react/24/outline';

import { Button, cn, Div, Span } from '@ui';

interface ILayoutCategoryItem {
	el: TypePriceCategory;
	active: boolean;
	onClick: () => void;
}

const LayoutCategoryItem = ({ el, active, onClick }: ILayoutCategoryItem) => (
	<Button variant="ghost" className="!px-4 !py-4 !justify-between" onClick={onClick}>
		<Span className={cn('text-nowrap truncate', active ? '!text-primary' : '')}>
			{el.category_title}
		</Span>

		{el.category_hide === 'true' ? (
			<Div>
				<EyeSlashIcon className={active ? '!text-primary w-4 h-4' : 'w-4 h-4'} />
			</Div>
		) : null}
	</Button>
);

export default LayoutCategoryItem;
