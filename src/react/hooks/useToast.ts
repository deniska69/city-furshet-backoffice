import toast from 'react-hot-toast';

const options = { className: 'toast', duration: 5000, position: 'top-right' };

export const useToaster = () => {
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	const toastSuccess = (text = 'Успех!') => toast.success(text, options);

	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	const toastError = (text = 'Ошибка!') => toast.error(text, options);

	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	const toastPromise = (promise, type) => toast.promise(promise, type, options);

	return { toastSuccess, toastError, toastPromise };
};
