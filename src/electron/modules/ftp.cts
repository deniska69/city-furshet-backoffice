import * as fs from 'fs';
import path from 'path';
import { Client } from 'basic-ftp';
import * as iconv from 'iconv-lite';
import * as Papa from 'papaparse';

import {
	BUCKUP_DIR,
	FTP_CLIENT_CONFIG,
	FTP_HOME_DIR,
	FTP_PRICE_FILE_NAME,
} from '../utils/constants.cjs';
import { TypePriceModel } from '../utils/types.cjs';
import { getPriceBackupFileName } from '../utils/utils.cjs';

class FTP {
	client: undefined | Client;
	lastBackPriceFile: string | undefined;
	lastModPrice: Date | undefined;

	connect = async () => {
		console.log('[Electron] [FTP] connect()');

		try {
			if (!this.client) this.client = new Client();
			if (!this.client.closed) return Promise.resolve();

			await this.client.access(FTP_CLIENT_CONFIG);
			await this.client.cd(FTP_HOME_DIR || '/');

			return Promise.resolve();
		} catch (e) {
			return Promise.reject('[Electron] [FTP] connnect(): Ошибка.\n' + e);
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

	downloadAndWriteBackup = async () => {
		console.log('[Electron] [FTP] downloadAndWriteBackup()');

		if (this.client?.closed || !this.client) {
			return Promise.reject(
				'[Electron] [FTP] downloadAndWriteBackup(): Ошибка подключения.',
			);
		}

		try {
			this.lastModPrice = await this.client.lastMod(FTP_PRICE_FILE_NAME);

			if (!this.lastModPrice) {
				return Promise.reject(
					'[Electron] [FTP] downloadAndWriteBackup(): Не найден прайс на хостинге.',
				);
			}

			this.lastBackPriceFile = path.join(
				BUCKUP_DIR,
				getPriceBackupFileName(this.lastModPrice),
			);

			if (!fs.existsSync(BUCKUP_DIR)) fs.mkdirSync(BUCKUP_DIR);

			return await this.client.downloadTo(
				this.lastBackPriceFile,
				FTP_PRICE_FILE_NAME,
			);
		} catch (e) {
			return Promise.reject(
				'[Electron] [FTP] downloadAndWriteBackup(): Ошибка.\n' + e,
			);
		}
	};

	readLastBackup = async () => {
		console.log('[Electron] [FTP] readLastBackup()');

		if (!this.lastBackPriceFile) {
			return Promise.reject(
				'[Electron] [FTP] readLastBackup(): Не найдена запись о последнм бэкапе прайса.',
			);
		}

		if (!fs.existsSync(this.lastBackPriceFile)) {
			return Promise.reject(
				'[Electron] [FTP] readLastBackup(): Не найден файл бэкапа прайса.',
			);
		}

		try {
			const buffer = fs.readFileSync(this.lastBackPriceFile);

			let dataString = iconv.decode(buffer, 'windows-1251');

			const parsedOutput: Papa.ParseResult<TypePriceModel> = Papa.parse(
				dataString,
				{
					header: true,
				},
			);

			const price = parsedOutput.data.filter((el) => !!el.category_id);

			return Promise.resolve(price);
		} catch (e) {
			return Promise.reject(
				'[Electron] [FTP] readLastBackup(): Ошибка.\n' + e,
			);
		}
	};
}

export const ftp = new FTP();
