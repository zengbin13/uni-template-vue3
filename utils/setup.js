// 导入插件
import uvUI from '@/uni_modules/uv-ui-tools'
import * as Pinia from 'pinia';

import route from '@/uni_modules/uv-ui-tools/libs/util/route.js';
import {
	showToast
} from '@/utils/utils.js'

export function setupApp(app) {
	// 初始化
	console.log('初始化app 保存环境变量');
	// 注册插件
	app.use(Pinia.createPinia()).use(uvUI);
	// 保存环境变量
	uni.setStorageSync('env', import.meta.env)
	
	// 挂载在app对象
	app.provide('env', import.meta.env)
	app.provide('route', route)
	app.provide('showToast', showToast)
	// 挂载在uni对象
	uni.env = import.meta.env
	uni.$u = {
		showToast,
		route
	}
}