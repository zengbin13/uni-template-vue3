<template>
	<view class="page-wrap">
		<view class="page-content">
			<view v-for="(item,index) in 100" :key="index">
				{{item}}
			</view>
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



</script>

<style lang="scss">	
</style>
<style lang="scss" scoped>
</style>