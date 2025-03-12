import { Provider } from 'mobx-react';
import { createBrowserRouter, RouterProvider } from 'react-router';

import './index.css';

import { ErrorScreen, NotFoundScreen } from '@modules/Error';
import {
	FormsCategoryProductsScreen,
	FormsCategoryScreen,
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
				path: '/home/*',
				Component: LayoutHomeScreen,
			},
			{
				path: '/category/:id?',
				Component: FormsCategoryScreen,
			},
			{
				path: '/category/:id/products',
				Component: FormsCategoryProductsScreen,
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
