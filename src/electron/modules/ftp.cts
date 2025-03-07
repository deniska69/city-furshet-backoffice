import * as fs from 'fs';
import path from 'path';
import { Client } from 'basic-ftp';

import { BUCKUP_DIR, FTP_CLIENT_CONFIG, FTP_HOME_DIR, FTP_PRICE_FULL_NAME } from '../constants.cjs';
import { getPriceBackupFileName } from '../utils.cjs';

class FTP {
	client: undefined | Client;
	error: undefined | string;
	isConnect: boolean = false;
	lastModPrice: undefined | string;

	connect = async () => {
		console.log('\n[Electron] [FTP] connect()');

		try {
			if (!this.client) this.client = new Client();
			if (!this.client.closed) {
				this.isConnect = true;
				return Promise.resolve();
			}

			await this.client.access(FTP_CLIENT_CONFIG);
			await this.client.cd(FTP_HOME_DIR || '/');

			this.isConnect = !this.client.closed;
			return Promise.resolve();
		} catch (e) {
			this.error = '[Electron] [FTP] connnect(): Ошибка подключения.\n' + e;
			return Promise.reject(this.error);
		}
	};

	getPrice = async () => {
		console.log('\n[Electron] [FTP] getPrice()');

		if (this.client?.closed || !this.client) {
			this.error = '[Electron] [FTP] getPrice(): Ошибка подключения.';
			return Promise.reject(this.error);
		}

		try {
			await this.downloadAndWriteBackup();

			return Promise.resolve();
		} catch (e) {
			this.error = '[Electron] [FTP] getPrice(): Ошибка получения прайса.\n' + e;
			return Promise.reject(this.error);
		}
	};

	downloadAndWriteBackup = async () => {
		console.log('\n[Electron] [FTP] downloadAndWriteBackup()');

		if (this.client?.closed || !this.client) {
			this.error = '[Electron] [FTP] downloadAndWriteBackup(): Ошибка подключения.';
			return Promise.reject(this.error);
		}

		try {
			const lastModPrice = await this.client.lastMod(FTP_PRICE_FULL_NAME);

			if (!lastModPrice) {
				this.error = '[Electron] [FTP] downloadAndWriteBackup(): Не найден прайс.';
				return Promise.reject(this.error);
			}

			const priceBackupFullname = path.join(BUCKUP_DIR, getPriceBackupFileName(lastModPrice));

			if (!fs.existsSync(BUCKUP_DIR)) fs.mkdirSync(BUCKUP_DIR);

			return await this.client.downloadTo(priceBackupFullname, FTP_PRICE_FULL_NAME);
		} catch (e) {
			this.error = '[Electron] [FTP] downloadAndWriteBackup(): Ошибка.\n' + e;
			return Promise.reject(this.error);
		}
	};
}

export const ftp = new FTP();
