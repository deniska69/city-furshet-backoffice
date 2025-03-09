import { action, makeAutoObservable, values } from 'mobx';

import { TypePrice, TypePriceCategory, TypePriceProduct, TypeReturnGetPrice } from '@types';

import { layoutStore } from './layoutStore';

class PriceStore {
	isConnect: boolean = false;
	price: TypePrice | undefined;
	lastMod: Date | undefined;
	categoriesMap: Map<TypePriceCategory['category_id'], TypePriceCategory> | undefined;
	products: Map<TypePriceCategory['category_id'], Array<TypePriceProduct>> | undefined;

	setConnect = action((value: boolean = true) => (this.isConnect = value));

	setError = (e: string) => layoutStore.setError(`[React] [priceStore] ${e}`);

	setPrice = action(async (data?: TypeReturnGetPrice) => {
		this.price = !!data?.lastMod && !!data.price ? data?.price : undefined;
		this.lastMod = data?.lastMod;
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

	addCategory = action((values: TypePriceCategory) => {
		if (!this.categoriesMap) this.categoriesMap = new Map();
		this.categoriesMap.set(values.category_id, values);
	});

	getCategory = (id: TypePriceCategory['category_id']) => {
		if (!this.categoriesMap?.has(id)) return null;
		return this.categoriesMap.get(id);
	};

	getCategories = () => {
		if (!this.categoriesMap) return null;
		return values(this.categoriesMap) as unknown as Array<TypePriceCategory>;
	};
}

export const priceStore = makeAutoObservable(new PriceStore());
