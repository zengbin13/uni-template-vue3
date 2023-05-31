<template>
	<view>
		<u-navbar :title="title"></u-navbar>
		<view class="line">
			<text class="iconfont icon-outline-smallcaps"></text>
			<text class="iconfont icon-outline-quote-down-square"></text>
			<text class="iconfont icon-outline-textalign-justifyright"></text>
			<text class="iconfont icon-outline-textalign-center"></text>
			<text class="iconfont icon-outline-wallet-3"></text>
			<text class="iconfont icon-outline-wallet-add"></text>
			<text class="iconfont icon-outline-card-add"></text>
			<text class="iconfont icon-outline-archive1"></text>
			<text class="iconfont icon-outline-card-receive"></text>
			<text class="iconfont icon-outline-wallet-add-1"></text>
		</view>
		<view class="line">
			<text class="c-icon c-icon-caomei"></text>
			<text class="c-icon c-icon-shizi"></text>
			<text class="c-icon c-icon-xiangjiao"></text>
			<text class="c-icon c-icon-yingtao"></text>
			<text class="c-icon c-icon-mihoutao"></text>
			<text class="c-icon c-icon-tizi"></text>
			<text class="c-icon c-icon-sangshen"></text>
			<text class="c-icon c-icon-huolongguo"></text>
			<text class="c-icon c-icon-pipa"></text>
			<text class="c-icon c-icon-xigua"></text>
		</view>
	</view>
</template>

<script setup>
	import {
		ref,
		inject
	} from 'vue';
	const apis = inject('apis')
	const showToast = inject('showToast')
	const route = inject('route')

	const title = ref('标题')
</script>

<style lang="scss" scoped>
	.line {
		display: flex;
		justify-content: space-evenly;
		margin: 20rpx 0;

		text {
			font-size: 36px
		}
	}
</style>