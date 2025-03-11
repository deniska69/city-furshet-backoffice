import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import { useRouteError } from 'react-router';

import { Button, Div, Span, Stack } from '@ui';

interface IErrorScreen {
	title?: string;
	text?: string;
	onClose?: () => void;
}

export const ErrorScreen = (props: IErrorScreen) => {
	const { title = 'Произошла критическая ошибка', text, onClose } = props;

	const error = useRouteError();

	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	const errorMessage = error?.message;

	const handleClose = () => {
		if (onClose) return onClose();
	};

	return (
		<Stack className="bg-bg-dark/50 backdrop-blur-xs absolute z-50 flex h-screen w-full items-center justify-center">
			<ExclamationTriangleIcon className="w-32" />

			<Span className="block text-center text-4xl font-bold text-white">{title}</Span>

			{text || errorMessage ? (
				<Div className="bg-red-600/20 !p-4 !mt-6 rounded-xl border border-red-900 max-w-[60%] text-center">
					<Span className="!mt-6 text-neutral-400 whitespace-pre-line text-center">
						{text || errorMessage}
					</Span>
				</Div>
			) : null}

			<Button className="!mt-6" onClick={handleClose}>
				Закрыть
			</Button>
		</Stack>
	);
};
