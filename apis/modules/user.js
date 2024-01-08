import http from '@/apis/http/index.js'


export function loginApi(data) {
	return http.post('/api/biz-portal/login', data, {
		custom: {
			apiName: 'biz-portal',
			loading: false,
			loadingText: '登录中...',
		}
	});
}

export default {
	loginApi
}