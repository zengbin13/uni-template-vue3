<template>
	<view>
		<u-navbar title="我的" :is-back="false"></u-navbar>
		<u-button @click="route('/pages-p/other/index')">其他</u-button>
		<!-- #ifdef MP-WEIXIN -->
		<u-button @click="route('/pages-p/weixin/index')">微信</u-button>
		<!-- #endif -->
		<u-button @click="route('/pages-p/index/index')">分包</u-button>
	</view>
</template>

<script setup>
	import {
		inject
	} from 'vue';

	const route = inject('route')
</script>

<style>

</style>
<style lang="scss" scoped>
	::v-deep .u-btn {
		margin: 20rpx;
	}
</style>