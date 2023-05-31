<template>
	<view>
		<u-navbar title="微信登录"></u-navbar>
		<u-button @click="login">微信登录</u-button>
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
		console.log('xxxxx');
	}
</script>

<style lang="scss" scoped>

</style>