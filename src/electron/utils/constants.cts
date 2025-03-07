import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

export const PORT = process.env.PORT_LOCAL_DEV_SERVER_REACT || '';
export const URL = process.env.URL_LOCAL_DEV_SERVER_REACT || '';
export const PROJECT_TITLE = process.env.PROJECT_TITLE || '';

export const FTP_HOME_DIR = process.env.FTP_HOME_DIR || '';
export const FTP_CLIENT_CONFIG = {
	host: process.env.FTP_HOST || '',
	user: process.env.FTP_USER || '',
	password: process.env.FTP_PASSWORD || '',
	secure: true,
	port: 21,
	secureOptions: { rejectUnauthorized: false },
};

export const FTP_PRICE_FILE_NAME = process.env.FTP_PRICE_FILE_NAME || '';
export const FTP_PRICE_FULL_NAME = FTP_HOME_DIR + FTP_PRICE_FILE_NAME;
export const BUCKUP_DIR = path.join(process.env.APPDATA || '', PROJECT_TITLE, 'Backups');
