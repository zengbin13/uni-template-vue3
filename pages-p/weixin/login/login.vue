<template>
	<view>
		<u-navbar title="微信登录"></u-navbar>
		<u-button @click="login">授权登录</u-button>
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
		uni.login({
			provider: 'weixin',
			success: res => {
				// 登录成功，获取到登录凭证 code
				const code = res.code;
				// 调用后端接口将 code 发送到服务器进行验证
				// 在后端接口中，可以使用 code 调用微信的登录接口获取用户的 openid 和 session_key
				// 根据实际需求处理登录成功后的逻辑
			},
			fail: err => {
				// 登录失败的处理逻辑
			}
		});
	}
</script>

<style lang="scss" scoped>

</style>