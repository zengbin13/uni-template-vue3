<template>
	<view>
		<u-navbar title="首页" :is-back="false"></u-navbar>
		<button @click="request">请求</button>
	</view>
</template>

<script setup>
	import {
		ref,
		inject
	} from 'vue';
	import {
		onLoad,
		onShow
	} from "@dcloudio/uni-app";

	const request = () => {
		uni.request({
			url: 'https://www.pexels.com/zh-cn/api/v2/feed?seed=2023-06-08T13%3A22%3A16.704Z&per_page=12&seo_tags=true',
			header: {
				cookie: '_gid=GA1.2.2047915244.1686301192; _sp_ses.9ec1=*; _gat=1; _sp_id.9ec1=378ce2b5-6e10-4aa6-b43b-51ae219bb933.1686301192.1.1686301193..202b1f09-bb33-4381-ace8-de9891eb3cc3..6cfcea7e-abc2-40b1-810a-63626c8d56db.1686301192701.1; OptanonConsent=isGpcEnabled=0&datestamp=Fri+Jun+09+2023+16%3A59%3A53+GMT%2B0800+(%E4%B8%AD%E5%9B%BD%E6%A0%87%E5%87%86%E6%97%B6%E9%97%B4)&version=202301.1.0&isIABGlobal=false&hosts=&landingPath=https%3A%2F%2Fwww.pexels.com%2Fzh-cn%2F&groups=C0001%3A1%2CC0002%3A1%2CC0003%3A1; __cf_bm=4Vgrt7bLzbM7mZxvDFIk3n9nQiAgF2w3hChqATlnqVo-1686301193-0-AX/aE6LFn+Kkrkvq+U3DXU4ZdqCBL+RLKMmp642YTF/QrvnF+HkAtrjLmVTUmbJ3OOXhVTSlZo27FCMY+aTVV4MtjrFO6yF52MEWqCbVTzFY; _ga_8JE65Q40S6=GS1.1.1686300978.1.1.1686301195.0.0.0; _ga=GA1.1.675832179.1686301192',
				Referer: 'https://www.pexels.com/zh-cn/'
			},
			success(e) {
				console.log(e);
			},
			fail(e) {
				console.log(e);
			}
		})
	}
</script>

<style lang="scss" scoped>

</style>