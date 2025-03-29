import * as fs from 'fs';
import path from 'path';
import { BrowserWindow, dialog } from 'electron';
import heicConvert from 'heic-convert';
import { imageSize } from 'image-size';
import sharp from 'sharp';

import { ALLOWED_IMAGE_EXTENSIONS, TEMP_DIR, TEMP_IMAGE_FILE_NAME } from '../utils/constants.js';

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
			const extension = arr[arr.length - 1].toLowerCase();

			if (!ALLOWED_IMAGE_EXTENSIONS.includes(extension)) {
				return Promise.reject(
					`[Electron] [ImageManipulator] open(): Расширение выбранного изображения: "${extension}" не подходит в данной версии программы`,
				);
			}

			const sourceFile = fs.readFileSync(result[0]);

			if (!fs.existsSync(TEMP_DIR)) fs.mkdirSync(TEMP_DIR);

			const tempFileFullName = path.join(TEMP_DIR, TEMP_IMAGE_FILE_NAME);

			let readyBuffer = undefined;

			if (extension === 'heic') {
				const buffer = fs.readFileSync(result[0]);
				readyBuffer = await heicConvert({ buffer, format: 'JPEG', quality: 1 });
				fs.writeFileSync(tempFileFullName, readyBuffer);
			}

			const dimensions = imageSize(readyBuffer);
			console.log(dimensions);

			return Promise.resolve(sourceFile);
		} catch (e) {
			return Promise.reject('[Electron] [ImageManipulator] open(): Ошибка.\n' + e);
		}
	};
}

export const imageManipulator = new ImageManipulator();
