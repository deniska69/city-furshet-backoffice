import { useLayoutEffect, useState } from 'react';

import { DEFAULT_THEME, KEY_LOCAL_STORAGE } from '@constants';
import { localStore } from '@stores';

type ThemeVariants = 'light' | 'dark';

const toggleTheme = (value: ThemeVariants) => {
	if (value === 'light') {
		document.documentElement.classList.remove('dark');
		document.documentElement.classList.add('light');
	} else {
		document.documentElement.classList.remove('light');
		document.documentElement.classList.add('dark');
	}
};

export const useTheme = () => {
	const [theme, setTheme] = useState<ThemeVariants>('dark');

	useLayoutEffect(() => {
		const localStoreValue = localStore.get(KEY_LOCAL_STORAGE);

		if (localStoreValue === 'light' || localStoreValue === 'dark') {
			handleSetTheme(localStoreValue);
		} else {
			handleSetTheme(DEFAULT_THEME);
		}
	}, []);

	const handleSetTheme = (value: ThemeVariants) => {
		setTheme(value);
		toggleTheme(value);
		localStore.set(KEY_LOCAL_STORAGE, value);
	};

	const onToggleTheme = () => handleSetTheme(theme === 'light' ? 'dark' : 'light');

	return { theme, onToggleTheme };
};
