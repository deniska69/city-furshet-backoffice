import { action, makeAutoObservable, toJS } from 'mobx';

import {
	TypePrice,
	TypePriceCategory,
	TypePriceProduct,
	TypePriceStoreCategory,
	TypeReturnGetPrice,
} from '@types';

import { layoutStore } from './layoutStore';

class PriceStore {
	isConnect: boolean = false;
	price: TypePrice | undefined;
	lastMod: Date | undefined;
	categories: TypePriceCategory[] | undefined;
	products: Map<string, TypePriceProduct[]> | undefined;

	setConnect = action((value: boolean = true) => (this.isConnect = value));

	setError = (e: string) => layoutStore.setError(`[React] [priceStore] ${e}`);

	setPrice = action(async (data?: TypeReturnGetPrice) => {
		this.price = data?.lastMod && data.price.length ? data?.price : undefined;
		this.lastMod = data?.lastMod;

		if (this.price) {
			const mapPrice = new Map();

			this.categories = [];

			this.price.forEach((item) => {
				const {
					category_id,
					category_hide,
					category_title,
					category_description,
				} = item;

				mapPrice.set(category_id, {
					category_id,
					category_hide,
					category_title,
					category_description,
				});

				const {
					product_id,
					product_hide,
					product_title,
					product_title_description,
					product_description,
					product_note,
					product_price,
					product_cover,
					product_gallery,
				} = item;

				this.setProduct(category_id, {
					product_id,
					product_hide,
					product_title,
					product_title_description,
					product_description,
					product_note,
					product_price,
					product_cover,
					product_gallery,
				});
			});

			this.categories = [...mapPrice.values()];
		}

		return Promise.resolve();
	});

	setProduct = action((category_id: string, item: TypePriceProduct) => {
		if (!this.products) this.products = new Map();

		if (!this.products?.has(category_id)) {
			this.products?.set(category_id, [item]);
		} else {
			const items = toJS(this.products.get(category_id));
			this.products.set(category_id, [...(items || []), item]);
		}
	});

	getProducts = (category_id: string) => this.products?.get(category_id);

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
		if (!Array.isArray(this.categories)) this.categories = [];
		this.categories.push(values);
	});

	deleteCategory = action((index: number) => {
		if (!Array.isArray(this.categories)) this.categories = [];
		this.categories = toJS(this.categories).filter(
			(el, i) => i !== index && el,
		);
	});

	saveCategory = action((index: number, values: TypePriceCategory) => {
		if (!Array.isArray(this.categories)) this.categories = [];
		this.categories = toJS(this.categories).map((el, i) =>
			index === i ? values : el,
		);
	});

	getCategory = (id: string): TypePriceStoreCategory => {
		if (!this.categories) return null;

		const item = this.categories
			.map(
				(el, index) =>
					el.category_id === id && {
						...el,
						index,
						first: index === 0,
						last: index + 1 === this.categories?.length,
					},
			)
			.filter((el) => el)[0];

		return item || null;
	};

	changeCategoriesPosition = action(
		(index: number, direction: 'up' | 'down') => {
			if (!this.categories || this.categories?.length < 2) return;
			if (direction === 'up' && index === 0) return;
			if (direction === 'down' && index + 1 === this.categories?.length)
				return;

			const arr: TypePriceCategory[] = toJS(this.categories);

			const from = index;
			const to = direction === 'up' ? index - 1 : index + 1;

			[arr[from], arr[to]] = [arr[to], arr[from]];

			this.categories = arr;
		},
	);
}

export const priceStore = makeAutoObservable(new PriceStore());
