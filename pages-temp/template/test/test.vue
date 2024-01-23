<template>
	<view class="page-wrap">
		<z-navbar :title="title"></z-navbar>
		<view class="page-content">
			内容
		</view>
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

	const title = ref('标题')
</script>

<style lang="scss" scoped>

</style>