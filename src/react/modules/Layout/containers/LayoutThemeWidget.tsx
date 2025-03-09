import { MoonIcon, SunIcon } from '@heroicons/react/24/solid';

import { useTheme } from '@hooks';
import { Switch } from '@ui';

const LayoutThemeWidget = () => {
	const { theme, onToggleTheme } = useTheme();

	return (
		<Switch
			value={theme === 'dark'}
			onChange={onToggleTheme}
			iconChecked={<MoonIcon className="w-3" />}
			iconUnChecked={<SunIcon className="color-white w-3 text-white" />}
		/>
	);
};

export default LayoutThemeWidget;
