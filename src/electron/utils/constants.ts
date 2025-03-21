import path from 'path';

export const PORT = 5123;
export const URL = 'http://localhost:';
export const PROJECT_TITLE = 'City Furshet Backoffice';

export const BUCKUP_DIR = path.join(process.env.APPDATA || '', PROJECT_TITLE, 'Backups');

export const FTP_HOME_DIR = 'city-furshet.ru/htdocs/www/';

export const FTP_PRICE_FILE_NAME = 'Price_v2.csv';
