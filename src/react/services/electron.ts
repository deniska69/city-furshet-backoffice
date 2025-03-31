import { layoutStore } from '@stores';

class Electron {
	sendPrice = async (price: string) => await window.electron.sendPrice(price);

	addImage = async (category_id: string, product_id: string, image_id: string) => {
		return await window.electron.addImage(category_id, product_id, image_id);
	};

	deleteImage = async (category_id: string, product_id: string, image_id: string) => {
		layoutStore.setLoading();
		return await window.electron.deleteImage(category_id, product_id, image_id);
	};
}

export const electron = new Electron();
