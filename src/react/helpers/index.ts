export const getLastModText = (lastMod?: Date) => {
	if (!lastMod) return undefined;
	const lastModDate = lastMod.toLocaleDateString();
	const lastModTime = lastMod.toLocaleTimeString();
	return `${lastModDate} ${lastModTime}`;
};

export const isHide = (hide: string | boolean) => {
	if (typeof hide === 'string') return hide === 'true';
	return !!hide;
};

export const getImageUrl = (categoryId?: string, productId?: string, imageId?: string) => {
	return `https://city-furshet.ru/images/${categoryId}/${productId}/${imageId}.jpg`;
};

export const toBase64 = (blob: Blob, callback: (result: string | ArrayBuffer | null) => void) => {
	const reader = new FileReader();
	reader.onload = () => callback(reader.result);
	reader.readAsDataURL(blob);
};
