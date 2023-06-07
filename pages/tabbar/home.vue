<template>
	<view>
		<u-navbar title="首页" :is-back="false"></u-navbar>
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
</script>

<style lang="scss" scoped>

</style>