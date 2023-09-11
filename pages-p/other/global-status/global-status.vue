<template>
	<view>
		<z-navbar :title="title"></z-navbar>
		<u-button class="btn" @click="increment">pinia: {{userStore.count}}</u-button>
		<u-button class="btn" @click="increment2">globalData: {{count}}</u-button>
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

	const title = ref('全局状态')

	// 全局状态 - pinia
	import {
		useUserStore
	} from '@/store/user.js'

	const userStore = useUserStore()
	const increment = () => {
		userStore.increment()
	}

	// 全局状态 - globalData
	const count = ref(getApp().globalData.count || 0)
	const increment2 = () => {
		getApp().globalData.count = count.value + 1
		count.value = getApp().globalData.count
	}
</script>

<style lang="scss" scoped>
	// 微信小程序修改组件样式使用深度选择器 ::v-deep 
	::v-deep .u-btn {
		margin: 20rpx;
	}
</style>