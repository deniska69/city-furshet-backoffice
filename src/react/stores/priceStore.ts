import { PRICE_URL } from '@constants';
import { decodeResponse } from '@helpers';
import { api } from '@services';
import { action, makeAutoObservable } from 'mobx';

class PriceStore {
	//#region Variables & Сhanging variables

	price: string | undefined;
	error: string | undefined;
	loading: boolean = false;

	setLoading = action((value: boolean = true) => {
		this.loading = value;
	});

	setError = action((e: string) => {
		this.error = e;
	});

	clearError = action(() => {
		this.error = undefined;
	});

	exPrice = () => !!this.price;

	//#endregion

	//#region Api actions

	getPriceSync = async () => {
		this.setLoading();
		this.clearError();

		return api
			.get(PRICE_URL, {
				responseType: 'arraybuffer',
				headers: {
					'Access-Control-Allow-Origin': '*',
					'Access-Control-Allow-Credentials': true,
				},
			})
			.then(({ data }) => {
				console.log(data);

				const resDecode = decodeResponse(data);

				console.log(resDecode);

				// writeBackupPrice(resDecode);
				return Promise.resolve(resDecode);
			})
			.catch((e) => {
				console.log('[PriceStore] getPriceSync() catch:', e);
				this.setError('[PriceStore] getPriceSync()');
			})
			.finally(() => this.setLoading(false));
	};

	//#endregion
}

export const priceStore = makeAutoObservable(new PriceStore());
