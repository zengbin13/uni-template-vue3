<template>
	<view>
		<u-navbar :title="title"></u-navbar>
		<view class="img-wrap">
			<image src="/subPackA/static/images/house.png" mode="widthFix" class="house"></image>
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

	const apis = inject('apis')
	const showToast = inject('showToast')
	const route = inject('route')

	const title = ref('分包')
</script>

<style lang="scss" scoped>
	.img-wrap {
		display: flex;
		justify-content: center;

		.house {
			width: 300rpx;
		}
	}
</style>