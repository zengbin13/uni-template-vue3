<template>
	<view class="content">
		<z-paging ref="paging" v-model="dataList" @query="queryList" :fixed="false" :auto="true">
			<view class="item" v-for="(item,index) in dataList" :key="index">
				<image :src="item.avatar_url" mode="widthFix" class="avatar"></image>
				<view class="item-title">{{item.login}}</view>
			</view>
		</z-paging>
	</view>

</template>

<script>
	export default {
		name: "swiper-list-item",
	}
</script>

<script setup>
	import {
		ref,
		watch,
		inject
	} from 'vue';

	const apis = inject('apis')

	const props = defineProps({
		tabIndex: {
			type: Number,
			default: 0
		},
		currentIndex: {
			type: Number,
			default: 0
		},
	})

	const paging = ref(null)
	const dataList = ref([])

	const queryList = (pageNo, pageSize) => {
		apis.common.requestListApi({
			pageNo,
			pageSize,
			type: props.tabIndex + 1
		}).then(res => {
			console.log(res.data);
			paging.value.complete(res.data);
		}).catch(res => {
			paging.value.complete(false);
		})
	}

	// 懒加载
	// const firstLoaded = ref(false);
	// watch(() => props.currentIndex, (v) => {
	// 	if (v === props.tabIndex && !firstLoaded.value) {
	// 		setTimeout(() => {
	// 			paging.value.reload();
	// 		}, 100);
	// 	}
	// }, {
	// 	immediate: true
	// });
</script>

<style lang="scss" scoped>
	.content {
		height: 100%;
	}

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