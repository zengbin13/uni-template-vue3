<template>
	<view>
		<u-navbar title="微信登录"></u-navbar>
		<u-button @click="login">微信登录22xxx</u-button>
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

	const login = () => {
		// 获取用户信息
		uni.getUserProfile({
			desc: '登录后可同步数据',
			lang: 'zh_CN',
			success: (res) => {
				console.log('getUserProfile', res);
			},
		});
		// uni.login({
		// 	provider: 'weixin',
		// 	success: function(loginRes) {
		// 		console.log(loginRes);
		// 		// 获取用户信息
		// 		uni.getUserInfo({
		// 			provider: 'weixin',
		// 			success: function(infoRes) {
		// 				console.log(infoRes);
		// 				console.log('用户昵称为：' + infoRes.userInfo.nickName);
		// 			}
		// 		});
		// 	}
		// });
	}
</script>

<style lang="scss" scoped>

</style>