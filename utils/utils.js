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

//预览图片
export function previewImgs(list = [], index = 1) {
	let urls = []
	let current = 1
	if (typeof list == 'string') urls = [list]
	current = index
	uni.previewImage({
		current,
		urls
	})
}

// 上传图片
export async function uploadSingleImg(uploadApi = () => {}, {
	sourceType = ['camera', 'album'],
	count = 1,
} = {}) {
	try {
		let chooseImageRes = await uni.chooseImage({
			count,
			sourceType,
		});
		if (!chooseImageRes) return;
		const tempFilePaths = chooseImageRes.tempFilePaths;
		const path = tempFilePaths[0];
		let res = await uploadApi(path);
		return {
			id: res.photo_id,
			url: res.img_url,
		};
	} catch (e) {
		console.error(e);
		throw new Error('图片上传失败');
	}
}