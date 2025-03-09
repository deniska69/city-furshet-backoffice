export type TypePriceCategory = {
	category_id: string;
	category_hide: boolean;
	category_title: string;
	category_description: string;
};

export type TypePriceProduct = {
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

export type TypePriceRow = TypePriceCategory & TypePriceProduct;

export type TypePrice = Array<TypePriceRow>;

export type TypeReturnGetPrice = { price: TypePrice; lastMod: Date };
