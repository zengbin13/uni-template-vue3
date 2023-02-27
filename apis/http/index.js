// 引入 luch-request 模块
import Request from 'luch-request'

import {BASE_URL, RES_CODE} from './config.js'
import {reqeuestLog,responseLog, toLoginPage} from './utils.js'
import {encrypt} from './crypto.js'
import {showToast} from '@/utils/index.js'

// 创建请求实例 修改全局配置
const http = new Request({
	baseURL: BASE_URL,
	custom: {
		loading: false,
		loadingText: '加载中...',
		auth: true, //是否传递token
		toast: true, //是否报错提示
		catch: true, //是否捕获异常
		encrypt: false, //是否加密
	}
});

// 添加请求拦截器
http.interceptors.request.use((config) => {
	if (!config.data) config.data = {}
	// 1.App上传版本号
	// #ifdef APP-PLUS
	config.data.v = uni.getStorageSync('version') || ''
	// #endif
	// 2.打印请求日志
	reqeuestLog(config)
	// 3.加密请求数据
	config.data = {
		params: config.custom.encrypt ? encrypt(JSON.stringify(config.data)) : config.data
	}
	// 4.添加token
	if (config.custom.auth) config.header.token = uni.getStorageSync('token') || ''
	// 5.展示加载状态
	if (config.custom.loading) {
		uni.showLoading({
			title: config.custom.loadingText
		})
	}
	return config
}, error => {
	console.error(error);
	// 对请求错误做些什么
	return Promise.reject(error)
})

// 添加响应拦截器
http.interceptors.response.use(
	(response) => {
		let {
			data,
			error_code: code,
			msg: message
		} = response.data
		const path = response.config.url

		// 1. 清除loading
		const custom = response.config.custom;
		if (custom.loading) uni.hideLoading()
		// 2.处理业务逻辑
		if (code !== RES_CODE.success) {
			// token失效
			if (code == RES_CODE.not_login) toLoginPage(message)
			//版本过低
			// #ifdef APP-PLUS
			if (code == RES_CODE.low_version) showToast(message)
			// #endif
			// 错误处理
			if (code == RES_CODE.error) {
				if (custom.toast !== false) showToast(message);
				return custom.catch ? Promise.reject(response.data) : new Promise(() => {})
			}
			Promise.reject(response.data)
		}
		// 3.解密数据
		data = custom.encrypt ? data && JSON.parse(decrypt(data)) : data
		// 4.响应日志
		responseLog(data);
		return data;
	},
	(error) => {
		// 对响应错误做些什么 statusCode !== 200
		// if (error.data) {
		// 	showToast(`${error.data.code} : ${error.data.msg || '未知错误'}`);
		// }
		uni.showToast({
			title: '请求发生错误',
			image: '/static/images/error.png'
		})
		console.error(error);
		return Promise.reject(error);
	}
);

export default http;
