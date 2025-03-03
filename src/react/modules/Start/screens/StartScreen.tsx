import { getPriceSync } from '@helpers';
import { priceStore } from '@stores';
import { Button, Div, Stack } from '@ui';
import { observer } from 'mobx-react';

const Component = () => (
	<Div className="flex h-screen w-full items-center justify-center">
		<Stack className="gap-y-3">
			<Button onClick={() => getPriceSync()}>Скачать прайс</Button>
			<Button onClick={() => priceStore.getPriceSync()} variant="orange">
				Скачать прайс
			</Button>
		</Stack>
	</Div>
);

const StartScreen = observer(Component);

export default StartScreen;
