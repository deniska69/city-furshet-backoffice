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
	product_title_description: string;
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

		openImage: () => Promise<unknown>;
	};
	electronAPI: {
		onError: (callback: (e: string) => void) => Promise<unknown>;
		onSendPriceFinally: (callback: () => void) => Promise<unknown>;
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

declare module 'heic-convert';
