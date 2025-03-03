import { RouterProvider } from 'react-router';
import { Provider } from 'mobx-react';

import './index.css';
import * as stores from '@stores';
import { router } from '@navigation';

const App = () => (
	<Provider {...stores}>
		<RouterProvider router={router} />
	</Provider>
);

export default App;
