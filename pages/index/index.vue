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
		uni.getProvider({
			service: 'payment',
			success: function(res) {
				console.log(res)
			}
		});
	}
</script>

<style>

</style>
<style lang="scss" scoped>

</style>