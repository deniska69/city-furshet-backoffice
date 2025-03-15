type TypePriceCategory = {
	category_id: string;
	category_hide: string;
	category_title: string;
	category_description: string;
};

type TypePriceProduct = {
	product_id: string;
	product_hide: string;
	product_title: string;
	product_title_description: string;
	product_description: string;
	product_note: string;
	product_price: string;
	product_cover: string;
	product_gallery: string;
};

type TypePriceModel = TypePriceCategory & TypePriceProduct;
