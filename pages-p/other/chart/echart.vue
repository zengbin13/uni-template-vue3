<template>
	<view>
		<z-navbar :title="title"></z-navbar>
		<view><l-echart ref="echartRef" @finished="initChart"></l-echart></view>
		<!-- <lime-echart></lime-echart> -->
	</view>
</template>

<script setup>
	import {
		ref,
		inject,
		onMounted
	} from 'vue';
	import {
		onLoad,
		onShow,
	} from "@dcloudio/uni-app";

	import * as echarts from 'echarts'
	// import * as echarts from '@/uni_modules/lime-echart/static/echarts.min'

	const apis = inject('apis')
	const showToast = inject('showToast')
	const route = inject('route')

	const title = ref('标题')

	const options = ref({
		tooltip: {
			trigger: 'axis',
			axisPointer: {
				type: 'shadow'
			},
			confine: true
		},
		legend: {
			data: ['热度', '正面', '负面']
		},
		grid: {
			left: 20,
			right: 20,
			bottom: 15,
			top: 40,
			containLabel: true
		},
		xAxis: [{
			type: 'value',
			axisLine: {
				lineStyle: {
					color: '#999999'
				}
			},
			axisLabel: {
				color: '#666666'
			}
		}],
		yAxis: [{
			type: 'category',
			axisTick: {
				show: false
			},
			data: ['汽车之家', '今日头条', '百度贴吧', '一点资讯', '微信', '微博', '知乎'],
			axisLine: {
				lineStyle: {
					color: '#999999'
				}
			},
			axisLabel: {
				color: '#666666'
			}
		}],
		series: [{
				name: '热度',
				type: 'bar',
				label: {
					normal: {
						show: true,
						position: 'inside'
					}
				},
				data: [300, 270, 340, 344, 300, 320, 310],
			},
			{
				name: '正面',
				type: 'bar',
				stack: '总量',
				label: {
					normal: {
						show: true
					}
				},
				data: [120, 102, 141, 174, 190, 250, 220]
			},
			{
				name: '负面',
				type: 'bar',
				stack: '总量',
				label: {
					normal: {
						show: true,
						position: 'left'
					}
				},
				data: [-20, -32, -21, -34, -90, -130, -110]
			}
		]
	})
	const echartRef = ref(null)
	// onMounted(() => {
	// 	echartRef.value.init(echarts, chart => {
	// 		chart.setOption(options.value);
	// 	});
	// })
	const initChart = async () => {
		console.log('initChart', uni.canIUse('createOffscreenCanvas'), uni.createOffscreenCanvas);
		const chart = await echartRef.value.init(echarts);
		chart.setOption(options.value)
	}
</script>

<style lang="scss" scoped>

</style>