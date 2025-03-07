import path from 'path';
import { app, BrowserWindow } from 'electron';

import { PORT, PROJECT_TITLE, URL } from './utils/constants.cjs';
import { getAssetPath, getPreloadPath, isDev } from './utils/utils.cjs';

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
	mainWindow.setTitle(PROJECT_TITLE);

	if (isDev()) {
		mainWindow.maximize();
		mainWindow.webContents.openDevTools();
		mainWindow.loadURL(URL + PORT);
	} else {
		mainWindow.loadFile(path.join(app.getAppPath(), 'dist-react/index.html'));
	}
});
