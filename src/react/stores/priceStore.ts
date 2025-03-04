import { PRICE_URL } from '@constants';
import { action, makeAutoObservable } from 'mobx';
import { layoutStore } from './layoutStore';

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

	getPrice = async () => {
		this.setLoading();
		this.clearError();
		layoutStore.setLoading();

		fetch(PRICE_URL, { mode: 'no-cors' })
			.then((data) => {
				console.log('[priceStore] getPrice() then:');
				console.log(data);

				// const resDecode = decodeResponse(data);
			})
			.catch((e) => {
				console.log('[priceStore] getPrice() catch:');
				console.log(e);
			})
			.finally(() => {
				setTimeout(() => {
					this.setLoading(false);
					layoutStore.setLoading(false);
				}, 1500);
			});
	};

	//#endregion
}

export const priceStore = makeAutoObservable(new PriceStore());
