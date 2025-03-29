import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import { useNavigate, useRouteError } from 'react-router';

import { Button, Div, Span, Stack } from '@ui';

interface IErrorScreen {
	title?: string;
	text?: string;
	onClose?: () => void;
	closeButtonText?: string;
}

export const ErrorScreen = (props: IErrorScreen) => {
	const { title = 'Произошла критическая ошибка', text, onClose, closeButtonText } = props;

	const navigate = useNavigate();
	const errorRoute = useRouteError();

	const error = errorRoute as { message?: string };
	const errorMessage = error?.message;

	const handleClose = () => {
		if (onClose) return onClose();
		navigate('/', { replace: true });
	};

	return (
		<Stack className="bg-bg-dark/50 backdrop-blur-xs absolute z-51 flex h-screen w-full items-center justify-center">
			<ExclamationTriangleIcon className="w-32 text-white" />

			<Span className="block text-center text-4xl font-bold text-white">{title}</Span>

			{text || errorMessage ? (
				<Div className="bg-red-500/60 dark:bg-red-600/20 !p-4 !mt-6 rounded-xl border border-red-900 max-w-[60%] text-center">
					<Span className="!mt-6 text-white dark:text-neutral-400 whitespace-pre-line text-center">
						{text || errorMessage}
					</Span>
				</Div>
			) : null}

			<Button className="!mt-6" onClick={handleClose}>
				{closeButtonText || 'Закрыть'}
			</Button>
		</Stack>
	);
};
