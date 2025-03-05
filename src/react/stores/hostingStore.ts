import { action, makeAutoObservable } from 'mobx';
import { layoutStore } from './layoutStore';

class HostingStore {
	isConnect: boolean = false;

	connect = action(async () => {
		layoutStore.setLoading();

		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		await window.electron
			.connectHosting()
			.then(() => this.setConnect())
			.catch(() => {
				this.setConnect(false);
				layoutStore.setError('Ошибка подключеия к хостингу');
			})
			.finally(() => layoutStore.setLoading(false));
	});

	setConnect = action((value: boolean = true) => {
		this.isConnect = value;
	});
}

export const hostingStore = makeAutoObservable(new HostingStore());
