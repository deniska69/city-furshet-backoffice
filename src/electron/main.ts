import path from 'path';
import { app, BrowserWindow, ipcMain, shell } from 'electron';

import { ftp } from './modules/ftp.js';
import { imageManipulator } from './modules/imageManipulator.js';
import { BUCKUP_DIR, PORT, PROJECT_TITLE, URL } from './utils/constants.js';
import { getAssetPath, getPreloadPath, getReactPath, isDev } from './utils/helpers.js';

app.commandLine.appendSwitch('disable-http-cache');

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
	mainWindow.maximize();
	mainWindow.webContents.openDevTools();

	if (isDev()) {
		mainWindow.loadURL(URL + PORT);
	} else {
		mainWindow.loadFile(getReactPath()).then(() => mainWindow.loadURL('/home'));
	}

	mainWindow.setTitle(`${PROJECT_TITLE} v.${app.getVersion()}`);

	ftp.setMainWindow(mainWindow);
	imageManipulator.setMainWindow(mainWindow);

	ipcMain.handle('openBackupdDir', () => shell.openPath(BUCKUP_DIR));

	ipcMain.handle('connectHosting', () => ftp.connect());

	ipcMain.handle('getPrice', () => ftp.getPrice());
	ipcMain.on('sendPrice', (e, text) => ftp.sendPrice(text));

	ipcMain.handle('addImage', async (e, category_id, product_id, image_id) => {
		return await imageManipulator.addImage(category_id, product_id, image_id);
	});

	ipcMain.handle(
		'rotateAndSaveImage',
		async (e, angle, categoryId, productId, imageId, newImageId) => {
			return await imageManipulator.rotateAndSaveImage(
				angle,
				categoryId,
				productId,
				imageId,
				newImageId,
			);
		},
	);

	ipcMain.handle('deleteImage', (e, category_id, product_id, image_id) => {
		return ftp.deleteImage(category_id, product_id, image_id);
	});
});
