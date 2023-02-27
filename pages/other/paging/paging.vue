<template>
	<view>
		<z-paging ref="paging" v-model="dataList" @query="queryList">
			<template #top>
				<view class="status-bar-white">
					<z-tabs :list="tabList" @change="tabChange" />
				</view>
			</template>
			<view class="item" v-for="(item,index) in dataList">
				<u-image width="100rpx" height="100rpx" :src="item.avatar_url" shape="circle" bg-color="#b3e1ff">
				</u-image>
				<view class="item-title">{{item.login}}</view>
			</view>
		</z-paging>
	</view>
</template>

<script setup>
	// https://blog.csdn.net/weixin_43829154/article/details/120697007
	// https://github.com/SmileZXLee/uni-z-paging/blob/main/z-paging/pages/common-demo/common-demo.vue
	import {
		ref
	} from 'vue';
	const paging = ref(null)
	let dataList = ref([])
	let tabList = ref(['测试1', '测试2', '测试3', '测试4'])
	const tabIndex = ref(0)

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

	const tabChange = (index) => {
		tabIndex.value = index;
		paging.value.reload();
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
<style>
	page {
		background-color: #f5f7ec;
	}
</style>

<style lang="scss" scoped>
	.item {
		margin: 10rpx 30rpx;
		background-color: $u-type-primary-disabled;
		border-radius: 10rpx;
		padding: 10rpx 16rpx;
		display: flex;

		.item-title {
			font-size: 16px;
			margin-left: 20rpx;
		}
	}

	.header {
		height: 200rpx;
		background-color: #c5ffee;
	}
</style>
