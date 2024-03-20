<script>
	import {
		splashscreen
	} from '@/utils/splash.js'
	import {
		updateManager
	} from '@/utils/updateManager.js'

	export default {
		onLaunch: function() {
			console.log('App Launch')
			const token = uni.getStorageSync('token')
			if (token) {
				// 调用store方法, 更新初始化数据
			}
			// #ifdef APP-PLUS
			splashscreen()
			// #endif
		},
		onShow: function() {
			console.log('App Show')

			// #ifdef APP-PLUS
			const args = plus.runtime.arguments;
			if (args) {
				// 注册scheme后唤醒APP - 处理args参数，如直达到某新页面等
			}
			// #endif
			
			
			// #ifdef MP
			updateManager()
			// #endif
		},
		onHide: function() {
			console.log('App Hide')
		},
	}
</script>


<style lang="scss">
	/*每个页面公共css  对于图标微信小程序推荐引用远程字体文件 多色图标iconfont只能40个*/
	@import '@/uni_modules/uv-ui-tools/index.scss';
	@import '@/common/css/iconfont.css';
	@import '@/common/css/icon-color.css';
	@import '@/common/css/global.scss';

	// 适用于微信小程序的额深度选择器
	// ::v-deep  :deep()
</style>