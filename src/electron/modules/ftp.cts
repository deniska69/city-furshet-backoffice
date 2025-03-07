import * as fs from 'fs';
import path from 'path';
import { Client } from 'basic-ftp';

import {
	BUCKUP_DIR,
	FTP_CLIENT_CONFIG,
	FTP_HOME_DIR,
	FTP_PRICE_FULL_NAME,
} from '../utils/constants.cjs';
import { getPriceBackupFileName } from '../utils/utils.cjs';

class FTP {
	client: undefined | Client;
	lastBackPriceFile: string | undefined;

	connect = async () => {
		console.log('\n[Electron] [FTP] connect()');

		try {
			if (!this.client) this.client = new Client();
			if (!this.client.closed) return Promise.resolve();

			await this.client.access(FTP_CLIENT_CONFIG);
			await this.client.cd(FTP_HOME_DIR || '/');

			return Promise.resolve();
		} catch (e) {
			return Promise.reject('[Electron] [FTP] connnect(): Ошибка подключения.\n' + e);
		}
	};

	getPrice = async () => {
		console.log('\n[Electron] [FTP] getPrice()');

		if (this.client?.closed || !this.client) {
			return Promise.reject('[Electron] [FTP] getPrice(): Ошибка подключения.');
		}

		try {
			await this.downloadAndWriteBackup();

			return Promise.resolve();
		} catch (e) {
			return Promise.reject('[Electron] [FTP] getPrice(): Ошибка получения прайса.\n' + e);
		}
	};

	downloadAndWriteBackup = async () => {
		console.log('\n[Electron] [FTP] downloadAndWriteBackup()');

		if (this.client?.closed || !this.client) {
			return Promise.reject('[Electron] [FTP] downloadAndWriteBackup(): Ошибка подключения.');
		}

		try {
			const lastModPrice = await this.client.lastMod(FTP_PRICE_FULL_NAME);

			if (!lastModPrice) {
				return Promise.reject('[Electron] [FTP] downloadAndWriteBackup(): Не найден прайс.');
			}

			this.lastBackPriceFile = path.join(BUCKUP_DIR, getPriceBackupFileName(lastModPrice));

			if (!fs.existsSync(BUCKUP_DIR)) fs.mkdirSync(BUCKUP_DIR);

			return await this.client.downloadTo(this.lastBackPriceFile, FTP_PRICE_FULL_NAME);
		} catch (e) {
			return Promise.reject('[Electron] [FTP] downloadAndWriteBackup(): Ошибка.\n' + e);
		}
	};
}

export const ftp = new FTP();
