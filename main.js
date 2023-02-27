import App from './App'
import store from './store/index.js'
import * as Pinia from 'pinia';

// ui框架
import uView from './uni_modules/vk-uview-ui';
// http
import http from '@/apis/http/index.js'
import apis from '@/apis'



// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  app.use(store).use(uView)
  // app.config.globalProperties.$http = http;
  // app.config.globalProperties.$apis= apis;
  return {
    app,
	Pinia
  }
}
// #endif

// #ifndef VUE3
import Vue from 'vue'
Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
    ...App
})
app.$mount()
// #endif