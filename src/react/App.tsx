import { Provider } from 'mobx-react';
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router';

import { ErrorScreen } from '@modules/Error';
import FormsCategoryEditScreen from '@modules/Forms/screens/FormsCategoryEditScreen';
import FormsProductsListScreen from '@modules/Forms/screens/FormsProductsListScreen';
import { Layout, LayoutHomeScreen } from '@modules/Layout';
import * as stores from '@stores';

const router = createBrowserRouter([
	{
		path: '/',
		Component: Layout,
		ErrorBoundary: ErrorScreen,
		children: [
			{
				index: true,
				path: '/home',
				Component: LayoutHomeScreen,
			},
			{
				path: '/category/:categoryId?',
				Component: FormsCategoryEditScreen,
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
