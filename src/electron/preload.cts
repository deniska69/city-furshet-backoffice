import { contextBridge } from 'electron';

const writeBackupPrice = () => {
	console.log('[preload.cts] writeBackupPrice()');
};

contextBridge.exposeInMainWorld('electron', { writeBackupPrice });
