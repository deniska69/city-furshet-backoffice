const electron = require('electron');
const axios = require('axios');

const PRICE_URL = 'https://city-furshet.ru/Price.csv';

const getPriceSync = async () => {
	axios
		.get(PRICE_URL, { responseType: 'arraybuffer' })
		.then(({ data }: any) => {
			console.log(data);
		})
		.catch((e: any) => {
			console.log(e);
		});
};

electron.contextBridge.exposeInMainWorld('electron', { getPriceSync });
