<template>
	<view class="panel" v-for="(item, index) in list" :key="index">
		<view class="panel-h panel-item" :class="{'panel-h-a': item.open}" @click="triggerCollapse(index)" hover-class="panel-item-a">
			<text>{{item.name}}</text>
			<text class="arrow iconfont" :class="[item.open? 'icon-outline-arrow-up-1' : 'icon-outline-arrow-down-1' ]"></text>
		</view>
		<view class="panel-c-w" v-show="item.open && item.pages && item.pages.length ">
			<view class="panel-c panel-item" v-for="(page, indey) in item.pages" :key="indey" hover-class="panel-item-a" @click="route(page.url)">
				<text>{{page.name}}</text>
				<text class="arrow iconfont icon-outline-arrow-right-1"></text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "z-panel",
	}
</script>

<script setup>
	import {
		ref,
		inject,
		toRefs
	} from 'vue';

	const route = inject('route')

	const props = defineProps({
		list: {
			type: Array,
			required: true,
			default: () => []
		}
	})

	const {
		list
	} = toRefs(props)

	const triggerCollapse = (index) => {
		const curItem = {
			...list.value[index]
		}

		if (!curItem.page && curItem.url) {
			route(curItem.url)
			return
		}
		list.value.forEach((item, index) => {
			item.open = false
		})
		if (curItem.open) return
		list.value[index].open = true
	}
</script>

<style lang="scss" scoped>
	.panel {
		margin: 20rpx 30rpx 20rpx;
		border-radius: 2rpx;

		.arrow {
			color: #acacac;
			font-size: 24rpx;
		}

		.panel-item {
			height: 72rpx;
			line-height: 72rpx;
			padding: 0 20rpx;
			background-color: #fff;
		}

		.panel-item-a {
			background-color: #ebebeb;
		}

		.panel-h {
			display: flex;
			justify-content: space-between;
			color: #000;

		}

		.panel-h-a {
			background-color: #ebebeb;
		}

		.panel-c {
			margin-bottom: 2rpx;

			display: flex;
			justify-content: space-between;
			color: #000;
		}

		.panel-c:last-child {
			margin-bottom: 0rpx;
		}

	}
</style>