import path from 'path';
import { app } from 'electron';

import { FTP_PRICE_FILE_NAME } from './constants.cjs';

export const isDev = () => process.env.NODE_ENV === 'development';

export const getPreloadPath = () => {
	return path.join(app.getAppPath(), isDev() ? '.' : '..', '/dist-electron/preload.cjs');
};

export const getAssetPath = () => {
	return path.join(app.getAppPath(), isDev() ? '.' : '..', '/src/assets');
};

export const getPriceBackupFileName = (lastMod: Date) => {
	const fileName = FTP_PRICE_FILE_NAME.replace('.csv', '');

	const lastModDate = lastMod.toLocaleDateString();
	const lastModTime = lastMod.toLocaleTimeString();
	const lastModeFull = `(${lastModDate} ${lastModTime})`;

	// const curDate = new Date();
	// const curModDate = curDate.toLocaleDateString();
	// const curModTime = curDate.toLocaleTimeString();
	// const curModeFull = `(${curModDate} ${curModTime})`;

	return `${fileName} ${lastModeFull}.csv`.replaceAll(':', '-');

	// return `${fileName} ${lastModeFull} ${curModeFull}.csv`.replaceAll(':', '-');
};
