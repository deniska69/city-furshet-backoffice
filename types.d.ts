type TypePriceCategory = {
	category_id: string;
	category_hide: boolean;
	category_title: string;
	category_description: string;
};

type TypePriceProduct = {
	product_id: string;
	product_hide: boolean;
	product_title: string;
	product_description: string;
	product_note: string;
	product_price: string;
	product_cover: string;
	product_gallery: string;
};

type TypePriceModel = TypePriceCategory & TypePriceProduct;

interface Window {
	electron: {
		connectHosting: () => Promise<unknown>;
		getPrice: () => Promise<TypeReturnGetPrice>;
		openBackupdDir: () => Promise<unknown>;
		sendPrice: (price: string) => Promise<unknown>;
		addImage: (category_id: string, product_id: string, image_id: string) => Promise<unknown>;
		rotateAndSaveImage: (
			angle: number,
			categoryId: string,
			productId: string,
			imageId: string,
			newImageId: string,
		) => Promise<unknown>;
		deleteImage: (category_id: string, product_id: string, image_id: string) => Promise<unknown>;
		allowClose: () => Promise<unknown>;
	};
	electronAPI: {
		onError: (callback: (code: number, error?: unknown) => void) => Promise<unknown>;
		onSuccess: (callback: (code: number) => void) => Promise<unknown>;
		onWillClose: (callback: () => void) => Promise<unknown>;
	};
}

type TypePriceRow = TypePriceCategory & TypePriceProduct;

type TypePrice = Array<TypePriceRow>;

type TypeReturnGetPrice = { price: TypePrice; lastMod: Date };

type TypePriceStoreCategory =
	| (TypePriceCategory & {
			index: number;
			first: boolean;
			last: boolean;
	  })
	| null;

type TypeHandleValidateCategory = 'category_title' | 'category_description';

interface IFormsProductEditContainer {
	categoryId?: string;
	productId?: string;
	onClose: () => void;
}

type TypeHandleValidateProduct =
	| 'product_title'
	| 'product_description'
	| 'product_note'
	| 'product_price';

declare module 'heic-convert';
