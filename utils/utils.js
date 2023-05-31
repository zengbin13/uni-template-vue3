/**
 * 框架相关的工具函数
 */

// 展示toast
export function showToast(message = '发生错误', options = {
	type: "warn", // type = 'warn' | 'error' | 'success'
}) {
	// #ifdef APP-PLUS
	plus.nativeUI.toast(message, {
		icon: `/static/images/${options.type}-icon.png`,
		style: 'inline',
		iconHeight: '20px',
		iconWidth: '20px',
		background: 'rgba(0,0,0,0.7)',
		duration: 'long',
		verticalAlign: 'center',
	});
	// #endif
	// #ifndef APP-PLUS
	uni.showToast({
		title: message,
		icon: 'none',
		position: 'center',
	});
	// #endif
}

// 路由导航
export function router(...params) {
	uni.$u.route(...params)
}