import { observer } from 'mobx-react';

import { ErrorScreen } from '@modules/Error';
import { layoutStore } from '@stores';

const LayoutErrorSplashScreen = observer(() => {
	if (!layoutStore.error) return null;

	const handleClose = () => layoutStore.clearError();

	return <ErrorScreen title="Произошла ошибка" text={layoutStore.error} onClose={handleClose} />;
});

export default LayoutErrorSplashScreen;
