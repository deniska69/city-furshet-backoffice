import * as fs from 'fs';
import path from 'path';
import { BrowserWindow, dialog } from 'electron';
import heicConvert from 'heic-convert';
import sharp from 'sharp';

import { ALLOWED_IMAGE_EXTENSIONS, MAX_WIDTH_IMAGE, TEMP_DIR } from '../utils/constants.js';

class ImageManipulator {
	mainWindow: BrowserWindow | undefined;

	setMainWindow = (mainWindow: BrowserWindow) => (this.mainWindow = mainWindow);

	private sendError = (e: string) => {
		if (!this.mainWindow) return;
		this.mainWindow.webContents.send('error', '[Electron] [ImageManipulator] ' + e);
	};

	open = async (category_id: string, product_id: string) => {
		if (!this.mainWindow) return this.sendError('open(): Отсутствует this.mainWindow');

		try {
			const result = dialog.showOpenDialogSync(this.mainWindow, {
				properties: ['openFile'],
				filters: [{ name: 'Изображения', extensions: ALLOWED_IMAGE_EXTENSIONS }],
			});

			if (!result || !result.length) {
				return this.sendError('open(): Не было выбранно изображение');
			}

			const arr = result[0].split('.');
			const extension = arr[arr.length - 1].toLowerCase();

			if (!ALLOWED_IMAGE_EXTENSIONS.includes(extension)) {
				return this.sendError(
					`open(): Расширение выбранного изображения: "${extension}" не подходит в данной версии программы`,
				);
			}

			const buffer = fs.readFileSync(result[0]);

			if (!fs.existsSync(TEMP_DIR)) fs.mkdirSync(TEMP_DIR);

			const tempFileFullName = path.join(TEMP_DIR, product_id + '.jpg');

			let readyBuffer = undefined;

			if (extension === 'heic') {
				readyBuffer = await heicConvert({ buffer, format: 'JPEG', quality: 1 });
			} else {
				readyBuffer = buffer;
			}

			await sharp(readyBuffer)
				.resize(MAX_WIDTH_IMAGE)
				.jpeg({ quality: 100 })
				.toFile(tempFileFullName);

			this.mainWindow.webContents.send('onAddImageFinally');
		} catch (e) {
			return this.sendError('open(): Ошибка.\n' + e);
		}
	};
}

export const imageManipulator = new ImageManipulator();
