import http from '@/apis/http/index.js'

//密码登录 
const loginApi = (data) => http.post('/produce/login', data, {
	custom: {
		loading: true,
	}
})

export default {
	loginApi,
}