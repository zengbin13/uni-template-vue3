<template>
	<view>
		<z-navbar :title="title"></z-navbar>
		<!-- #ifdef APP-PLUS -->
		<view class="video-caontainer">
			<view>
				注: video等原生组件时不能出现滚动，否则会覆盖正常组件
			</view>
			<view>
				注: 样式一般对原生组件内部无效
			</view>
			<view v-for="item in 5" :key="item" class="line">{{item}}</view>
			<view class="video-wrap">
				<video src="https://tqw-file-dev.oss-cn-chengdu.aliyuncs.com/视频2.mp4"></video>
				<video class="video-mp4" :controls="false" :src="videoSrc" object-fit="cover"></video>
				<video class="video-stsp" autoplay :controls="false" :src="rtspVideo" object-fit="container" is-live></video>
			</view>
			<view v-for="item in 15" :key="item" class="line">{{item}}</view>
		</view>
		<!-- #endif -->
		<!-- #ifdef MP-WEIXIN -->
		<view class="video-caontainer">
			<view>
				注: 微信小程序live-player组件需企业账号 直播权限
			</view>
			<view v-for="item in 5" :key="item" class="line">{{item}}</view>
			<view class="video-wrap">
				<live-player src="https://sf1-hscdn-tos.pstatp.com/obj/media-fe/xgplayer_doc_video/flv/xgplayer-demo-720p.flv" style="width: 300px; height: 225px;" @statechange="statechange"
					@error="error" />
				<live-player :src="rtmpVideo" autoplay style="width: 300px; height: 225px;" />
			</view>
			<view v-for="item in 10" :key="item" class="line">{{item}}</view>
		</view>
		<!-- #endif -->
		<!-- #ifdef H5 -->
		<view class="video-caontainer">
			<view class="video-wrap">
				<video :controls="false" :src="hlsVideo" object-fit="cover"></video>
			</view>
			<view v-for="item in 5" :key="item" class="line">{{item}}</view>
		</view>
		<!-- #endif -->
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


	const title = ref('直播')
	const videoSrc = ref('http://localhost:3000/#/pages-temp/template/video/video')

	const rtspVideo = ref('rtsp://172.16.30.100:8557/h264')
	// rtsp://wowzaec2demo.streamlock.net/vod/mp4:BigBuckBunny_115k.mov

	const flvVideo = ref('https://sf1-hscdn-tos.pstatp.com/obj/media-fe/xgplayer_doc_video/flv/xgplayer-demo-720p.flv')

	const rtmpVideo = ref('rtmp://58.200.131.2:1935/livetv/gxtv')
	// rtmp://58.200.131.2:1935/livetv/hunantv

	const hlsVideo = ref('https://sf1-hscdn-tos.pstatp.com/obj/media-fe/xgplayer_doc_video/hls/xgplayer-demo.m3u8')

	// #ifdef MP-WEIXIN
	const statechange = e => {
		console.log('live-player code:', e.detail.code)
	}
	const error = e => {
		console.error('live-player error:', e.detail.errMsg)
	}
	// #endif
</script>

<style lang="scss" scoped>
	.video-caontainer {
		display: flex;
		flex-direction: column;
		// justify-content: center;
		// align-items: center;

		.line {
			margin: 20rpx;
			padding: 10rpx;
			background-color: $uni-bg-color-grey;
			text-align: center;
		}

		.video-wrap {
			display: flex;
			flex-direction: column;
			align-items: center;

			.video-mp4 {
				width: 320px;
				height: 180px;
				margin-bottom: 20rpx;
			}

			.video-stsp {
				width: 320px;
				height: 180px;
				margin-bottom: 20rpx;
			}
		}

	}
</style>