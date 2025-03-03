import { KEY_LOCAL_STORAGE } from '@constants';

class LocalStore {
	private supported: undefined | boolean = undefined;

	constructor() {
		this.isSupported();
	}

	private isSupported() {
		if (this.supported !== undefined) return;

		try {
			this.set(KEY_LOCAL_STORAGE, KEY_LOCAL_STORAGE);
			this.delete(KEY_LOCAL_STORAGE);
			this.supported = true;
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
		} catch (e: unknown) {
			this.supported = false;
		}
	}

	get(key: string): string | number | object | boolean | undefined {
		if (!this.supported) return undefined;

		try {
			const result = localStorage.getItem(key);
			return result ? JSON.parse(result) : undefined;
		} catch {
			return undefined;
		}
	}

	set(key: string, value: string | number | object | boolean | undefined) {
		if (!this.supported) return;

		try {
			localStorage.setItem(key, JSON.stringify(value));
		} catch {
			/* empty */
		}
	}

	delete(key: string) {
		if (!this.supported) return;
		localStorage.removeItem(key);
	}
}

export const localStore = new LocalStore();
