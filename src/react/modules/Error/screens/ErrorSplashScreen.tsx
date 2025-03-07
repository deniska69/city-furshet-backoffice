import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import { observer } from 'mobx-react';

import { layoutStore } from '@stores';
import { Button, Stack, Text } from '@ui';

const Component = () => {
	if (!layoutStore.error) return null;

	const handleClose = () => layoutStore.clearError();

	return (
		<Stack className="bg-bg-dark/50 backdrop-blur-xs absolute z-50 flex h-screen w-full items-center justify-center">
			<ExclamationTriangleIcon className="w-32" />
			<Text className="block text-center text-4xl font-bold text-white">
				{layoutStore.error || 'Произошла ошибка'}
			</Text>
			<Button className="!mt-12" onClick={handleClose}>
				Закрыть
			</Button>
		</Stack>
	);
};

export const ErrorSplashScreen = observer(Component);
