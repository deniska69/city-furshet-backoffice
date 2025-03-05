import { priceStore } from '@stores';
import { Button, Div, Stack } from '@ui';
import { observer } from 'mobx-react';

const Component = () => {
	const handlePressButton = () => {
		console.log('[handlePressButton] => priceStore.getPriceSyncs');
		priceStore.getPrice();
	};

	const handlePressButton2 = () => {
		console.log('[handlePressButton2]');
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		window.electron.getPrice();
	};

	return (
		<Div className="flex h-full w-full items-center justify-center">
			<Stack className="gap-y-3">
				<Button onClick={handlePressButton}>Скачать прайс через React</Button>

				<Button onClick={handlePressButton2}>Скачать прайс через Nodejs</Button>
			</Stack>
		</Div>
	);
};

const StartScreen = observer(Component);

export default StartScreen;
