export const ERROR_CODES = {
	100: 'connnect(): Ошибка учётных данных для подключения к хостингу',
	101: 'connnect(): Ошибка',

	102: 'cdDir(): Ошибка подключения к хостингу',
	103: 'cdDir(): Ошибка',

	104: 'getPrice(): Ошибка',

	105: 'downloadAndWriteBackup(): Ошибка подключения к хостингу',
	106: 'downloadAndWriteBackup(): Не найден прайс на хостинге',
	107: 'downloadAndWriteBackup(): Ошибка',

	108: 'readLastBackup(): Не найдена запись о последнм бэкапе прайса',
	109: 'readLastBackup(): Не найден файл бэкапа прайса',
	110: 'readLastBackup(): Ошибка',

	111: 'sendPrice(): Ошибка подключения к хостингу',
	112: 'sendPrice(): Отсутствует прайс',
	113: 'sendPrice(): Ошибка записи нового прайса во временный файл',
	114: 'sendPrice(): Ошибка загрузки нового прайса на хостинг',
	115: 'sendPrice(): Ошибка',

	116: 'uploadImage(): Ошибка подключения к хостингу',
	117: 'uploadImage(): Ошибка',

	118: 'deleteImage(): Ошибка подключения к хостингу',
	119: 'deleteImage(): Ошибка',

	200: 'addImage(): Отсутствует this.mainWindow',
	201: 'addImage(): Не было выбранно изображение',
	202: 'addImage(): Расширение выбранного изображения не подходит в данной версии программы',
	203: 'addImage(): Ошибка',
};

const getSource = (code: keyof typeof ERROR_CODES) => {
	if (code < 200) return '[Electron] [FTP]';
	if (code < 300) return '[Electron] [ImageManipulator]';
	return '[React]';
};

const getFirstText = (code: keyof typeof ERROR_CODES) => ERROR_CODES[code];

const getSecondText = (text?: unknown) => (text ? '\n' + JSON.stringify(text) + ' ' : '');

export const getError = (code: keyof typeof ERROR_CODES, secondText?: unknown) => {
	return `${getSource(code)} ${getFirstText(code)} ${getSecondText(secondText)}[#${code}]`;
};

export const SUCCESS_CODES = {
	100: '',
	200: '',
};
