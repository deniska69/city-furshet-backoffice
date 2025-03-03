import { createBrowserRouter } from 'react-router';

import { LayoutScreen } from '@modules/Layout';
import { StartRouter } from '@modules/Start';
import { ErrorScreen, NotFoundScreen } from '@modules/Error';

export const router = createBrowserRouter([
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
