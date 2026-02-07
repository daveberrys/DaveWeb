import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
	plugins: [sveltekit()],

	resolve: {
		alias: {
			'@components': path.resolve(__dirname, 'src/webpack/components'),
			'@pages': path.resolve(__dirname, 'src/webpack/pages'),
			'@misc': path.resolve(__dirname, 'src/webpack/misc'),
			'@api': path.resolve(__dirname, 'src/webpack/api')
		}
	}
});
