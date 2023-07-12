import App from './App'

// #ifdef VUE3
import {
	createSSRApp
} from 'vue'
import * as Pinia from 'pinia';
import {
	setupProvide
} from '@/utils/setup.js'

// 导入 Mock 数据文件
import '@/mock/index.js';

import uView from './uni_modules/vk-uview-ui';

export function createApp() {
	const app = createSSRApp(App)
	setupProvide(app)
	app.use(Pinia.createPinia()).use(uView)
	return {
		app,
		Pinia
	}
}
// #endif

// #ifndef VUE3
import Vue from 'vue'
import './uni.promisify.adaptor'
Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
	...App
})
app.$mount()
// #endif