import { contextBridge } from 'electron';
import { Client } from 'basic-ftp';
import dotenv from 'dotenv';

dotenv.config();

const writeBackupPrice = async () => {
	console.log('[preload.cts] writeBackupPrice()');

	const client = new Client();
	client.ftp.verbose = true;

	try {
		console.log('\n[preload.cts] good 0:');

		await client.access({
			host: process.env.FTP_HOST,
			user: process.env.FTP_USER,
			password: process.env.FTP_PASSWORD,
			secure: true,
			port: 21,
			secureOptions: { rejectUnauthorized: false },
		});

		console.log('\n[preload.cts] good 1:');
		console.log(await client.list());

		await client.uploadFrom('README.md', 'README_FTP.md');
		await client.downloadTo('README_COPY.md', 'README_FTP.md');

		console.log('\n[preload.cts] good 2:');
	} catch (err) {
		console.error('\n[preload.cts] error:');
		console.log(err);
	}

	client.close();
};

contextBridge.exposeInMainWorld('electron', { writeBackupPrice });
