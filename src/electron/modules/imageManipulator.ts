import { BrowserWindow, dialog } from 'electron';

class ImageManipulator {
	mainWindow: BrowserWindow | undefined;

	setMainWindow = (mainWindow: BrowserWindow) => (this.mainWindow = mainWindow);

	private sendError = (e: string) => {
		if (!this.mainWindow) return;
		this.mainWindow.webContents.send('error', '[Electron] [ImageManipulator] ' + e);
	};

	open = () => {
		if (!this.mainWindow) return this.sendError('open(): Отсутствует this.mainWindow');

		try {
			const result = dialog.showOpenDialogSync(this.mainWindow, {
				properties: ['openFile'],
				filters: [{ name: 'Изображения', extensions: ['jpg', 'jpeg', 'png', 'heic'] }],
			});

			console.log('');
			console.log('---------------------------------');
			console.log(result);

			return Promise.resolve(result);
		} catch (e) {
			return this.sendError('open(): Ошибка.\n' + e);
		}
	};
}

export const imageManipulator = new ImageManipulator();
