import path from 'path';
import { app, BrowserWindow, ipcMain, shell } from 'electron';

import { ftp } from './modules/ftp.js';
import { BUCKUP_DIR, PORT, PROJECT_TITLE, URL } from './utils/constants.js';
import { getAssetPath, getPreloadPath, getReactPath, isDev } from './utils/helpers.js';

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
		mainWindow.loadFile(getReactPath()).then(() => mainWindow.loadURL('/home'));
	}

	ipcMain.handle('connectHosting', () => ftp.connect());
	ipcMain.handle('getPrice', () => ftp.getPrice());
	ipcMain.handle('openBackupdDir', () => shell.openPath(BUCKUP_DIR));
});
