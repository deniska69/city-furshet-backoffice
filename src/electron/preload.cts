import { contextBridge } from 'electron';
import dotenv from 'dotenv';
import { ftp } from './modules/ftp.cjs';

dotenv.config();

const connectHosting = async () => ftp.connect();

contextBridge.exposeInMainWorld('electron', { connectHosting });
