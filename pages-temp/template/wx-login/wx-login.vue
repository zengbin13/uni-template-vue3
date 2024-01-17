<template>
	<view class="page-wrap">
		<z-navbar :title="title"></z-navbar>
		<view class="page-content">
			内容
			<uv-button @click="login">登录</uv-button>
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

	const login = () => {
		uni.login({
			provider: 'weixin',
			success: function(loginRes) {
				console.log(loginRes, 'xxx');
				// 获取用户信息
				uni.getUserInfo({
					provider: 'weixin',
					success: function(infoRes) {
						console.log(infoRes, '222');
						console.log('用户昵称为：' + infoRes.userInfo.nickName);
					}
				});
			}
		});
	}
</script>

<style lang="scss" scoped>

</style>