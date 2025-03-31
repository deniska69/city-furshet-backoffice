const electron = require('electron');

electron.contextBridge.exposeInMainWorld('electron', {
	connectHosting: async () => await electron.ipcRenderer.invoke('connectHosting'),
	getPrice: async () => await electron.ipcRenderer.invoke('getPrice'),
	openBackupdDir: async () => await electron.ipcRenderer.invoke('openBackupdDir'),
	sendPrice: async (price: string) => await electron.ipcRenderer.send('sendPrice', price),
	addImage: async (category_id: string, product_id: string, image_id: string) => {
		return await electron.ipcRenderer.invoke('addImage', category_id, product_id, image_id);
	},
	deleteImage: async (category_id: string, product_id: string, image_id: string) => {
		return electron.ipcRenderer.invoke('deleteImage', category_id, product_id, image_id);
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
