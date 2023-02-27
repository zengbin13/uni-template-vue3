export function showToast(message = '发生错误', option = {
	type: 'warn',
	back: false
}) {
	// type = 'warn' | 'error' | 'success'
	// #ifdef APP-PLUS
	plus.nativeUI.toast(message, {
		icon: `/static/images/${option.type}-icon.png`,
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
		// image: '/static/images/error.png',
		title: message,
		icon: 'none',
		position: 'center',
	})
	// #endif
	if (option.back) {
		setTimeout(() => {
			uni.navigateBack()
		}, 500)
	}
}
