export const decodeResponse = (data: ArrayBufferLike) => {
	const dataView = new DataView(data);
	const decoder = new TextDecoder('windows-1251');
	return decoder.decode(dataView);
};
