import { observer } from 'mobx-react';

import { priceStore } from '@stores';
import { HStack } from '@ui';

import FormsProductCard from '../components/FormsProductCard';
import FormsProductNewCard from '../components/FormsProductNewCard';

interface IComponent {
	categoryId?: string;
	onEdit: (value: string) => void;
	onAdd: () => void;
	activeProductId?: string;
}

const Component = ({ categoryId, onEdit, onAdd, activeProductId }: IComponent) => {
	const items = categoryId ? priceStore.getProducts(categoryId) : undefined;

	return (
		<HStack className="gap-3 flex-wrap overflow-y-auto">
			{items &&
				items.map((item, index) => (
					<FormsProductCard
						{...item}
						key={index}
						categoryId={categoryId}
						onClick={() => onEdit(item.product_id)}
						active={item.product_id === activeProductId}
					/>
				))}
			<FormsProductNewCard onClick={onAdd} />
		</HStack>
	);
};

export const FormsProductsListContainer = observer(Component);
