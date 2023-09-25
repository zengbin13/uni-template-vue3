import http from '@/apis/http/index.js'

// 获取人员列表  https://api.github.com/users?since=20
const requestListApi = ({
	pageNo,
	pageSize
}) => http.get(`https://api.github.com/users?since=${pageNo * pageSize - pageSize}`)

export default {
	requestListApi,
}