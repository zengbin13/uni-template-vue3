<template>
	<view>
		<z-navbar :title="title"></z-navbar>
		<button @click="handleUpdate">APP升级</button>
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

	import Updater from '@/uni_modules/guyue-updater/index';

	const apis = inject('apis')
	const showToast = inject('showToast')
	const route = inject('route')

	const title = ref('升级')

	const handleUpdate = () => {
		Updater.update({
			title: '发现新版本',
			content: '1. 我们更新了新的UI设计\n2. 我们更新了新的UI设计\n3. 我们更新了新的UI设计\n4. 我们更新了新的UI设计\n',
			versionName: '1.3.6',
			downUrl: 'https://cdn.xxx.cn/mp/__UNI__1F29D65.wgt',
			force: false,
		})
	}
</script>

<style lang="scss">
	page {
		background-color: #fff;
	}
</style>
<style lang="scss" scoped>

</style>