import { action, makeAutoObservable } from 'mobx';

type TypeAlertButtons = {
	title: string;
	onClick?: () => void;
}[];

type TypeImageView = {
	categoryId: string;
	productId: string;
	imageId: string;
	onChange: (value: string) => void;
};

type TypeProductView = {
	categoryId: string;
	productId: string;
};

class LayoutStore {
	loading: boolean = false;
	error: string | undefined;
	alertText: string | undefined;
	alertButtons: TypeAlertButtons | undefined;
	alertType: 'warning' | 'success' | undefined;
	imageModal: TypeImageView | undefined;
	productModal: TypeProductView | undefined;

	setLoading = action((value: boolean = true) => (this.loading = value));

	setError = action((e: string) => (this.error = e));

	clearError = action(() => (this.error = undefined));

	alert = action(async (text: string, buttons: TypeAlertButtons, type: 'warning' | 'success') => {
		this.alertText = text;
		this.alertType = type;

		this.alertButtons = buttons.map((el) => ({
			title: el.title,
			onClick: async () => {
				if (el.onClick) el.onClick();
				this.hideAlert();
			},
		}));
	});

	hideAlert = action(() => {
		this.alertText = undefined;
		this.alertType = undefined;
		this.alertButtons = undefined;
	});

	showImageModal = action((args: TypeImageView) => (this.imageModal = args));

	hideImageModal = action(() => (this.imageModal = undefined));

	showProductModal = action((args: TypeProductView) => (this.productModal = args));

	hideProductModal = action(() => (this.productModal = undefined));
}

export const layoutStore = makeAutoObservable(new LayoutStore());
