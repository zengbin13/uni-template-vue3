<template>
	<view>
		<u-navbar :title="title"></u-navbar>
		<view class="">
			<view style="margin: 10px;">{{isExistApp ? '存在' : '不存在'}}{{pname}}</view>
			<button @click="awakenApp">{{isExistApp ? '打开' : '下载'}}App</button>
		</view>
		<view class="">
			<input type="text" v-model="query" style="margin: 10px;">
			<button @click="openMap">打开百度地图</button>
		</view>
	</view>
</template>

<script setup>
	// https://ask.dcloud.net.cn/article/35621
	// https://blog.csdn.net/qq_39970857/article/details/118105353
	import {
		ref,
		inject
	} from 'vue';
	import {
		onLoad,
		onShow
	} from "@dcloudio/uni-app";

	const apis = inject('apis')
	const showToast = inject('showToast')
	const route = inject('route')

	const title = ref('唤醒App')

	// 包名:com.tencent.mobileqq
	// 启动类: com.tencent.mobileqq.activity.SplashActivity
	// com.icbc
	// com.icbc.activity.init.NewLoadingActivity
	// com.icbc.androidclient://
	const pname = ref('com.icbc')
	const action = ref('com.icbc.activity.init.NewLoadingActivity')

	const isExistApp = ref(plus.runtime.isApplicationExist({
		pname: pname.value
	}))

	const awakenApp = () => {
		if (plus.os.name !== 'Android') return
		const extraData = {
			"uid": 123456,
			"username": "xxx"
		}
		if (isExistApp.value) {
			// 存在
			plus.runtime.launchApplication({
				pname: pname.value,
				action: action.value,
				// 传递参数
				extra: extraData
			}, (e) => {
				uni.showToast({
					title: "打开失败",
					icon: "none"
				})
			})
		} else {
			// 不存在
			plus.runtime.openURL(`mimarket://details?id=${pname.value}`);

		}
	}

	const query = ref('学校')
	const openMap = () => {
		// 是否存在百度地图
		const hasBaiduMap = plus.runtime.isApplicationExist({
			pname: 'com.baidu.BaiduMap',
			action: 'baidumap://'
		});
		if (!hasBaiduMap) return
		const urlBaiduMap = `baidumap://map/place/search?query=${query.value}&region=chongqing&src=andr.baidu.openAPIdemo`;
		plus.runtime.openURL(urlBaiduMap);
	}
</script>

<style lang="scss" scoped>

</style>