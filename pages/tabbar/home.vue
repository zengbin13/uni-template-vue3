<template>
	<view class="page-wrap">
		<uv-status-bar></uv-status-bar>
		<!-- navbar -->
		<view class="navbar">
			<image src="/static/images/logo.png" mode="widthFix" class="logo"></image>
			<view class="title">
				首页
			</view>
		</view>
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
	
	const region = ref([])
	const bindRegionChange = (e) => {
		console.log(e.detail.value);
	}
	
</script>

<style lang="scss" scoped>
	.navbar {
		height: 90rpx;
		padding: 0 30rpx;
		display: flex;
		align-items: center;
		margin-bottom: 20rpx;
		/* #ifdef H5 */
		margin-top: 20rpx;
		/* #endif */

		.logo {
			width: 250rpx;
			margin-right: 25rpx
		}

		.title {
			font-size: 44rpx;
			font-weight: 600;
			color: #000000;
			line-height: 82rpx;
		}

	}
</style>