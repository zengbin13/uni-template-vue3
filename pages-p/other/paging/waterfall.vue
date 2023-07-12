<template>
	<view>
		<u-navbar :title="title"></u-navbar>
		<uv-waterfall ref="waterfall" v-model="flowList" :add-time="50" column-count="2" left-gap="10" right-gap="10" column-gap="8" column-width="40" @changeList="changeList">
			<template v-slot:list1>
				<view>
					<waterfall-item v-for="(item, index) in list1" :key="index" :item="item" :width="waterfallWidth">
					</waterfall-item>
				</view>
			</template>
			<template v-slot:list2>
				<view>
					<waterfall-item v-for="(item, index) in list2" :key="index" :item="item" :width="waterfallWidth">
					</waterfall-item>
				</view>
			</template>
		</uv-waterfall>

	</view>
</template>

<script setup>
	import {
		ref,
		inject
	} from 'vue';
	import {
		onLoad,
		onShow,
		onReachBottom
	} from "@dcloudio/uni-app";

	import {
		getWaterfallList
	} from '@/mock/index.js'

	import waterfallItem from '@/pages-p/components/waterfall-item/waterfall-item.vue'

	const apis = inject('apis')
	const showToast = inject('showToast')
	const route = inject('route')

	const title = ref('瀑布流')

	const flowList = ref([])
	const list1 = ref([])
	const list2 = ref([])
	const getRandomData = async () => {
		console.log(waterfallWidth.value);
		const list = await getWaterfallList(1, 20);
		list.forEach(item => item.height = (item.height * waterfallWidth.value / item.width).toFixed(4))
		flowList.value = [...flowList.value, ...list]
	}
	const changeList = (e) => {
		if (e.name == 'list1') list1.value.push(e.value)
		if (e.name == 'list2') list2.value.push(e.value)
	}

	const waterfallWidth = ref(0)
	onLoad(async () => {
		const res = await uni.getSystemInfo()
		waterfallWidth.value = (res.windowWidth - 10 - 10 - 8) / 2
		getRandomData()
	})
	onReachBottom(() => {
		getRandomData()
	})
</script>

<style>
	page {
		background-color: #f1f1f1;
	}
</style>

<style lang="scss" scoped>
	page {
		background-color: #f1f1f1;
	}
</style>