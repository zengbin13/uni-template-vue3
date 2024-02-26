<template>
	<view class="page-wrap">
		<z-navbar :title="title"></z-navbar>
		<view class="page-content">
			<video src="https://tqw-file-dev.oss-cn-chengdu.aliyuncs.com/%E8%A7%86%E9%A2%912.mp4"></video>
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