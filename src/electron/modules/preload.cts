import { contextBridge, shell } from 'electron';

import { BUCKUP_DIR } from '../utils/constants.cjs';
import { ftp } from './ftp.cjs';

const connectHosting = async () => ftp.connect();

const getPrice = async () => ftp.getPrice();

const openBackupdDir = () => shell.openPath(BUCKUP_DIR);

contextBridge.exposeInMainWorld('electron', { connectHosting, getPrice, openBackupdDir });
