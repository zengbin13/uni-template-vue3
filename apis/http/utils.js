import {
	IS_DEV
} from './config.js'

export function reqeuestLog(config) {
	if (!IS_DEV) return;
	let dataStr = config.data ? JSON.stringify(config.data) : '';
	console.log(`🦄 请求方法：${config.method} - 请求地址：${config.url} - 请求参数：${dataStr}`);
}

export function responseLog(response) {
	if (!IS_DEV) return;
	let dataStr = response.data ? JSON.stringify(response.data) : JSON.stringify(response);
	console.log(`🐣 请求结果：${dataStr}`);
}