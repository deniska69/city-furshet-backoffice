import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import { observer } from 'mobx-react';

import { layoutStore } from '@stores';
import { Button, Div, Stack, Text } from '@ui';

const Component = () => {
	if (!layoutStore.error) return null;

	const handleClose = () => layoutStore.clearError();

	return (
		<Stack className="bg-bg-dark/50 backdrop-blur-xs absolute z-50 flex h-screen w-full items-center justify-center">
			<ExclamationTriangleIcon className="w-32" />

			<Text className="block text-center text-4xl font-bold text-white">Произошла ошибка</Text>

			<Div className="bg-red-600/20 !p-4 !mt-6 rounded-xl border border-red-900 max-w-[60%] text-center">
				<Text className="!mt-6 text-neutral-400 whitespace-pre-line text-center">
					{layoutStore.error}
				</Text>
			</Div>

			<Button className="!mt-6" onClick={handleClose}>
				Закрыть
			</Button>
		</Stack>
	);
};

export const ErrorSplashScreen = observer(Component);
