import http from '@/apis/http/index.js'


// 文件分页查询
export function getTableData(data) {
	return http.post("/api/sprms/baseFiles/page", data, {
		custom: {
			loading: true,
			loadingText: '加载中...',
		}
	});
}