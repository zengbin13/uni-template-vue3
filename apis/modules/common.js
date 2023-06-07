import http from '@/apis/http/index.js'

//密码登录 
const updeteAppApi = (data) => http.post('/updete', data)

const requestListApi = ({
	pageNo,
	pageSize
}) => uni.request({
	url: `https://api.github.com/users?since=${pageNo * pageSize - pageSize}`
})

export default {
	updeteAppApi,
	requestListApi,
}