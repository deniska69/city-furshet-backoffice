import { Route, Routes } from 'react-router';

import StartScreen from './screens/StartScreen';
import { NotFoundScreen } from '@modules/Error';

const StartRouter = () => (
	<Routes>
		<Route index Component={StartScreen} />
		<Route path="*" Component={NotFoundScreen} />
	</Routes>
);

export default StartRouter;
