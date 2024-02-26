import Request from 'luch-request';

import {
	RES_CODE
} from './config.js';
import {
	encrypt,
	decrypt
} from './crypto.js';
import {
	showToast
} from '@/utils/utils.js';
import {
	reqeuestLog,
	responseLog
} from './utils'


const http = new Request({
	// #ifndef H5
	baseURL: import.meta.env.VITE_BASE_URL,
	// #endif
	// #ifdef H5
	baseURL: '',
	// #endif
	/**
	 * 全局自定义参数默认值
	 * auth: 授权, 是否携带token
	 * loading: 请求加载动画
	 * loadingText: 请求加载文字
	 * toast: 错误信息是否展示toast
	 * catch: 是否捕获promise错误
	 * encrypt: 是否加密
	 */
	timeout: 6000,
	custom: {
		auth: true,
		loading: false,
		loadingText: '加载中...',
		toast: true,
		catch: true,
		encrypt: false
	}
});
/**
 * 请求拦截：
 */
http.interceptors.request.use(
	(config) => {
		// 1.打印日志
		reqeuestLog(config);
		// 2.token授权
		if (config.custom.auth) {
			const token = uni.getStorageSync('token') || ''
			config.header.token = token;
			config.header.Authorization = token;

			// 业务相关
			const pattern = /^\/api\/([^/]+)\/.*$/;
			const match = config.url.match(pattern);
			config.header.Authorization = token ? `V1#${match[1]}#${token}` : '';
		}
		// 3.加密请求数据
		const field = config.method == 'get' ? 'params' : 'data';
		if (config.custom.encrypt && config[field]) {
			config[field] = {
				params: encrypt(JSON.stringify(config[field]))
			};
		}
		// 4.请求加载动画
		if (config.custom.loading) {
			uni.showLoading({
				title: config.custom.loadingText
			});
		}
		return config;
	},
	(config) => {
		// 对请求错误做些什么
		console.error(config);
		return Promise.reject(config);
	});
/**
 * 响应拦截：
 */
http.interceptors.response.use(
	(response) => {
		// 处理文件流
		if (response.statusCode === 200 && response.config.responseType === 'blob') {
			return response;
		}

		let {
			data,
			code,
			message,
		} = response.data;

		const custom = response.config.custom;
		// 1.清除loading
		if (custom.loading) {
			uni.hideLoading();
		}
		// 2.业务逻辑
		if (code !== RES_CODE.success) {
			// 未登录或登录失效
			if (code == RES_CODE.not_login) {}
			// 错误处理
			if (code == RES_CODE.error) {
				if (custom.toast) showToast(message);
				return custom.catch ? Promise.reject(response.data) : new Promise(() => {});
			}
			return Promise.reject(response.data);
		}
		// 3.解密数据
		if (custom.encrypt && data) data = JSON.parse(decrypt(data));
		// 4.打印日志
		responseLog(data);
		return response.data;
	},
	(error) => {
		// 对响应错误做些什么 statusCode !== 200
		uni.showToast({
			title: '请求发生错误',
			image: '/static/images/error.png'
		});
		console.error(error);
		return Promise.reject(error);
	}
);

export default http;