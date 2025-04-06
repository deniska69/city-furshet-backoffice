const electron = require('electron');

electron.contextBridge.exposeInMainWorld('electron', {
	connectHosting: async () => await electron.ipcRenderer.invoke('connectHosting'),
	getPrice: async () => await electron.ipcRenderer.invoke('getPrice'),
	openBackupdDir: async () => await electron.ipcRenderer.invoke('openBackupdDir'),
	sendPrice: async (price: string) => await electron.ipcRenderer.send('sendPrice', price),
	addImage: async (categoryId: string, productId: string, imageId: string) => {
		return await electron.ipcRenderer.invoke('addImage', categoryId, productId, imageId);
	},
	rotateAndSaveImage: async (
		angle: number,
		categoryId: string,
		productId: string,
		imageId: string,
		newImageId: string,
	) => {
		return await electron.ipcRenderer.invoke(
			'rotateAndSaveImage',
			angle,
			categoryId,
			productId,
			imageId,
			newImageId,
		);
	},
	deleteImage: async (categoryId: string, productId: string, imageId: string) => {
		return electron.ipcRenderer.invoke('deleteImage', categoryId, productId, imageId);
	},
} satisfies Window['electron']);

electron.contextBridge.exposeInMainWorld('electronAPI', {
	onError: (callback) => {
		return electron.ipcRenderer.on('error', (e: any, code: number, error?: unknown) =>
			callback(code, error),
		);
	},
	onSuccess: (callback) => {
		return electron.ipcRenderer.on('success', (e: any, code: number) => callback(code));
	},
} satisfies Window['electronAPI']);
