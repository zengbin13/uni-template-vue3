import http from '@/apis/http/index.js'


export function loginApi(data) {
	return {
		token: 'token123',
		userInfo: {}
	}
	// return http.post('/api/login', data, {
	// 	custom: {
	// 		loading: true,
	// 		loadingText: '登录中...',
	// 	}
	// });
}

export default {
	loginApi
}