<template>
	<z-paging ref="pagingRef" v-model="dataList" @query="queryList" :default-page-size="defaultPageSize"
		:paging-style="{padding: '0 30rpx'}" auto>
		<!-- 顶部插槽 -->
		<template #top>
			<z-navbar :title="totalTitle"></z-navbar>
			<view style="margin-bottom: 20rpx;">
				<uv-tabs :list="tabList" :current="current" @click="toggleTab" :activeStyle="activeStyle"></uv-tabs>
			</view>
		</template>

		<!-- 内容区域 -->
		<template v-if="dataList.length">
			<view class="item" v-for="(item,index) in dataList" :key="index">
				<template v-if="current == 0">
					<uv-avatar text="前"></uv-avatar>
				</template>
				<template v-if="current == 1">
					<uv-avatar text="中"></uv-avatar>
				</template>
				<template v-if="current == 2">
					<uv-avatar text="后"></uv-avatar>
				</template>
				<view class="item-title">{{item.name}}</view>
			</view>
		</template>
	</z-paging>
</template>

<script setup>
	import {
		ref,
		inject,
		watch,
		computed
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
	} = usePaging((params) => getTableDataApi({
		...params,
		queryCondition: {
			...params.queryCondition,
			attachmentType: curTab.value.type
		}
	}), {
		title: 'Tabs列表',
		init: {
			limit: 20,
		}
	})


	// tabs
	const current = ref(0)
	const toggleTab = (e) => {
		current.value = e.index
		getDataList()
	}
	const tabList = ref([{
		name: '修前',
		type: '1'
	}, {
		name: '修中',
		type: '2'
	}, {
		name: '修后',
		type: '3'
	}])
	const curTab = computed(() => {
		return tabList.value[current.value]
	})
	const activeStyle = {
		color: '#303133',
		fontWeight: 'bold',
		transform: 'scale(1.05)'
	}
</script>

<style lang="scss" scoped>
	:deep(.uv-search) {

		.uv-search__content,
		.uv-search__content__input {
			background-color: transparent !important;
		}
	}

	.paging-wrap {
		padding: 0 30rpx !important;
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