export function splashscreen(callback) {
	const token = uni.getStorageSync('token');
	let firstInstall = uni.getStorageSync(uni.env.VITE_FIRSET_INSTALL) === '';
	console.log('是否首次进入', firstInstall);
	if (firstInstall) {
		uni.reLaunch({
			url: uni.env.VITE_SPLASH_PAGE,
			success() {
				//解决首页切换闪屏问题
				// #ifdef APP-PLUS
				plus.navigator.closeSplashscreen();
				callback && callback()
				// #endif
			}
		});
	}
	if (!firstInstall) {
		uni.setStorageSync(uni.env.VITE_FIRSET_INSTALL, false)
		uni.reLaunch({
			url: token ? uni.env.VITE_HOME_PAGE : uni.env.VITE_LOGIN_PAGE,
			success() {
				// //解决首页切换闪屏问题
				setTimeout(() => {
					// #ifdef APP-PLUS
					plus.navigator.closeSplashscreen();
					callback && callback()
					// #endif
				}, 400);
			}
		});
	}
}

// 需配置
// 须在登录页面设置 uni.setStorageSync(uni.env.VITE_FIRSET_INSTALL, false)
//  app.vue 执行splashscreen()
// "splashscreen" : {
//     "alwaysShowBeforeRender" : false,
//     "waiting" : false,
//     "autoclose" : false,
//     "delay" : 0
// },