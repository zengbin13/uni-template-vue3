<template>
	<view class="index-wrap">
		<u-navbar back-text="返回" title="微信"></u-navbar>
		<view class="">
			<u-button @click="route('/pages/weixin/login/login')">微信登录</u-button>
		</view>
	</view>
</template>

<script setup>
	import {
		inject
	} from 'vue';
	const route = inject('route')
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