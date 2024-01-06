// 导入插件
import uvUI from '@/uni_modules/uv-ui-tools'
import * as Pinia from 'pinia';

export function setupApp(app) {
	// 注册插件
	app.use(Pinia.createPinia()).use(uvUI);
	// 保存环境变量
	uni.setStorageSync('viteEnv', import.meta.env)
}