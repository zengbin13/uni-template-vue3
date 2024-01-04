/**
 * 框架相关的工具函数
 */

// 展示toast  
const initToastOptions = {
	type: 'warn',
	back: false,
	modal: false
}
export function showToast(
	message = '发生错误', options
) {
	const mergeOptions = Object.assign(initToastOptions, options)
	const fn = () => {
		if (mergeOptions.back) {
			const {
				vm
			} = getHistoryPage()
			setTimeout(() => {
				vm?.refresh && vm?.refresh()
				uni.navigateBack();
			}, 500);
		}
	}
	if (mergeOptions.type == 'warn' && mergeOptions.modal) {
		uni.showModal({
			title: '提示信息',
			content: message,
			showCancel: false,
		})
		return
	}
	// #ifdef APP-PLUS
	plus.nativeUI.toast(message, {
		icon: `/static/images/${mergeOptions.type}-icon.png`,
		style: 'inline',
		iconHeight: '20px',
		iconWidth: '20px',
		background: 'rgba(0,0,0,0.7)',
		duration: 'long',
		verticalAlign: 'center',
		success: fn
	});
	// #endif
	// #ifndef APP-PLUS
	uni.showToast({
		title: message,
		icon: 'none',
		position: 'center',
		success: fn
	});
	// #endif

}


// 获取历史页面栈
export function getHistoryPage(index = 1) {
	let pages = getCurrentPages();
	let historyPageIndex = index + 1;
	if (pages.length - historyPageIndex < 0) return {};
	// #ifdef APP-PLUS
	let page = pages[pages.length - historyPageIndex].$vm;
	// #endif
	// #ifndef APP-PLUS
	let page = pages[pages.length - historyPageIndex];
	// #endif
	// #ifdef H5
	const vm = page?.$vm._.exposed;
	// #endif
	// #ifdef APP-PLUS
	const vm = page?.$vm._.exposed;
	// #endif
	// #ifdef MP-WEIXIN
	const vm = page?.$vm;
	// #endif

	return {
		page,
		vm,
	};
}
