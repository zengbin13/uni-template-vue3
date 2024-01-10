<template>
	<view class="page-wrap">
		<z-navbar :title="title"></z-navbar>
		<view class="page-content">
			<uv-cell-group>
				<uv-cell icon="map-fill" title="列表加载" isLink url="/pages-temp/template/refresh-list/refresh-list" ></uv-cell>
				<uv-cell icon="map-fill" title="提交表单" isLink url="/pages-temp/template/form/form" ></uv-cell>
			</uv-cell-group>
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
</script>

<style lang="scss" scoped>

</style>