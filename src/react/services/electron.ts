import { layoutStore } from '@stores';

class Electron {
	connectHosting = async () => await window.electron.connectHosting();

	getPrice = async () => await window.electron.getPrice();

	openBackupdDir = async () => {
		try {
			await window.electron
				.openBackupdDir()
				.catch((e: string) => layoutStore.setError(`[React] [openBackupdDir] #1: ${e}`));
		} catch (e) {
			layoutStore.setError(`[React] [openBackupdDir] #2: ${e}`);
		}
	};

	sendPrice = async (price: string) => await window.electron.sendPrice(price);
}

export const electron = new Electron();
