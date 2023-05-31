// 请求数据结构
// {
//     version:'数字.数字.数字 形式版本号',
//     platform:'android或ios'
// }
// 返回数据结构
// {
//       code:0
//       msg:"ok"
//       version:1.2.1//版本号
//       url:'http...apk|wgt'//url下载地址，wgt优先，如果不存在新wgt，并且是ios，则此处为AppStore的地址
//       log:''//更新文字说明，支持 \n 换行
//       force:1// 是否强制升级，force=1则是强制升级，用户无法关闭升级提示框
//   }

import apis from '@/apis/index.js'

function checkAppVersion() {
	// 获取指定APPID对应的应用信息
	plus.runtime.getProperty(plus.runtime.appid, async (widgetInfo) => {
		let platform = plus.os.name.toLocaleLowerCase()
		const versionData = {
			platform: platform,
			version: widgetInfo.version
		}
		try {
			const result = await apis.common.updeteAppApi(versionData)
		} catch (e) {
			console.log(e)
		}
		checkApi(data).then(
			result => {
				let data = result.data ? result.data : null
				if (data && data.code === 0 && data.url) {
					if (/\.wgt$/i.test(data.url) || (platform == 'android' && /\.apk$/i.test(data.url))) {
						// 如果是热更新  wgt 或 android平台下apk
						startdownload(param, data);
						return
					}
					if (platform == 'ios') {
						// 如果是ios,则跳转到appstore
						plus.runtime.openURL(result.data.data.url)

					}
				}
			}).catch()
	});
}

function startdownload(param, data) {
	uni.showModal({
		title: param.title,
		content: data.log ? data.log : param.content,
		showCancel: data.force ? false : true,
		confirmText: param.oktext,
		cancelText: param.canceltext,
		success: res => {
			if (!res.confirm) {
				console.log('取消了升级');
				return
			}
			if (data.shichang === 1 && /\.apk$/i.test(data.url)) {
				//去应用市场更新
				plus.runtime.openURL(data.shichangurl);
				plus.runtime.restart();
			} else {
				// 开始下载
				// 创建下载任务
				var dtask = plus.downloader.createDownload(data.url, {
						filename: "_downloads/"
					},
					function(d, status) {
						console.log('d', d)
						// 下载完成
						if (status == 200) {
							plus.runtime.install(d.filename, {
								force: false
							}, function() {
								//进行重新启动;
								plus.runtime.restart();
							}, (e) => {
								uni.showToast({
									title: '安装升级包失败:' + JSON.stringify(e),
									icon: 'none'
								})
							});
						} else {
							plus.nativeUI.alert("下载升级包失败，请手动去站点下载安装，错误码: " + status);
						}
					});

				let wrapwidth = parseInt(plus.screen.resolutionWidth / 2);
				let view = new plus.nativeObj.View("maskView", {
					backgroundColor: param.barbackground,
					left: (wrapwidth / 2) + "px",
					bottom: "80px",
					width: wrapwidth + "px",
					height: "10px"
				});

				view.show()
				let viewinner = new plus.nativeObj.View("maskViewinner", {
					backgroundColor: param.barbackgroundactive,
					left: (wrapwidth / 2) + "px",
					bottom: "80px",
					width: "1px",
					height: "10px"
				});
				viewinner.show()
				dtask.addEventListener("statechanged", (e) => {
					if (e && e.downloadedSize > 0) {
						let jindu = parseInt((e.downloadedSize / e.totalSize) * wrapwidth)
						viewinner.setStyle({
							width: jindu + 'px'
						});
					}
				}, false);
				dtask.start();
			}
		}
	});
}

export default {
	check
}