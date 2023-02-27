<template>
	<view class="status-bar">
		<u-button @click="increment">全局状态: {{userStore.count}}</u-button>
		<u-button @click="handleLogin">网络请求</u-button>
		<u-button @click="handleUi">UI框架</u-button>
		<u-button @click="handlePaging" @longpress="handleLongPaging">分页组件</u-button>
		<u-button @click="handleIcon">icon图标</u-button>
		<u-button @click="handleChart" @longpress="handleLongChart">chart图表</u-button>
	</view>
</template>

<script setup>
	// data
	import {
		ref
	} from 'vue'
	const title = ref('标题')

	// store
	import {
		useUserStore
	} from '@/store/modules/user.js'
	const userStore = useUserStore()
	const increment = () => {
		userStore.increment()
	}

	//网络请求
	import apis from '@/apis'
	const handleLogin = async () => {
		try {
			const res = await apis.login_api()
			console.log(res);
		} catch (e) {
			//TODO handle the exception
		}
	}

	// UI框架
	const handleUi = () => {
		uni.$u.route('/pages/other/webView/webView?url=https://vkuviewdoc.fsq.pub/components/intro.html')
	}

	// 分页组件
	const handlePaging = () => {
		uni.$u.route('/pages/other/webView/webView?url=https://demo.z-paging.zxlee.cn/')
	}
	const handleLongPaging = () => {
		uni.navigateTo({
			url: '/pages/other/paging/paging',
			animationType: 'slide-in-left'
		})
	}

	const handleIcon = () => {
		uni.$u.route('/pages/other/iconfont/iconfont')
	}
	const handleChart = () => {
		uni.$u.route('/pages/other/webView/webView?url=https://www.ucharts.cn/v2/')
	}
	const handleLongChart = () => {
		uni.navigateTo({
			url: '/pages/other/chart/chart',
			animationType: 'slide-in-left'
		})
	}
	
</script>

<style>

</style>
<style lang="scss" scoped>
	.u-btn {
		margin: 20rpx;
	}
</style>
