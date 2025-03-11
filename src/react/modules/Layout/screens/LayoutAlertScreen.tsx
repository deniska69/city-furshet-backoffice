import { InformationCircleIcon } from '@heroicons/react/24/outline';
import { observer } from 'mobx-react';

import { layoutStore } from '@stores';
import { Button, Div, HStack, Stack, Text } from '@ui';

const Component = () => {
	if (!layoutStore.alertText) return null;

	const handleClose = () => layoutStore.hideAlert();

	const handleSubmit = () => {
		if (layoutStore.alertSubmit) layoutStore.alertSubmit();
	};

	return (
		<Stack className="bg-bg-dark/50 backdrop-blur-xs absolute z-50 flex h-screen w-full items-center justify-center">
			<InformationCircleIcon className="w-32" />

			<Text className="block text-center text-4xl font-bold text-white">Внимание</Text>

			<Div className="bg-red-600/20 !p-4 !mt-6 rounded-xl border border-red-900 max-w-[60%] text-center">
				<Text className="!mt-6 text-neutral-400 whitespace-pre-line text-center">
					{layoutStore.alertText}
				</Text>
			</Div>

			<HStack className="gap-x-3">
				<Button className="!mt-6" onClick={handleClose}>
					Нет
				</Button>
				<Button className="!mt-6" onClick={handleSubmit}>
					Да
				</Button>
			</HStack>
		</Stack>
	);
};

export const LayoutAlertScreen = observer(Component);
