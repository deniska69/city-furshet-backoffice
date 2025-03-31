import { action, makeAutoObservable, toJS } from 'mobx';

import { isHide } from '@helpers';
import { electron } from '@services';

import { layoutStore } from './layoutStore';

class PriceStore {
	//#region Variables & Сhanging variables

	isConnect: boolean = false;
	price: TypePrice | undefined;
	lastMod: Date | undefined;
	categories: TypePriceCategory[] | undefined;
	products: Map<string, TypePriceProduct[]> | undefined;

	setConnect = action((value: boolean = true) => (this.isConnect = value));

	setError = (method: string, e?: unknown) => {
		const text = `[React] [priceStore] ${method}():${e}`.replaceAll(':', ':\n');
		layoutStore.setError(text);
	};

	//#endregion

	//#region Price

	setPrice = action(async (data?: TypeReturnGetPrice) => {
		this.price = data?.lastMod && data.price.length ? data?.price : undefined;
		this.lastMod = data?.lastMod;

		if (this.price) {
			const mapPrice = new Map();

			this.categories = [];

			this.price.forEach((item) => {
				const { category_id, category_hide, category_title, category_description } = item;

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

				this.addProduct(category_id, {
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

	savePrice = async () => {
		if (!this.categories || !this.products) {
			return this.setError(
				'savePrice(): Отсутствует priceStore.categories или priceStore.products.',
			);
		}

		layoutStore.setLoading();

		try {
			let price = `category_id;category_hide;category_title;category_description;product_id;product_hide;product_title;product_title_description;roduct_description;product_note;product_price;product_cover;product_gallery;\n`;

			this.categories.forEach((cat) => {
				const prods =
					(priceStore.products?.has(cat.category_id) &&
						priceStore.products.get(cat.category_id)) ||
					[];

				prods.forEach((prod) => {
					const s = `${cat.category_id};${isHide(cat.category_hide) ? 'true' : ''};${cat.category_title || ''};${cat.category_description || ''};${prod.product_id};${isHide(prod.product_hide) ? 'true' : ''};${prod.product_title || ''};${prod.product_title_description || ''};${prod.product_description || ''};${prod.product_note || ''};${prod.product_price || ''};${prod.product_cover || ''};${prod.product_gallery || ''};`;

					price += s + '\n';
				});
			});

			await electron.sendPrice(price);
		} catch (e) {
			layoutStore.setLoading(false);
			this.setError('savePrice(): Ошибка формирования прайса.\n' + e);
		}
	};

	onSendPriceFinally = () => {
		layoutStore.setLoading(false);
		layoutStore.alert(
			'Прайс успешно обновлён на хостинге!',
			[
				{
					title: 'ОК',
					onClick: this.getPrice,
				},
			],
			'success',
		);
	};

	onAddImageFinally = () => {
		layoutStore.setLoading(false);
		layoutStore.alert(
			'Изображение успешно добавлено! Не забудьте сохранить прайс',
			[
				{
					title: 'ОК',
				},
			],
			'success',
		);
	};

	//#endregion

	//#region Categories

	getCategory = (id?: string): TypePriceStoreCategory => {
		if (!id || !this.categories) return null;

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

	addCategory = action((values: TypePriceCategory) => {
		if (!Array.isArray(this.categories)) this.categories = [];
		this.categories.push(values);
	});

	deleteCategory = action((index: number) => {
		if (!Array.isArray(this.categories)) this.categories = [];
		this.categories = toJS(this.categories).filter((el, i) => i !== index && el);
	});

	changeCategoriesPosition = action((index: number, direction: 'up' | 'down') => {
		if (!this.categories || this.categories?.length < 2) return;
		if (direction === 'up' && index === 0) return;
		if (direction === 'down' && index + 1 === this.categories?.length) return;

		const arr: TypePriceCategory[] = toJS(this.categories);

		const from = index;
		const to = direction === 'up' ? index - 1 : index + 1;

		[arr[from], arr[to]] = [arr[to], arr[from]];

		this.categories = arr;
	});

	saveCategory = action((index: number, values: TypePriceCategory) => {
		if (!Array.isArray(this.categories)) this.categories = [];
		this.categories = toJS(this.categories).map((el, i) => (index === i ? values : el));
	});

	//#endregion

	//#region Products

	getProducts = (category_id?: string) => {
		if (!category_id) return null;
		return this.products?.get(category_id);
	};

	getProduct = (category_id: string, product_id: string) => {
		const items = this.getProducts(category_id);
		if (!items) return undefined;
		const item = items
			.map(
				(el, index) =>
					el.product_id === product_id && {
						...el,
						index,
						first: index === 0,
						last: index + 1 === items.length,
					},
			)
			.filter((el) => el)[0];
		return item || undefined;
	};

	addProduct = action((category_id: string, item: TypePriceProduct) => {
		if (!this.products) this.products = new Map();

		if (!this.products?.has(category_id)) {
			this.products?.set(category_id, [item]);
		} else {
			const items = toJS(this.products.get(category_id));
			this.products.set(category_id, [...(items || []), item]);
		}
	});

	saveProduct = action((category_id: string, item: TypePriceProduct) => {
		if (!this.products) this.products = new Map();
		if (!this.products.get(category_id)) this.products.set(category_id, [item]);

		const items = toJS(this.products.get(category_id)) || [];
		const itemsUpdated = items.map((el) => (el.product_id === item.product_id ? item : el));

		this.products.set(category_id, itemsUpdated);
	});

	changeProductPosition = action(
		(category_id: string, index: number, direction: 'up' | 'down') => {
			if (!this.products || !this.products.has(category_id)) return;
			if (direction === 'up' && index === 0) return;
			if (direction === 'down' && index + 1 === this.products.get(category_id)?.length) return;

			const arr: TypePriceProduct[] = toJS(this.products.get(category_id)) || [];

			const from = index;
			const to = direction === 'up' ? index - 1 : index + 1;

			[arr[from], arr[to]] = [arr[to], arr[from]];

			this.products.set(category_id, arr);
		},
	);

	deleteProduct = action((category_id: string, product_id: string) => {
		if (!this.products || !this.products.has(category_id)) return;

		const items = toJS(this.products.get(category_id)) || [];
		const itemsUpdated = items.filter((el) => el.product_id !== product_id && el);

		this.products.set(category_id, itemsUpdated);
	});

	//#endregion

	//#region Electron

	connect = async () => {
		layoutStore.setLoading();

		await window.electron
			.connectHosting()
			.then(() => this.setConnect())
			.catch(() => this.setConnect(false))
			.finally(() => layoutStore.setLoading(false));
	};

	getPrice = async () => {
		this.price = undefined;
		this.lastMod = undefined;
		this.categories = undefined;
		this.products = undefined;

		layoutStore.setLoading();

		await window.electron
			.getPrice()
			.then((data: TypeReturnGetPrice) => this.setPrice(data))
			.catch((e) => {
				this.setPrice();
				this.setConnect(false);
				this.setError('getPrice', e?.message);
			})
			.finally(() => layoutStore.setLoading(false));
	};

	//#endregion
}

export const priceStore = makeAutoObservable(new PriceStore());
