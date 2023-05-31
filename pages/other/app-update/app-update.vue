<template>
	<view>
		<u-navbar :title="title"></u-navbar>
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

	const title = ref('标题')
</script>

<style lang="scss" scoped>

</style>