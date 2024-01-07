<template>
	<view class="splash-page">
		<swiper :indicator-dots="true" :autoplay="false" :interval="3000" :duration="1000">
			<swiper-item v-for="(item, index) in splashList" :key="index" class="swiper-item">
				<view class="swiper-content">
					<image :src="item.img" mode="widthFix" class="img"></image>
					<view class="title">{{item.title}}</view>
					<view class="desc">{{item.desc}}</view>
					<view class="enter-button"  @click="handleEnterLogin" v-if="splashList.length - 1== index">
						立即进入
					</view>
				</view>
			</swiper-item>
		</swiper>
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
	const splashList = [{
		img: '/static/images/splash1.png',
		title: '日程管理',
		desc: '待办任务一目了然，高效处理'
	}, {
		img: '/static/images/splash2.png',
		title: '任务管理',
		desc: '移动签审，快捷方便'
	}, {
		img: '/static/images/splash3.png',
		title: '消息管理',
		desc: '多种方式，实时提现'
	}]
	
	const handleEnterLogin = () => {
		uni.navigateTo({
			url: uni.env.VITE_LOGIN_PAGE
		})
	}
</script>

<style lang="scss" scoped>
	page {
		background-color: #fff;
	}
</style>
<style lang="scss" scoped>
	.splash-page {
		flex: 1;
		display: flex;
		flex-direction: column;
		height: 100vh;

		swiper {
			height: 100vh;

			.swiper-item {
				height: 100vh;
			}
		}
	}

	.swiper-content {
		display: flex;
		flex-direction: column;
		align-items: center;
		text-align: center;
		.enter-button {
			margin-top: 100rpx;
			width: 302rpx;
			height: 96rpx;
			background: $uni-color-primary;
			box-shadow: 0rpx 4rpx 20rpx 4rpx lighten($uni-color-primary, 30%);
			border-radius: 48rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			font-size: 32rpx;
			font-weight: 500;
			color: #FFFFFF;
			line-height: 44rpx;
		}

		.img {
			margin-top: 22vh;
			margin-bottom: 5vh;
			width: 600rpx;
		}

		.title {
			font-size: 48rpx;
			font-weight: 500;
			color: #000000;
			line-height: 66rpx;
			margin-bottom: 32rpx;
		}

		.desc {
			font-size: 32rpx;
			font-weight: 400;
			color: #666666;
			line-height: 44rpx;
		}
	}


	.button-wrap {
		height: 360rpx;
		display: flex;
		align-items: center;
		padding: 20rpx 50rpx;

	}

	::v-deep(.uni-swiper-wrapper) {
		.uni-swiper-dots {
			bottom: 120rpx;
		}
		.uni-swiper-dot {
			width: 16rpx;
			height: 16rpx;
			background: $uni-color-primary;
			opacity: 0.5;
		}
		.uni-swiper-dot-active {
			width: 84rpx;
			height: 16rpx;
			background: $uni-color-primary;
			border-radius: 16rpx;
			opacity: 1;
		}
	}

	
</style>