export const ERROR_CODES = {
	/** [Electron] */
	11: 'openBackupdDir(): Ошибка',

	/** [FTP] */

	101: 'sendError(): Отсутствует this.mainWindow',

	111: 'cdDir(): Ошибка подключения к хостингу',
	112: 'cdDir(): Ошибка',

	121: 'connnect(): Ошибка учётных данных для подключения к хостингу',
	122: 'connnect(): Ошибка подключения к хостингу',

	131: 'getPrice(): Ошибка',

	141: 'downloadAndWriteBackup(): Ошибка подключения к хостингу',
	142: 'downloadAndWriteBackup(): Не найден прайс на хостинге',
	143: 'downloadAndWriteBackup(): Ошибка',

	151: 'readLastBackup(): Не найдена запись о последнм бэкапе прайса',
	152: 'readLastBackup(): Не найден файл бэкапа прайса',
	153: 'readLastBackup(): Ошибка',

	161: 'sendPrice(): Ошибка подключения к хостингу',
	162: 'sendPrice(): Отсутствует прайс',
	163: 'sendPrice(): Ошибка записи нового прайса во временный файл',
	164: 'sendPrice(): Ошибка загрузки нового прайса на хостинг',
	165: 'sendPrice(): Ошибка',

	171: 'uploadImage(): Ошибка подключения к хостингу',
	172: 'uploadImage(): Ошибка',

	181: 'deleteImage(): Ошибка подключения к хостингу',
	182: 'deleteImage(): Ошибка',

	/** [ImageManipulator] */

	201: 'sendError(): Отсутствует this.mainWindow',

	211: 'addImage(): Не было выбранно изображение',
	212: 'addImage(): Расширение выбранного изображения не подходит в данной версии программы',
	213: 'addImage(): Ошибка',
};

const getSource = (code: keyof typeof ERROR_CODES) => {
	if (code < 100) return '[Electron]';
	if (code < 200) return '[Electron] [FTP]';
	if (code < 300) return '[Electron] [ImageManipulator]';
	return '[React]';
};

const getFirstText = (code: keyof typeof ERROR_CODES) => ERROR_CODES[code];

export const getError = (code: keyof typeof ERROR_CODES, e?: unknown) => {
	return `${getSource(code)} ${getFirstText(code)} ${e ? '\n' + e + ' ' : ''}[#${code}]`;
};

export const SUCCESS_CODES = {
	100: '',
	200: '',
};
