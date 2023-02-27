import http from '../http/index.js'

//密码登录 
const login_api = (data) => http.post('/produce/login', data)
export default {
	login_api,
}