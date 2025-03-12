import { observer } from 'mobx-react';
import { useParams } from 'react-router';

import { priceStore } from '@stores';

const Component = () => {
	const { id } = useParams();

	const products = id ? priceStore.getProducts(id) : undefined;

	console.log({ id });
	console.log(products);

	return <div>FormsCategoryProductsScreen: {id}</div>;
};

export const FormsCategoryProductsScreen = observer(Component);
