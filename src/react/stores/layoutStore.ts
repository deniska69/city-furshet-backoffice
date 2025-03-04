import { action, makeAutoObservable } from 'mobx';

class LayoutStore {
	loading: boolean = false;

	setLoading = action((value: boolean = true) => {
		this.loading = value;
	});
}

export const layoutStore = makeAutoObservable(new LayoutStore());
