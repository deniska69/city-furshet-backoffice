import { observer } from 'mobx-react';

import { hostingStore } from '@stores';
import { Div, Text } from '@ui';

const Component = () => {
	return (
		<Div className="flex h-full w-full items-center justify-center">
			{hostingStore.isConnect ? (
				<Text>Программа готова к работе</Text>
			) : (
				<Text>Необходимо покдлючиться к хостингу</Text>
			)}
		</Div>
	);
};

const StartScreen = observer(Component);

export default StartScreen;
