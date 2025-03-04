import { app, BrowserWindow } from 'electron';
import path from 'path';
import dotenv from 'dotenv';

import { getAssetPath, getPreloadPath, isDev } from './utils.js';

dotenv.config();

const PORT = process.env.PORT_LOCAL_DEV_SERVER_REACT || '';
const URL = process.env.URL_LOCAL_DEV_SERVER_REACT || '';

app.on('ready', () => {
	const mainWindow = new BrowserWindow({
		icon: path.join(getAssetPath(), 'icon.png'),
		webPreferences: {
			preload: getPreloadPath(),
			nodeIntegration: true,
		},
	});

	mainWindow.setMinimumSize(1280, 720);
	mainWindow.setMenuBarVisibility(false);
	mainWindow.setTitle('City-Furshet Backoffice');

	if (isDev()) {
		mainWindow.maximize();
		mainWindow.webContents.openDevTools();
		mainWindow.loadURL(URL + PORT);
	} else {
		mainWindow.loadFile(path.join(app.getAppPath(), 'dist-react/index.html'));
	}
});
