<template>
	<view class="status-bar">
		<web-view :webview-styles="webviewStyles" :src="url"></web-view>
	</view>
</template>

<script setup>
	import {
		reactive, ref, toRefs
	} from "vue";
	import {
		onLoad,
	} from "@dcloudio/uni-app";


	onLoad((option) => {
		console.log(option);
		console.log(state);
		state.url = option.url
	})

	const state = reactive({
		webviewStyles: {
			progress: {
				color: '#2979ff'
			}
		},
		url: ''
	})
	
	const {webviewStyles, url} = toRefs(state)
</script>

<style>

</style>
