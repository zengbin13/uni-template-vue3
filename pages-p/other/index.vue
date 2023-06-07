<template>
	<view class="index-wrap">
		<u-navbar back-text="返回" title="其他"></u-navbar>
		<z-panel :list="list"></z-panel>
	</view>
</template>

<script setup>
	import {
		inject,
		ref
	} from 'vue';
	const route = inject('route')
	const apis = inject('apis')

	const list = ref([{
			name: '全局状态',
			open: false,
			pages: [{
				name: 'pinia',
				url: '/pages-p/other/global-status/global-status'
			}]
		}, {
			name: '网络请求',
			open: false,
			pages: [{
				name: 'luch-request',
				url: '/pages-p/other/request/request'
			}, ]
		},
		{
			name: '列表加载',
			open: false,
			pages: [{
					name: '下拉加载',
					url: '/pages-p/other/paging/paging'
				},
				{
					name: '滑动切换',
					url: '/pages-p/other/paging/paging-swiper'
				},

			]
		},
		{
			name: '图标',
			open: false,
			pages: [{
				name: 'iconfont',
				url: '/pages-p/other/iconfont/iconfont'
			}, ]
		},
		{
			name: '图表',
			open: false,
			pages: [{
				name: 'u-charts',
				url: '/pages-p/other/chart/chart'
			}, ]
		},
		{
			name: '直播',
			open: false,
			pages: [{
				name: 'video',
				url: '/pages-p/other/video/video'
			}, ]
		},
		{
			name: '唤醒',
			open: false,
			pages: [{
				name: 'APP',
				url: '/pages-p/other/awaken-app/awaken-app'
			}, ]
		},
		{
			name: '支付',
			open: false,
			pages: [{
				name: '微信',
				url: '/pages-p/other/pay/pay'
			}, ]
		},
		{
			name: '升级',
			open: false,
			pages: [{
				name: 'APP',
				url: '/pages-p/other/app-update/app-update'
			}, ]
		}
	])
</script>

<script>
	export default {

	}
</script>

<style>
	page {
		background-color: #f7f7f7;
	}
</style>
<style lang="scss" scoped>
	// 微信小程序修改组件样式使用深度选择器 ::v-deep 
	::v-deep .u-btn {
		margin: 20rpx;
	}
</style>