import dotenv from 'dotenv';
import { contextBridge } from 'electron';

import { ftp } from './ftp.cjs';

dotenv.config();

const connectHosting = async () => ftp.connect();

const getPrice = async () => ftp.getPrice();

contextBridge.exposeInMainWorld('electron', { connectHosting, getPrice });
