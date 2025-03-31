import * as fs from 'fs';
import path from 'path';
import { Client } from 'basic-ftp';
import dotenv from 'dotenv';
import { BrowserWindow } from 'electron';
import iconv from 'iconv-lite';
import { inferSchema, initParser } from 'udsv';

import { ERROR_CODES, getError } from '../utils/bridgeEvents.js';
import {
	BUCKUP_DIR,
	BUCKUP_SEND_DIR,
	FTP_HOME_DIR,
	FTP_PRICE_FILE_NAME,
	TEMP_DIR,
} from '../utils/constants.js';
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
	private lastBackupPriceFile: string | undefined;
	private lastModPrice: Date | undefined;
	mainWindow: BrowserWindow | undefined;

	private sendError = async (code: keyof typeof ERROR_CODES, e?: unknown) => {
		if (!this.mainWindow) return Promise.reject(getError(101));
		this.mainWindow.webContents.send('error', code, e);
		return Promise.reject(getError(code, e));
	};

	setMainWindow = (mainWindow: BrowserWindow) => (this.mainWindow = mainWindow);

	private cdDir = async (...args: string[]) => {
		if (this.client?.closed || !this.client) return this.sendError(111);

		try {
			const currentDir = await this.client.pwd();
			const isHome = currentDir === FTP_HOME_DIR;

			if (isHome && !args.length) return Promise.resolve();

			const cd = path.join(FTP_HOME_DIR || '/', ...args);

			return await this.client.cd(cd.replaceAll('\\', '/'));
		} catch (e) {
			return this.sendError(112, e);
		}
	};

	connect = async () => {
		try {
			if (!this.client) this.client = new Client();
			if (!this.client.closed) return Promise.resolve();

			if (!FTP_CLIENT_CONFIG.host || !FTP_CLIENT_CONFIG.user || !FTP_CLIENT_CONFIG.password) {
				return Promise.reject(getError(121, FTP_CLIENT_CONFIG));
			}

			await this.client.access(FTP_CLIENT_CONFIG);
			await this.cdDir();

			return Promise.resolve();
		} catch (e) {
			return Promise.reject(getError(122, e));
		}
	};

	getPrice = async () => {
		if (this.client?.closed || !this.client) await this.connect();

		try {
			await this.downloadAndWriteBackup();
			const price = await this.readLastBackup();
			return Promise.resolve({ price, lastMod: this.lastModPrice });
		} catch (e) {
			return Promise.reject(getError(131, e));
		}
	};

	private downloadAndWriteBackup = async () => {
		if (this.client?.closed || !this.client) return Promise.reject(getError(141));

		try {
			await this.cdDir();
			this.lastModPrice = await this.client.lastMod(FTP_PRICE_FILE_NAME);

			if (!this.lastModPrice) return Promise.reject(getError(142));

			this.lastBackupPriceFile = path.join(
				BUCKUP_DIR,
				getPriceBackupFileName(this.lastModPrice),
			);

			if (!fs.existsSync(BUCKUP_DIR)) fs.mkdirSync(BUCKUP_DIR);

			return await this.client.downloadTo(this.lastBackupPriceFile, FTP_PRICE_FILE_NAME);
		} catch (e) {
			return Promise.reject(getError(143, e));
		}
	};

	private readLastBackup = async () => {
		if (!this.lastBackupPriceFile) return Promise.reject(getError(151));

		if (!fs.existsSync(this.lastBackupPriceFile)) return Promise.reject(getError(152));

		try {
			const file = fs.readFileSync(this.lastBackupPriceFile);
			const decodedString = new TextDecoder('windows-1251').decode(file);

			const parser = initParser(inferSchema(decodedString));
			const parsedPrice = parser.typedObjs(decodedString);

			return Promise.resolve(parsedPrice);
		} catch (e) {
			return Promise.reject(getError(153, e));
		}
	};

	sendPrice = async (price: string) => {
		if (this.client?.closed || !this.client) return this.sendError(161);

		if (!price) return this.sendError(162);

		try {
			if (!fs.existsSync(BUCKUP_SEND_DIR)) fs.mkdirSync(BUCKUP_SEND_DIR);

			const priceEncoded = iconv.encode(price, 'windows1251');
			const fullFileName = `${BUCKUP_SEND_DIR}/${FTP_PRICE_FILE_NAME}`;

			fs.writeFile(fullFileName, priceEncoded, (e) => {
				if (e) return this.sendError(163, e);
			});

			await this.cdDir();
			await this.client
				.uploadFrom(fullFileName, FTP_PRICE_FILE_NAME)
				.then(() => {
					if (!this.mainWindow) return;
					this.mainWindow.webContents.send('success', 100);
				})
				.catch((e) => {
					return this.sendError(164, e);
				});
		} catch (e) {
			return this.sendError(165, e);
		}
	};

	uploadImage = async (category_id: string, product_id: string, image_id: string) => {
		if (this.client?.closed || !this.client) return this.sendError(171);

		try {
			await this.cdDir('images');

			await this.client.ensureDir(category_id);
			await this.cdDir('images', category_id);

			await this.client.ensureDir(product_id);
			await this.cdDir('images', category_id, product_id);

			return await this.client.uploadFrom(
				path.join(TEMP_DIR, image_id + '.jpg'),
				image_id + '.jpg',
			);
		} catch (e) {
			return this.sendError(172, e);
		}
	};

	deleteImage = async (category_id: string, product_id: string, image_id: string) => {
		if (this.client?.closed || !this.client) return this.sendError(181);

		try {
			await this.cdDir('images');

			await this.client.ensureDir(category_id);
			await this.cdDir('images', category_id);

			await this.client.ensureDir(product_id);
			await this.cdDir('images', category_id, product_id);

			return await this.client.remove(image_id + '.jpg');
		} catch (e) {
			return this.sendError(182, e);
		}
	};
}

export const ftp = new FTP();
