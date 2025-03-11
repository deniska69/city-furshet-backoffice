import { action, makeAutoObservable } from 'mobx';

class LayoutStore {
	loading: boolean = false;
	error: string | undefined;
	alertText: string | undefined;
	alertSubmit: (() => void | undefined) | undefined;

	setLoading = action((value: boolean = true) => (this.loading = value));

	setError = action((e: string) => (this.error = e));

	clearError = action(() => (this.error = undefined));

	alert = action(async (text: string, onSubmit: () => void) => {
		this.alertText = text;
		this.alertSubmit = () => {
			onSubmit();
			this.alertText = undefined;
		};
	});

	hideAlert = action(() => (this.alertText = undefined));
}

export const layoutStore = makeAutoObservable(new LayoutStore());
