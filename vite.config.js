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
				target: 'http://47.109.93.90/',
				changeOrigin: true,
				// pathRewrite rewrite 
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