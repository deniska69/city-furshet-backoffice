import { contextBridge, shell } from 'electron';

import { BUCKUP_DIR } from '../utils/constants.cjs';
import { ftp } from './ftp.cjs';

const connectHosting = async () => ftp.connect();

const getPrice = async () => ftp.getPrice();

const openBackupdDir = async () => shell.openPath(BUCKUP_DIR);

const showNotification = async (title: string, body?: string) => {
	new window.Notification(title, { body });
};

contextBridge.exposeInMainWorld('electron', {
	connectHosting,
	getPrice,
	openBackupdDir,
	showNotification,
});
