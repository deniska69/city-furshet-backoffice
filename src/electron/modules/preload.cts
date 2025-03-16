const electron = require('electron');

// import { contextBridge, shell } from 'electron';

// import { BUCKUP_DIR, ftp } from './ftp.cjs';

// const connectHosting = async () => ftp.connect();

// const getPrice = async () => ftp.getPrice();

// const openBackupdDir = async () => shell.openPath(BUCKUP_DIR);

// const showNotification = async (title: string, body?: string) => {
// 	new window.Notification(title, { body });
// };

electron.contextBridge.exposeInMainWorld('electron', {
	// connectHosting,
	// getPrice,
	// openBackupdDir,
	// showNotification,
});
