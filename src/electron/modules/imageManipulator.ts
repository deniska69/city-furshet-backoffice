import * as fs from 'fs';
import { BrowserWindow, dialog } from 'electron';

import { ALLOWED_IMAGE_EXTENSIONS } from '../utils/constants.js';

class ImageManipulator {
	mainWindow: BrowserWindow | undefined;

	setMainWindow = (mainWindow: BrowserWindow) => (this.mainWindow = mainWindow);

	private sendError = (e: string) => {
		if (!this.mainWindow) return;
		this.mainWindow.webContents.send('error', '[Electron] [ImageManipulator] ' + e);
	};

	open = async () => {
		if (!this.mainWindow)
			return Promise.reject('[Electron] [ImageManipulator] open(): Отсутствует this.mainWindow');

		try {
			const result = dialog.showOpenDialogSync(this.mainWindow, {
				properties: ['openFile'],
				filters: [{ name: 'Изображения', extensions: ALLOWED_IMAGE_EXTENSIONS }],
			});

			if (!result || !result.length) {
				return Promise.reject(
					'[Electron] [ImageManipulator] open(): Не было выбранно изображение',
				);
			}

			const arr = result[0].split('.');
			const extension = arr[arr.length - 1];

			if (!ALLOWED_IMAGE_EXTENSIONS.includes(extension.toLowerCase())) {
				return Promise.reject(
					`[Electron] [ImageManipulator] open(): Расширение выбранного изображения: "${extension}" не подходит в данной версии программы`,
				);
			}

			const file = fs.readFileSync(result[0]);

			console.log('');
			console.log('---------------------------------');
			console.log(file);

			return Promise.resolve(file);
		} catch (e) {
			return Promise.reject('[Electron] [ImageManipulator] open(): Ошибка.\n' + e);
		}
	};
}

export const imageManipulator = new ImageManipulator();
