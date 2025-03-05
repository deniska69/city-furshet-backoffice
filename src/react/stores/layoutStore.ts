import { action, makeAutoObservable } from 'mobx';

class LayoutStore {
	loading: boolean = false;
	error: string | undefined;

	setLoading = action((value: boolean = true) => {
		this.loading = value;
	});

	setError = action((e: string) => {
		this.error = e;
	});

	clearError = action(() => {
		this.error = undefined;
	});
}

export const layoutStore = makeAutoObservable(new LayoutStore());
