const electron = require('electron');

electron.contextBridge.exposeInMainWorld('electron', {
	connectHosting: () => electron.ipcRenderer.invoke('connectHosting'),
	getPrice: () => electron.ipcRenderer.invoke('getPrice'),
	openBackupdDir: () => electron.ipcRenderer.invoke('openBackupdDir'),
	sendPrice: (price: string) => electron.ipcRenderer.send('sendPrice', price),

	openImage: () => electron.ipcRenderer.invoke('openImage'),
} satisfies Window['electron']);

electron.contextBridge.exposeInMainWorld('electronAPI', {
	onError: (callback) => {
		return electron.ipcRenderer.on('error', (e: any, value: string) => callback(value));
	},
	onSendPriceFinally: (callback) => {
		return electron.ipcRenderer.on('onSendPriceFinally', () => callback());
	},
} satisfies Window['electronAPI']);
