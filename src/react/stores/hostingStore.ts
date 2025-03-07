import { action, makeAutoObservable } from 'mobx';

import { layoutStore } from './layoutStore';

class HostingStore {
	isConnect: boolean = false;
	isPrice: boolean = false;

	setConnect = action((value: boolean = true) => (this.isConnect = value));

	setError = (e: string) => layoutStore.setError(`[React] [HostingStore] ${e}`);

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	setPrice = action((price: unknown) => {
		this.isPrice = true;
	});

	connect = action(async () => {
		layoutStore.setLoading();

		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		await window.electron
			.connectHosting()
			.then(() => this.setConnect())
			.catch((e: string) => {
				console.log(e);
				this.setConnect(false);
				this.setError('connect(): Ошибка подключения к хостингу\n\n' + e);
			})
			.finally(() => layoutStore.setLoading(false));
	});

	getPrice = action(async () => {
		layoutStore.setLoading();

		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		await window.electron
			.getPrice()
			.then((data: unknown) => this.setPrice(data))
			.catch((e: string) => {
				this.setConnect(false);
				this.setError('getPrice(): Ошибка получения прайса\n\n' + e);
			})
			.finally(() => layoutStore.setLoading(false));
	});
}

export const hostingStore = makeAutoObservable(new HostingStore());
