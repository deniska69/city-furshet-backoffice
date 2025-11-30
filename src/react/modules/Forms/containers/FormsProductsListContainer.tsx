import { observer } from 'mobx-react';

import { priceStore } from '@stores';
import { HStack } from '@ui';

import FormsProductCard from '../components/FormsProductCard';
import FormsProductNewCard from '../components/FormsProductNewCard';

interface IComponent {
	categoryId?: string;
	onEdit: (value: string) => void;
	onPreview: (value: string) => void;
	onAdd: () => void;
}

const FormsProductsListContainer = observer(
	({ categoryId, onEdit, onPreview, onAdd }: IComponent) => {
		const items = categoryId ? priceStore.getProducts(categoryId) : undefined;

		return (
			<HStack className="gap-3 flex-wrap overflow-y-auto">
				{items &&
					items.map((item, index) => (
						<FormsProductCard
							{...item}
							key={index}
							categoryId={categoryId}
							onEdit={() => onEdit(item.product_id)}
							onPreview={() => onPreview(item.product_id)}
						/>
					))}
				<FormsProductNewCard onClick={onAdd} />
			</HStack>
		);
	},
);

export default FormsProductsListContainer;
