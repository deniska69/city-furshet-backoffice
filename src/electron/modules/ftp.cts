import { Client } from 'basic-ftp';

import { FTP_CLIENT_CONFIG, FTP_HOME_DIR, PRICE_FULL_NAME } from '../constants.cjs';
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

			// eslint-disable-next-line @typescript-eslint/no-unused-vars
		} catch (e: unknown) {
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
			const lastModPrice = await this.client.lastMod(PRICE_FULL_NAME);

			if (!lastModPrice) {
				this.error = '[Electron] [FTP] getPrice(): Не найден прайс.';
				return Promise.reject(this.error);
			}

			const fileName = getPriceBackupFileName(lastModPrice);

			console.log({ fileName });

			// const currDir = await this.client.pwd();

			// console.log('---------------');
			// console.log(await this.client.list());
			// console.log('---------------');
			// console.log({ FTP_HOME_DIR });
			// console.log({ currDir });
			// console.log({ PRICE_FULL_NAME });
			// console.log({ lastModPrice });
			// console.log('---------------');

			return Promise.resolve();

			// eslint-disable-next-line @typescript-eslint/no-unused-vars
		} catch (e: unknown) {
			this.error = '[Electron] [FTP] getPrice(): Ошибка получения прайса.\n' + e;
			return Promise.reject(this.error);
		}
	};
}

export const ftp = new FTP();
