import { useLocation } from 'react-router';

import { ErrorScreen } from './ErrorScreen';

export const NotFoundScreen = () => {
	const location = useLocation();

	return (
		<ErrorScreen
			title="Произошла ошибка"
			closeButtonText="Вернуться на главный экран"
			text={`Экран не найден.\ncurrent location.pathname: ${location.pathname}`}
		/>
	);
};
