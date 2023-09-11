import {
	SPLASH_PAGE,
	LOGIN_PAGE,
	HOME_PAGE,
	FIRSET_INSTALL_STR
} from '@/config/index.js'

export function splashscreen(callback) {
	const token = uni.getStorageSync('token');
	let firstInstall = uni.getStorageSync(FIRSET_INSTALL_STR) === '' ? true : false;
	console.log('是否首次进入', firstInstall);
	if (firstInstall) {
		uni.reLaunch({
			url: SPLASH_PAGE,
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
		uni.setStorageSync(FIRSET_INSTALL_STR, false)
		uni.reLaunch({
			url: token ? HOME_PAGE : LOGIN_PAGE,
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
// 须在登录页面设置 uni.setStorageSync(FIRSET_INSTALL_STR, false)
// "splashscreen" : {
//     "alwaysShowBeforeRender" : false,
//     "waiting" : false,
//     "autoclose" : false,
//     "delay" : 0
// },