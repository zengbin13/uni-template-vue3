<template>
	<view class="index-wrap">
		<u-navbar back-text="返回" title="其他"></u-navbar>
		<view class="">
			<u-button class="btn" @click="increment">全局状态: {{userStore.count}}</u-button>
			<u-button @click="handleLogin">网络请求</u-button>
			<u-button @click="route('/pages/other/paging/paging')">下拉加载</u-button>
			<u-button @click="route('/pages/other/iconfont/iconfont')">iconfont图标</u-button>
			<u-button @click="route('/pages/other/chart/chart')">chart图表</u-button>
			<u-button @click="route('/pages/other/video/video')">video直播</u-button>
			<!-- #ifdef APP-PLUS -->
			<u-button @click="route('/pages/other/awaken-app/awaken-app')">唤醒APP</u-button>
			<!-- #endif -->
			<u-button @click="route('/pages/other/pay/pay')" disabled>支付Pay</u-button>
			<u-button @click="route('/pages/other/app-update/app-update')" disabled>APP升级</u-button>
		</view>
	</view>
</template>

<script setup>
	import {
		inject
	} from 'vue';
	const route = inject('route')
	const apis = inject('apis')

	// 全局状态
	import {
		useUserStore
	} from '@/store/user.js'

	const userStore = useUserStore()
	const increment = () => {
		userStore.increment()
	}

	// 网络请求
	const handleLogin = async () => {
		try {
			const res = await apis.user.loginApi({
				data: 'xxx'
			})
		} catch (e) {
			//TODO handle the exception
		}
	}
</script>

<script>
	export default {

	}
</script>

<style lang="scss" scoped>
	// 微信小程序修改组件样式使用深度选择器 ::v-deep 
	::v-deep .u-btn {
		margin: 20rpx;
	}
</style>