<template>
	<view>
		<u-navbar title="首页" :is-back="false">
		</u-navbar>
		<button @click="test">测试</button>
	</view>
</template>

<script setup>
	const test = () => {
		console.log('xxx');
		uni.login({
			provider: 'weixin',
			success(res) {
				console.log(res);
			},
			fail(e) {
				console.log(e);
			}
		})
	}
</script>

<style>

</style>
<style lang="scss" scoped>

</style>