import { makeAutoObservable } from 'mobx';

class PriceStore {
	//#region Variables & Сhanging variables

	price: string | undefined;

	isPriceExist = () => !!this.price;
}

export const priceStore = makeAutoObservable(new PriceStore());
