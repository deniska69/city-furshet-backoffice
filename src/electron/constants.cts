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

export const PRICE_FILE_NAME = process.env.PRICE_FILE_NAME || '';

export const PRICE_FULL_NAME = FTP_HOME_DIR + PRICE_FILE_NAME;
