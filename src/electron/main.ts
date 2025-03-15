import path from 'path';
import { app, BrowserWindow } from 'electron';

import { PORT, PROJECT_TITLE, URL } from './utils/constants.cjs';
import {
	getAssetPath,
	getPreloadPath,
	getReactPath,
	isDev,
} from './utils/helpers.cjs';

app.on('ready', () => {
	const mainWindow = new BrowserWindow({
		icon: path.join(getAssetPath(), 'icon.png'),
		webPreferences: {
			preload: getPreloadPath(),
			nodeIntegration: true,
			sandbox: false,
		},
	});

	mainWindow.setMinimumSize(1280, 720);
	mainWindow.setMenuBarVisibility(false);
	mainWindow.setTitle(PROJECT_TITLE);

	mainWindow.maximize();
	mainWindow.webContents.openDevTools();

	if (isDev()) {
		mainWindow.loadURL(URL + PORT);
	} else {
		mainWindow.loadFile(getReactPath());
	}
});
