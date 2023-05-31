import {
	defineConfig
} from 'vite';
import uni from '@dcloudio/vite-plugin-uni';

export default defineConfig({
	plugins: [uni()],
	build: {
		minify: 'terser', //esbuild
		sourcemap: false,
		chunkSizeWarningLimit: 1500,
		terserOptions: {
			compress: {
				drop_console: true,
				drop_debugger: true,
			},
			ie8: true,
			output: {
				comments: true,
			},
		},
		rollupOptions: {
			output: {
				// entryFileNames: `assets/[name].${new Date().getTime()}.js`,
				// chunkFileNames: `assets/[name].${new Date().getTime()}.js`,
				// assetFileNames: `assets/[name].${new Date().getTime()}.[ext]`,
				compact: true,
				// manualChunks: {
				// 	vue: ['vue', 'vue-router', 'vuex', 'pinia'],
				// },
			},
			// external: ['vue', 'vue-router', 'vuex', 'pinia'],
		},
	},
});