import { observer } from 'mobx-react';

import { layoutStore } from '@stores';

import { ErrorScreen } from './ErrorScreen';

const Component = () => {
	if (!layoutStore.error) return null;

	const handleClose = () => layoutStore.clearError();

	return <ErrorScreen title="Произошла ошибка" text={layoutStore.error} onClose={handleClose} />;
};

export const ErrorSplashScreen = observer(Component);
