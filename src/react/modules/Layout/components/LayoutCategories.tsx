import { EyeSlashIcon } from '@heroicons/react/24/outline';
import { useLocation } from 'react-router';

import { TypePriceCategory } from '@types';
import { Button, Stack, Text } from '@ui';

interface ILayoutCategories {
	items: Array<TypePriceCategory>;
	onSelect: (id: TypePriceCategory['category_id']) => void;
}

const LayoutCategories = ({ items, onSelect }: ILayoutCategories) => {
	const alias = useLocation()?.pathname.split('/')[1];
	const aliasSecond = useLocation()?.pathname.split('/')[2];

	return (
		<Stack>
			{items.map((el) => (
				<Button
					variant="link"
					key={el.category_id}
					className="px-4 !justify-between"
					onClick={() => onSelect(el.category_id)}
				>
					<Text
						className={
							alias === 'category' && aliasSecond === el.category_id ? '!text-primary' : ''
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
		</Stack>
	);
};

export default LayoutCategories;
