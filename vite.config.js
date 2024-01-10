import {
	defineConfig
} from 'vite';
import uni from '@dcloudio/vite-plugin-uni';
import path from 'path'

export default defineConfig({
	plugins: [uni()],
	server: {
		port: 3000,
		proxy: {
			'^/api/': {
				target: 'http://10.1.1.23:9080',
				changeOrigin: true,
				// pathRewrite 成功 rewrite 404
				pathRewrite: (path) => path.replace(/^\/api/, '/api')
			},
		}
	},
	// 发布时删除 console
	// build: {
	// 	minify: 'terser',
	// 	terserOptions: {
	// 		compress: {
	// 			drop_console: true,
	// 		},
	// 	},
	// },
});