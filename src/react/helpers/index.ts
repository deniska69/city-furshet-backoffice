export const decodeResponse = (data: ArrayBufferLike) => {
	const dataView = new DataView(data);
	const decoder = new TextDecoder('windows-1251');
	return decoder.decode(dataView);
};

// export const writeBackupPrice = (data: string) => {
// 	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// 	// @ts-ignore
// 	window.electron.writeBackupPrice(data);
// };

export const getPriceSync = () => {
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	window.electron.getPriceSync();
};
