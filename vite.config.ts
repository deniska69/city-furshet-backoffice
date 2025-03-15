import path from 'path';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
	server: {
		port: 5123,
		strictPort: true,
	},
	plugins: [react(), tailwindcss()],
	base: './',
	build: {
		outDir: 'dist-react',
	},
	resolve: {
		alias: {
			'@assets': path.resolve(__dirname, './src/assets'),
			'@constants': path.resolve(__dirname, './src/react/constants'),
			'@helpers': path.resolve(__dirname, './src/react/helpers'),
			'@hooks': path.resolve(__dirname, './src/react/hooks'),
			'@modules': path.resolve(__dirname, './src/react/modules'),
			'@services': path.resolve(__dirname, './src/react/services'),
			'@stores': path.resolve(__dirname, './src/react/stores'),
			'@types': path.resolve(__dirname, './src/react/types'),
			'@ui': path.resolve(__dirname, './src/react/ui'),
		},
	},
});
