<template>
	<z-paging ref="pagingRef" v-model="dataList" @query="queryList" :default-page-size="defaultPageSize" auto
		class="paging-wrap">
		<!-- 顶部插槽 -->
		<template #top>
			<z-navbar :title="totalTitle"></z-navbar>
			<view class="search-box">
				<uv-search placeholder="请输入搜索内容" shape="square" v-model="queryForm.name" :clearabled="true"
					:showAction="false" searchIconColor="#3C3C43" searchIconSize="26"></uv-search>
			</view>
		</template>

		<!-- 内容区域 -->
		<template v-if="dataList.length">
			<view class="item" v-for="(item,index) in dataList" :key="index">
				<uv-avatar text="李"></uv-avatar>
				<view class="item-title">{{item.name}}</view>
			</view>
		</template>
	</z-paging>
</template>

<script setup>
	import {
		ref,
		inject,
		watch
	} from 'vue';
	import {
		onLoad,
		onShow
	} from "@dcloudio/uni-app";
	import {
		getTableData as getTableDataApi
	} from '@/apis/modules/ohter.js'

	import {
		usePaging
	} from '@/hooks/usePaging/index.js'

	// 加载
	const {
		pagingRef,
		total,
		totalTitle,
		queryList,
		dataList,
		queryForm,
		defaultPageSize,
		getDataList,
		refresh
	} = usePaging(getTableDataApi, {
		title: '列表加载',
		init: {
			limit: 20,
		}
	})


	watch(() => queryForm.value.name, (value) => {
		uni.$uv.debounce(() => getDataList(), 500)
	})
</script>

<style lang="scss" scoped>
	:deep(.uv-search) {

		.uv-search__content,
		.uv-search__content__input {
			background-color: transparent !important;
		}
	}

	.paging-wrap {
		padding: 0 30rpx;
	}

	.search-box {
		height: 72rpx;
		background: rgba(118, 118, 128, 0.12);
		border-radius: 20rpx;
		margin-bottom: 20rpx;
		margin-top: 10rpx;
		display: flex;
		align-items: center;
	}

	.item {
		margin-bottom: 20rpx;
		padding: 20rpx;
		border-radius: 10rpx;
		background-color: #fff;
		display: flex;
		align-content: center;

		.item-title {
			margin-left: 20rpx;
			line-height: 40px;

		}
	}
</style>