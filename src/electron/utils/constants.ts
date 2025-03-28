import path from 'path';

export const PORT = 5123;
export const URL = 'http://localhost:';
export const PROJECT_TITLE = 'City Furshet Backoffice';

export const BUCKUP_DIR = path.join(process.env.APPDATA || '', PROJECT_TITLE, 'Backups');
export const BUCKUP_SEND_DIR = path.join(process.env.APPDATA || '', PROJECT_TITLE, 'Backups_Send');

export const FTP_HOME_DIR = 'city-furshet.ru/htdocs/www/';
export const FTP_PRICE_FILE_NAME = 'Price_v2.csv';

export const ALLOWED_IMAGE_EXTENSIONS = ['jpg', 'jpeg', 'png', 'heic'];
export const TEMP_DIR = path.join(process.env.APPDATA || '', PROJECT_TITLE, 'Temp');
export const TEMP_IMAGE_FILE_NAME = 'Temp.jpg';
