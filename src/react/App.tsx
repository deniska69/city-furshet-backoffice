import { Provider } from 'mobx-react';
import { createBrowserRouter, RouterProvider } from 'react-router';

import './index.css';

import { ErrorScreen, NotFoundScreen } from '@modules/Error';
import {
	FormsCategoryScreen,
	FormsProductScreen,
	FormsProductsListScreen,
} from '@modules/Forms';
import { LayoutHomeScreen, LayoutScreen } from '@modules/Layout';
import * as stores from '@stores';

const router = createBrowserRouter([
	{
		path: '/',
		Component: LayoutScreen,
		ErrorBoundary: ErrorScreen,
		children: [
			{
				index: true,
				path: '/home',
				Component: LayoutHomeScreen,
			},
			{
				path: '/category/:categoryId?',
				Component: FormsCategoryScreen,
			},
			{
				path: '/category/:categoryId/products',
				Component: FormsProductsListScreen,
			},
			{
				path: '/category/:categoryId/product/:productId?',
				Component: FormsProductScreen,
			},
		],
	},
	{
		path: '*',
		Component: NotFoundScreen,
	},
]);

const App = () => (
	<Provider {...stores}>
		<RouterProvider router={router} />
	</Provider>
);

export default App;
