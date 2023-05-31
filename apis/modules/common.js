import http from '@/apis/http/index.js'

//密码登录 
const updeteAppApi = (data) => http.post('/updete', data)

export default {
	updeteAppApi,
}