import { layoutStore } from '@stores';

class Electron {
	connectHosting = async () => {
		return Promise.reject('Временно отключен метод connectHosting');

		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		return await window.electron.connectHosting();
	};

	getPrice = async () => {
		return Promise.reject('Временно отключен метод getPrice');

		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		return await window.electron.getPrice();
	};

	openBackupdDir = async () => {
		return Promise.reject('Временно отключен метод openBackupdDir');

		try {
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-ignore
			await window.electron
				.openBackupdDir()
				.catch((e: string) =>
					layoutStore.setError(`[React] [openBackupdDir] #1: ${e}`),
				);
		} catch (e) {
			layoutStore.setError(`[React] [openBackupdDir] #2: ${e}`);
		}
	};

	showNotification = async (title: string, body?: string) => {
		return Promise.reject('Временно отключен метод showNotification');

		try {
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-ignore
			await window.electron
				.showNotification(title, body)
				.catch((e: string) =>
					layoutStore.setError(`[React] [showNotification] #1: ${e}`),
				);
		} catch (e) {
			layoutStore.setError(`[React] [showNotification] #2: ${e}`);
		}
	};
}

export const electron = new Electron();
