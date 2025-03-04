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

	getPrice = async () => {};

	//#endregion
}

export const priceStore = makeAutoObservable(new PriceStore());
