import { Provider } from 'mobx-react';
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router';

import { ErrorScreen } from '@modules/Error';
import { FormsCategoryScreen, FormsProductsListScreen } from '@modules/Forms';
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
		],
	},
	{
		path: '*',
		element: <Navigate to="/" />,
	},
]);

const App = () => (
	<Provider {...stores}>
		<RouterProvider router={router} />
	</Provider>
);

export default App;
