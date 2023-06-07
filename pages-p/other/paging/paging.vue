<template>
	<view>
		<z-paging ref="paging" v-model="dataList" @query="queryList">
			<template #top>
				<u-navbar title="下拉刷新"></u-navbar>
			</template>
			<view class="item" v-for="(item,index) in dataList" :key="index">
				<image :src="item.avatar_url" mode="widthFix" class="avatar"></image>
				<view class="item-title">{{item.login}}</view>
			</view>
		</z-paging>
	</view>
</template>

<script setup>
	import {
		ref,
		inject
	} from 'vue';
	const apis = inject('apis')

	const paging = ref(null)
	let dataList = ref([])

	const queryList = (pageNo, pageSize) => {
		apis.common.requestListApi({
			pageNo,
			pageSize
		}).then(res => {
			paging.value.complete(res.data);
		}).catch(res => {
			paging.value.complete(false);
		})
	}
</script>


<style lang="scss" scoped>
	.item {
		display: flex;
		justify-content: space-between;
		padding: 20rpx 30rpx;
		background-color: #f4edff;
		margin: 10rpx 15rpx 10rpx;
		border-radius: 10rpx;

		.avatar {
			width: 80rpx;
			height: 80rpx;
			border-radius: 50%;
			background-color: #FFF;
		}
	}
</style>