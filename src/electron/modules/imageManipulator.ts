import * as fs from 'fs';
import path from 'path';
import { BrowserWindow, dialog } from 'electron';
import heicConvert from 'heic-convert';
import sharp from 'sharp';

import { ERROR_CODES, getError } from '../utils/bridgeEvents.js';
import { ALLOWED_IMAGE_EXTENSIONS, MAX_WIDTH_IMAGE, TEMP_DIR } from '../utils/constants.js';
import { ftp } from './ftp.js';

class ImageManipulator {
	mainWindow: BrowserWindow | undefined;

	private sendError = async (code: keyof typeof ERROR_CODES, e?: unknown) => {
		if (!this.mainWindow) return Promise.reject(getError(200));
		this.mainWindow.webContents.send('error', code, e);
		return Promise.reject(getError(code, e));
	};

	setMainWindow = (mainWindow: BrowserWindow) => (this.mainWindow = mainWindow);

	addImage = async (category_id: string, product_id: string, image_id: string) => {
		if (!this.mainWindow) return this.sendError(200);

		try {
			const result = dialog.showOpenDialogSync(this.mainWindow, {
				properties: ['openFile'],
				filters: [{ name: 'Изображения', extensions: ALLOWED_IMAGE_EXTENSIONS }],
			});

			// Прерывание выполнения функции без вызова ErrorSplash
			if (!result || !result.length) return Promise.reject(getError(201));

			const arr = result[0].split('.');
			const extension = arr[arr.length - 1].toLowerCase();

			if (!ALLOWED_IMAGE_EXTENSIONS.includes(extension)) {
				return this.sendError(202, extension);
			}

			const buffer = fs.readFileSync(result[0]);

			if (!fs.existsSync(TEMP_DIR)) fs.mkdirSync(TEMP_DIR);

			const fileFullName = path.join(TEMP_DIR, image_id + '.jpg');

			let readyBuffer = undefined;

			if (extension === 'heic') {
				readyBuffer = await heicConvert({ buffer, format: 'JPEG', quality: 1 });
			} else {
				readyBuffer = buffer;
			}

			await sharp(readyBuffer)
				.resize(MAX_WIDTH_IMAGE)
				.jpeg({ quality: 95 })
				.toFile(fileFullName);

			await ftp.uploadImage(category_id, product_id, image_id);

			return Promise.resolve();
		} catch (e) {
			return this.sendError(203, e);
		}
	};
}

export const imageManipulator = new ImageManipulator();
