import { observer } from 'mobx-react';

import { priceStore } from '@stores';
import { Div, Text } from '@ui';

const Component = () => (
	<Div className="flex h-full w-full items-center justify-center">
		{!priceStore.isConnect ? (
			<Text variant="muted">Необходимо покдлючиться к хостингу</Text>
		) : null}

		{priceStore.isConnect && !priceStore.price ? (
			<Text variant="muted">Программа готова к работе, необходимо получить прайс</Text>
		) : null}

		{priceStore.isConnect && priceStore.price ? (
			<Text variant="muted">
				Программа готова к работе, для начала работы выберите категорию слева в меню
			</Text>
		) : null}
	</Div>
);

const LayoutHomeScreen = observer(Component);

export default LayoutHomeScreen;
