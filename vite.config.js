import {
	defineConfig
} from 'vite';
import uni from '@dcloudio/vite-plugin-uni';

export default defineConfig({
	plugins: [uni()],
	build: {},
	server: {
		port: 8080,
		proxy: {
			'^/api/.*': {
				target: 'https://api.github.com',
				changeOrigin: true,
				rewrite: (path) => path.replace(/^\/api/, ''),
			},
		}
	}
});