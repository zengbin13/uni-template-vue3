export const updateManager = () => {
	// 获取小程序更新机制兼容
	if (!uni.canIUse('getUpdateManager')) return

	const updateManager = uni.getUpdateManager()

	updateManager.onCheckForUpdate(function(res) {
		// 请求完新版本信息的回调
		if (res.hasUpdate) {
			console.log('有新版本可更新')
		} else {
			console.log('当前是最新版本')
		}
	})


	updateManager.onUpdateReady(function() {
		uni.showModal({
			title: '更新提示',
			content: '新版本已经准备好，是否重启应用？',
			success: function(res) {
				if (res.confirm) {
					// 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
					updateManager.applyUpdate()
				}
			}
		})
	})

	updateManager.onUpdateFailed(function() {
		// 新版本下载失败
		console.log('新版本下载失败')
	})
}

/* 
 https://www.cnblogs.com/luyj00436/p/15071552.html
 */

/* 
当用户离开小程序时，小程序并没有直接销毁，而是进入了后台，当用户再次进入小程序时，又会从后台进入前台。
只有当小程序进入后台一定时间后者系统资源占用过高，才会被真正的销毁
 */

/* 
 小程序启动分为“热启动”和“冷启动”。
 
 热启动指的是小程序打开后，在一段时间内（目前：5分钟）再次被打卡，此时将后台小程序切换到前台。对应方法onShow。
 冷启动指的是小程序首次打开或销毁后再次被打卡，对应函数onLaunch。
 */

/* 
 冷启动时，如果发现有新版本，将会异步下载新版本的代码包，并同时用客户端本地的包进行启动，即新版本的小程序需要等下一次冷启动才会应用上。
 如果希望冷启动后马上使用最新版本，在App 的onLaunch生命周期中，调用用版本资源管理器uni.getUpdateManger()方法。
 同理，希望每次打开小程序，都检测更新，就使用onShow
 这样看来，用代码小程序中更新的方法不是必须的，就看你对版本更新的时效要求
 */