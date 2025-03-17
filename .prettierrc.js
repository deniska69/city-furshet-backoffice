import { prettier } from '@parabit/prettier';

export default {
	...prettier,
	plugins: ['prettier-plugin-tailwindcss', '@ianvs/prettier-plugin-sort-imports'],
	importOrder: [
		'^react$',
		'<THIRD_PARTY_MODULES>',
		'',
		'^@assets|@constants|@helpers|@hooks|@modules|@navigation|@services|@stores|@types|@ui$',
		'',
		'^[.]',
	],
};
