import path from 'path';
import { app } from 'electron';

import { FTP_PRICE_FILE_NAME } from './constants.js';

export const isDev = () => process.env.NODE_ENV === 'development';

export const getPreloadPath = () => {
	return path.join(app.getAppPath(), isDev() ? '.' : '..', '/dist-electron/modules/preload.cjs');
};

export const getAssetPath = () => {
	return path.join(app.getAppPath(), isDev() ? '.' : '..', '/src/assets');
};

export function getReactPath() {
	return path.join(app.getAppPath(), 'dist-react/index.html');
}

export const getPriceBackupFileName = (lastMod: Date) => {
	const fileName = FTP_PRICE_FILE_NAME.replace('.csv', '');

	const lastModDate = lastMod.toLocaleDateString();
	const lastModTime = lastMod.toLocaleTimeString();
	const lastModeFull = `(${lastModDate} ${lastModTime})`;

	const curDate = new Date();
	const curModDate = curDate.toLocaleDateString();
	const curModTime = curDate.toLocaleTimeString();
	const curModeFull = `(${curModDate} ${curModTime})`;

	return `${fileName} ${lastModeFull} ${curModeFull}.csv`.replaceAll(':', '-');
};
