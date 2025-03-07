import path from 'path';
import { app } from 'electron';

import { PRICE_FILE_NAME } from './constants.cjs';

export const isDev = () => process.env.NODE_ENV === 'development';

export const getPreloadPath = () => {
	return path.join(app.getAppPath(), isDev() ? '.' : '..', '/dist-electron/preload.cjs');
};

export const getAssetPath = () => {
	return path.join(app.getAppPath(), isDev() ? '.' : '..', '/src/assets');
};

export const getPriceBackupFileName = (lastMod: Date) => {
	const fileName =
		`${PRICE_FILE_NAME.replace('.csv', '')} (${lastMod.toLocaleDateString()} ${lastMod.toLocaleTimeString()}).csv`.replaceAll(
			':',
			'-',
		);

	return fileName;
};
