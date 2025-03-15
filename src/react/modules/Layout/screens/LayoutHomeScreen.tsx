import { observer } from 'mobx-react';

import { priceStore } from '@stores';
import { Div, Span } from '@ui';

const Component = () => (
	<Div className="flex flex-col h-full w-full items-center justify-center">
		{!priceStore.isConnect ? (
			<Span variant="muted">Необходимо покдлючиться к хостингу</Span>
		) : null}

		{priceStore.isConnect && !priceStore.price ? (
			<Span variant="muted">
				Программа готова к работе, необходимо получить прайс
			</Span>
		) : null}

		{priceStore.isConnect && priceStore.price ? (
			<Span variant="muted">
				Программа готова к работе, для начала работы выберите категорию
				слева в меню
			</Span>
		) : null}
	</Div>
);

const LayoutHomeScreen = observer(Component);

export default LayoutHomeScreen;
