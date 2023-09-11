<template>
	<view>
		<z-navbar title="首页" :is-back="false"></z-navbar>
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
</script>

<style lang="scss" scoped>

</style>