<template>
	<view>
		<u-navbar :title="title"></u-navbar>
		<qiun-data-charts type="ring" :opts="opts" :chartData="chartData" />
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
		onReady,
	} from "@dcloudio/uni-app";

	const apis = inject('apis')
	const showToast = inject('showToast')
	const route = inject('route')

	const title = ref('标题')

	const chartData = ref({})
	const opts = ref({
		rotate: false,
		rotateLock: false,
		color: ["#5981e6", "#f5855a", "#44c7e0", "#fbcb3d", "#3CA272", "#FC8452", "#9A60B4", "#ea7ccc"],
		padding: [10, 10, 10, 10],
		dataLabel: true,
		enableScroll: false,
		legend: {
			show: false,
		},
		title: {
			name: "总资产",
			fontSize: 13,
			color: "#c0c0c0"
		},
		subtitle: {
			name: "2,822.32",
			fontSize: 18,
			color: "#010101"
		},
		extra: {
			ring: {
				ringWidth: 30,
				activeOpacity: 0.5,
				activeRadius: 0,
				offsetAngle: 0,
				labelWidth: 10,
				border: false,
				borderWidth: 3,
				borderColor: "#fff"
			},
			markLine: {
				data: [{
					labelText: 'xx'
				}]
			}
		}
	})
	onReady(() => {
		getServerData()
	})
	const getServerData = () => {
		setTimeout(() => {
			let res = {
				series: [{
					data: [{
						"name": "基金",
						"value": 1463.04
					}, {
						"name": "余额宝",
						"value": 918.11
					}, {
						"name": "余额",
						"value": 439.00
					}, {
						"name": "黄金",
						"value": 2.17
					}, ]
				}]
			};
			chartData.value = JSON.parse(JSON.stringify(res));
		}, 500);
	}
</script>

<style lang="scss" scoped>

</style>ssss