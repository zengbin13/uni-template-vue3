<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	/*每个页面公共css  对于图标微信小程序推荐引用远程字体文件 多色图标iconfont只能40个*/
	@import '@/uni_modules/uv-ui-tools/index.scss';
	@import '@/common/css/iconfont.css';
	@import '@/common/css/icon-color.css';
	@import '@/common/css/global.scss';
</style>
