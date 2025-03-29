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

	openImage = async (category_id: string, product_id: string) => {
		layoutStore.setLoading();
		await window.electron.openImage(category_id, product_id);
	};
}

export const electron = new Electron();
