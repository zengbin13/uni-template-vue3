<template>
	<view class="page-wrap">
		<z-navbar :title="title"></z-navbar>
		<!-- 内容区域 -->
		<view class="page-content">
			<view class="" v-show="curTabIndex == 0">
				<view v-for="(item,index) in 100" :key="index">
					tab1 - {{item}}
				</view>
			</view>
			<view class="" v-show="curTabIndex == 2">
				<view v-for="(item,index) in 100" :key="index">
					tab2 - {{item}}
				</view>
			</view>
		</view>
		<!-- 自定义tabbar -->
		<uv-tabbar :value="curTabIndex" @change="handleTabChange">
			<uv-tabbar-item text="首页" icon="home" iconSize="24"></uv-tabbar-item>
			<uv-tabbar-item text="">
				<template v-slot:active-icon>
					<view class="center-wrap">
						<image class="center-img" src="/static/tabbar/scan.png"></image>
					</view>
				</template>
				<template v-slot:inactive-icon>
					<view class="center-wrap">
						<image class="center-img" src="/static/tabbar/scan.png"></image>
					</view>
				</template>
			</uv-tabbar-item>
			<uv-tabbar-item text="我的" icon="account" iconSize="24"></uv-tabbar-item>
		</uv-tabbar>
	</view>
</template>

<script setup>
	import {
		ref,
	} from 'vue';
	import {
		onLoad,
		onShow
	} from "@dcloudio/uni-app";

	const title = ref('自定义tabbar')

	const curTabIndex = ref(0)
	const handleTabChange = (index) => {
		if (index == 1) {
			//调用扫码功能
			// #ifndef H5
			uni.scanCode({
				onlyFromCamera: true,
				success: function(res) {
					console.log('条码类型：' + res.scanType);
					console.log('条码内容：' + res.result);
				}
			});
			// #endif
			return
		}
		curTabIndex.value = index
	}
</script>

<style lang="scss" scoped>
	:deep(.uv-tabbar) {
		max-height: 100rpx !important;
	}

	.center-wrap {
		width: 108rpx;
		height: 108rpx;
		border-radius: 50%;
		background-color: #fff;
		position: relative;
		top: -20rpx;
		display: flex;
		align-items: center;
		justify-content: center;

		.center-img {
			width: 88rpx;
			height: 88rpx;
		}
	}
</style>