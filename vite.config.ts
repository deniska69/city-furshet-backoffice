import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
	server: {
		port: 5123,
		strictPort: true,
	},
	plugins: [react(), tailwindcss(), tsconfigPaths()],
	base: './',
	build: {
		outDir: 'dist-react',
	},
});
