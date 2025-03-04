import { priceStore } from '@stores';
import { Button, Div, Stack } from '@ui';
import { observer } from 'mobx-react';

const Component = () => {
	const handlePressButton = () => {
		console.log('[handlePressButton] => priceStore.getPriceSyncs');
		priceStore.getPrice();
	};

	return (
		<Div className="flex h-screen w-full items-center justify-center">
			<Stack className="gap-y-3">
				<Button onClick={handlePressButton}>Скачать прайс</Button>
			</Stack>
		</Div>
	);
};

const StartScreen = observer(Component);

export default StartScreen;
