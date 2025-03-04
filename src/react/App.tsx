import { createBrowserRouter, RouterProvider } from 'react-router';
import { Provider } from 'mobx-react';

import './index.css';
import * as stores from '@stores';
import { LayoutScreen } from '@modules/Layout';
import { ErrorScreen, NotFoundScreen } from '@modules/Error';
import { StartRouter } from '@modules/Start';

const router = createBrowserRouter([
	{
		path: '/',
		Component: LayoutScreen,
		ErrorBoundary: ErrorScreen,
		children: [
			{
				path: '/start/*',
				Component: StartRouter,
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
