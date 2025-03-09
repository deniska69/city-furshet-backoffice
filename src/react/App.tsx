import { Provider } from 'mobx-react';
import { createBrowserRouter, RouterProvider } from 'react-router';

import './index.css';

import { ErrorScreen, NotFoundScreen } from '@modules/Error';
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
