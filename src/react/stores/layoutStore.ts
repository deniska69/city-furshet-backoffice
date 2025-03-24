import { action, makeAutoObservable } from 'mobx';

type TypeAlertButtons = {
	title: string;
	onClick?: () => void;
}[];

class LayoutStore {
	loading: boolean = false;
	error: string | undefined;
	alertText: string | undefined;
	alertButtons: TypeAlertButtons | undefined;

	setLoading = action((value: boolean = true) => (this.loading = value));

	setError = action((e: string) => (this.error = e));

	clearError = action(() => (this.error = undefined));

	alert = action(async (text: string, buttons: TypeAlertButtons) => {
		this.alertText = text;

		this.alertButtons = buttons.map((el) => ({
			title: el.title,
			onClick: async () => {
				if (el.onClick) el.onClick();
				this.hideAlert();
			},
		}));
	});

	hideAlert = action(() => (this.alertText = undefined));
}

export const layoutStore = makeAutoObservable(new LayoutStore());
