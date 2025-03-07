import { contextBridge } from 'electron';

import { ftp } from './ftp.cjs';

const connectHosting = async () => ftp.connect();

const getPrice = async () => ftp.getPrice();

contextBridge.exposeInMainWorld('electron', { connectHosting, getPrice });
