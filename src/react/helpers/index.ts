export const decodeResponse = (data: ArrayBufferLike) => {
	const dataView = new DataView(data);
	const decoder = new TextDecoder('windows-1251');
	return decoder.decode(dataView);
};

export const getLastModText = (lastMod?: Date) => {
	if (!lastMod) return undefined;
	const lastModDate = lastMod.toLocaleDateString();
	const lastModTime = lastMod.toLocaleTimeString();
	return `${lastModDate} ${lastModTime}`;
};

export const openBackupdDir = () => {
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	window.electron.openBackupdDir();
};
