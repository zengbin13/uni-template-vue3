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
		ref
	} from 'vue';
	const paging = ref(null)
	let dataList = ref([])

	const queryList = (pageNo, pageSize) => {
		requestApi({
			pageNo,
			pageSize
		}).then(res => {
			paging.value.complete(res.data);
		}).catch(res => {
			paging.value.complete(false);
		})
	}

	const requestApi = async ({
		pageNo,
		pageSize
	}) => {
		try {
			const res = await uni.request({
				url: `https://api.github.com/users?since=${pageNo * pageSize - pageSize}`
			})
			return res
		} catch (e) {
			//TODO handle the exception
		}
	}
</script>


<style lang="scss" scoped>
	.item {
		display: flex;
		justify-content: space-between;
		padding: 20rpx 30rpx;
		background-color: #f4edff;
		margin-bottom: 20rpx;

		.avatar {
			width: 80rpx;
			border-radius: 50%;
		}
	}
</style>