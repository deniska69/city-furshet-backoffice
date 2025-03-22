const electron = require('electron');

electron.contextBridge.exposeInMainWorld('electron', {
	connectHosting: () => electron.ipcRenderer.invoke('connectHosting'),
	getPrice: () => electron.ipcRenderer.invoke('getPrice'),
	openBackupdDir: () => electron.ipcRenderer.invoke('openBackupdDir'),
	sendPrice: (price: string) => electron.ipcRenderer.send('sendPrice', price),
} satisfies Window['electron']);
