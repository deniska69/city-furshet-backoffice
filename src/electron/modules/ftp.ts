import * as fs from 'fs';
import path from 'path';
import { Client } from 'basic-ftp';
import dotenv from 'dotenv';
import * as iconv from 'iconv-lite';
import * as Papa from 'papaparse';

import { BUCKUP_DIR, FTP_HOME_DIR, FTP_PRICE_FILE_NAME } from '../utils/constants.js';
import { getPriceBackupFileName, isDev } from '../utils/helpers.js';

dotenv.config({
	path: isDev() ? path.resolve(process.cwd(), '.env') : path.join(process.resourcesPath, '.env'),
});

const FTP_CLIENT_CONFIG = {
	host: process.env.FTP_HOST || '',
	user: process.env.FTP_USER || '',
	password: process.env.FTP_PASSWORD || '',
	secure: true,
	port: 21,
	secureOptions: { rejectUnauthorized: false },
};

class FTP {
	private client: undefined | Client;
	private lastBackPriceFile: string | undefined;
	private lastModPrice: Date | undefined;

	connect = async () => {
		console.log('[Electron] [FTP] connect()');

		try {
			if (!this.client) this.client = new Client();
			if (!this.client.closed) return Promise.resolve();

			if (!FTP_CLIENT_CONFIG.host || !FTP_CLIENT_CONFIG.user || !FTP_CLIENT_CONFIG.password) {
				return Promise.reject(
					'[Electron] [FTP] connnect(): Ошибка учётных данных для подключения к хостингу.\n\n' +
						JSON.stringify(FTP_CLIENT_CONFIG),
				);
			}

			await this.client.access(FTP_CLIENT_CONFIG);
			await this.client.cd(FTP_HOME_DIR || '/');

			return Promise.resolve();
		} catch (e) {
			return Promise.reject(
				'[Electron] [FTP] connnect(): Ошибка.\n\n' + e + '\n\n' + JSON.stringify(e),
			);
		}
	};

	getPrice = async () => {
		console.log('[Electron] [FTP] getPrice()');

		if (this.client?.closed || !this.client) await this.connect();

		try {
			await this.downloadAndWriteBackup();

			const price = await this.readLastBackup();

			return Promise.resolve({ price, lastMod: this.lastModPrice });
		} catch (e) {
			return Promise.reject('[Electron] [FTP] getPrice(): Ошибка.\n' + e);
		}
	};

	private downloadAndWriteBackup = async () => {
		console.log('[Electron] [FTP] downloadAndWriteBackup()');

		if (this.client?.closed || !this.client) {
			return Promise.reject('[Electron] [FTP] downloadAndWriteBackup(): Ошибка подключения.');
		}

		try {
			this.lastModPrice = await this.client.lastMod(FTP_PRICE_FILE_NAME);

			if (!this.lastModPrice) {
				return Promise.reject(
					'[Electron] [FTP] downloadAndWriteBackup(): Не найден прайс на хостинге.',
				);
			}

			this.lastBackPriceFile = path.join(BUCKUP_DIR, getPriceBackupFileName(this.lastModPrice));

			if (!fs.existsSync(BUCKUP_DIR)) fs.mkdirSync(BUCKUP_DIR);

			return await this.client.downloadTo(this.lastBackPriceFile, FTP_PRICE_FILE_NAME);
		} catch (e) {
			return Promise.reject('[Electron] [FTP] downloadAndWriteBackup(): Ошибка.\n' + e);
		}
	};

	private readLastBackup = async () => {
		console.log('[Electron] [FTP] readLastBackup()');

		if (!this.lastBackPriceFile) {
			return Promise.reject(
				'[Electron] [FTP] readLastBackup(): Не найдена запись о последнм бэкапе прайса.',
			);
		}

		if (!fs.existsSync(this.lastBackPriceFile)) {
			return Promise.reject('[Electron] [FTP] readLastBackup(): Не найден файл бэкапа прайса.');
		}

		try {
			const buffer = fs.readFileSync(this.lastBackPriceFile);
			const dataString = iconv.decode(buffer, 'windows-1251');

			const parsedOutput: Papa.ParseResult<TypePriceModel> = Papa.parse(dataString, {
				header: true,
			});

			const price = parsedOutput.data.filter((el) => !!el.category_id);

			return Promise.resolve(price);
		} catch (e) {
			return Promise.reject('[Electron] [FTP] readLastBackup(): Ошибка.\n' + e);
		}
	};
}

export const ftp = new FTP();
