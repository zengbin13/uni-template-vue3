<template>
	<view>
		<z-navbar :title="title"></z-navbar>
		<u-button @click="handleLogin">网络请求</u-button>
	</view>
</template>

<script setup>
	import {
		ref,
		inject
	} from 'vue';
	import {
		onLoad,
		onShow
	} from "@dcloudio/uni-app";

	const apis = inject('apis')
	const showToast = inject('showToast')
	const route = inject('route')

	const title = ref('网络请求')

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

<style lang="scss" scoped>
	// 微信小程序修改组件样式使用深度选择器 ::v-deep 
	::v-deep .u-btn {
		margin: 20rpx;
	}
</style>