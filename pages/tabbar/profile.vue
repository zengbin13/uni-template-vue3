<template>
	<view class="page-wrap">
		<z-navbar title="个人中心"></z-navbar>
		<view class="page-content">
			<uv-button type="primary" @click="handleOther">其他</uv-button>
			<uv-button type="primary" @click="logout" class="logout">退出登录</uv-button>
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


	const title = ref('标题')
	
	const handleOther = () => {
		uni.$u.route('/pages-temp/index/index')
	}

	const logout = () => {
		uni.reLaunch({
			url:'/pages/common/login'
		})
	}
</script>

<style lang="scss">	
	// page {
	// 	height: 100%;
	// 	display: flex;
	// 	flex-direction: column;
	// 	background: no-repeat top/100% url('/static/images/page_bg.png');
	// }
</style>
<style lang="scss" scoped>
.logout {
	position: fixed;
	left: 30rpx;
	right: 30rpx;
	bottom: 200rpx;
}
</style>