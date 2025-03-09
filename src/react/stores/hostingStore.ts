import { action, makeAutoObservable } from 'mobx';

import { TypePrice, TypePriceCategory, TypePriceProduct, TypeReturnGetPrice } from '@types';

import { layoutStore } from './layoutStore';

class HostingStore {
	isConnect: boolean = false;
	isPrice: boolean = false;
	price: TypePrice | undefined;
	lastMod: Date | undefined;
	categories: Array<TypePriceCategory> | undefined;
	products: Map<TypePriceCategory['category_id'], Array<TypePriceProduct>> | undefined;

	setConnect = action((value: boolean = true) => (this.isConnect = value));

	setError = (e: string) => layoutStore.setError(`[React] [HostingStore] ${e}`);

	setPrice = action(async (data?: TypeReturnGetPrice) => {
		this.price = data?.price;
		this.lastMod = data?.lastMod;
		this.isPrice = !!data?.lastMod && !!data.price;
		return Promise.resolve();
	});

	connect = action(async () => {
		layoutStore.setLoading();

		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		await window.electron
			.connectHosting()
			.then(() => this.setConnect())
			.catch((e: string) => {
				this.setConnect(false);
				this.setError('connect(): Ошибка подключения к хостингу.\n' + e);
			})
			.finally(() => layoutStore.setLoading(false));
	});

	getPrice = action(async () => {
		layoutStore.setLoading();

		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		await window.electron
			.getPrice()
			.then(async (data: TypeReturnGetPrice) => await this.setPrice(data))
			.catch((e: string) => {
				this.setPrice();
				this.setConnect(false);
				this.setError('getPrice(): Ошибка получения прайса.\n' + e);
			})
			.finally(() => layoutStore.setLoading(false));
	});
}

export const hostingStore = makeAutoObservable(new HostingStore());
