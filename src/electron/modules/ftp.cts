import { Client } from 'basic-ftp';
import dotenv from 'dotenv';

dotenv.config();

class FTP {
	client: undefined | Client;
	error: undefined | string;
	isConnect: boolean = false;

	connect = async () => {
		console.log('\n[Electron] [FTP] connect()');

		try {
			if (!this.client) this.client = new Client();
			if (!this.client.closed) {
				this.isConnect = true;
				return Promise.resolve();
			}

			await this.client.access({
				host: process.env.FTP_HOST,
				user: process.env.FTP_USER,
				password: process.env.FTP_PASSWORD,
				secure: true,
				port: 21,
				secureOptions: { rejectUnauthorized: false },
			});

			await this.client.cd(process.env.FTP_HOME_DIR || '/');

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
			console.log(await this.client.list());

			return Promise.resolve();

			// eslint-disable-next-line @typescript-eslint/no-unused-vars
		} catch (e: unknown) {
			this.error = '[Electron] [FTP] getPrice(): Ошибка получения прайса.\n' + e;
			return Promise.reject(this.error);
		}
	};
}

export const ftp = new FTP();
