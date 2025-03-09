import { observer } from 'mobx-react';

import { hostingStore } from '@stores';
import { Div, Text } from '@ui';

const Component = () => (
	<Div className="flex h-full w-full items-center justify-center">
		{!hostingStore.isConnect ? (
			<Text variant="muted">Необходимо покдлючиться к хостингу</Text>
		) : null}

		{hostingStore.isConnect && !hostingStore.isPrice ? (
			<Text variant="muted">Программа готова к работе, необходимо получить прайс</Text>
		) : null}

		{hostingStore.isConnect && hostingStore.isPrice ? (
			<Text variant="muted">
				Программа готова к работе, для начала работы выберите категорию слева в меню
			</Text>
		) : null}
	</Div>
);

const LayoutHomeScreen = observer(Component);

export default LayoutHomeScreen;
