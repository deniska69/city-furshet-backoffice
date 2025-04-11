import { useEffect } from 'react';

export const useEscape = (onPress: () => void) => {
	useEffect(() => {
		const handlePressEsc = (e: KeyboardEvent) => {
			if (e.key === 'Escape') onPress();
		};

		window.addEventListener('keydown', handlePressEsc);

		return () => window.removeEventListener('keydown', handlePressEsc);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
};
