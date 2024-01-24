<template>
	<view class="page-wrap">
		<!-- 背景图 -->
		<view class="top">
			<view class="top-content">
				<image src="https://thispersondoesnotexist.com/" mode="widthFix" class="avatar"></image>
			</view>

			<!-- 波浪 start -->
			<view class="tnwave waveAnimation">
				<view class="waveWrapperInner bgTop">
					<view class="wave waveTop"
						style="background-image: url('https://resource.tuniaokj.com/images/wave/wave-2.png')"></view>
				</view>
				<view class="waveWrapperInner bgMiddle">
					<view class="wave waveMiddle"
						style="background-image: url('https://resource.tuniaokj.com/images/wave/wave-2.png')"></view>
				</view>
				<view class="waveWrapperInner bgBottom">
					<view class="wave waveBottom"
						style="background-image: url('https://resource.tuniaokj.com/images/wave/wave-1.png')"></view>
				</view>
			</view>
			<!-- 波浪 end -->
		</view>
		<view class="bottom">
			xx
		</view>
	</view>
</template>

<script setup>
	import {
		ref,
	} from 'vue';
	import {
		onLoad,
		onShow
	} from "@dcloudio/uni-app";

	const title = ref('标题')
</script>


<style>
	page {
		background: #fff;
	}
</style>
<style lang="scss" scoped>
	.top {
		background-image: url('https://resource.tuniaokj.com/images/swiper/summer.jpg');
		background-size: cover;
		background-position: center;
		background-repeat: no-repeat;
		height: 450rpx;
	}
	
	.avatar {
		width: 120rpx;
		height: 120rpx;
		border-radius: 50%;
	}
	.top-content {
		display: flex;
		justify-content: center;
	}


	/* 波浪*/
	@keyframes move_wave {
		0% {
			transform: translateX(0) translateZ(0) scaleY(1)
		}

		50% {
			transform: translateX(-25%) translateZ(0) scaleY(1)
		}

		100% {
			transform: translateX(-50%) translateZ(0) scaleY(1)
		}
	}

	.tnwave {
		overflow: hidden;
		position: absolute;
		z-index: 9999;
		height: 200rpx;
		left: 0;
		right: 0;
		top: 250rpx;
		bottom: auto;
	}

	.waveWrapperInner {
		position: absolute;
		width: 100%;
		overflow: hidden;
		height: 100%;
	}

	.wave {
		position: absolute;
		left: 0;
		width: 200%;
		height: 100%;
		background-repeat: repeat no-repeat;
		background-position: 0 bottom;
		transform-origin: center bottom;
	}

	.bgTop {
		opacity: 0.4;
	}

	.waveTop {
		background-size: 50% 45px;
	}

	.waveAnimation .waveTop {
		animation: move_wave 4s linear infinite;
	}

	.bgMiddle {
		opacity: 0.6;
	}

	.waveMiddle {
		background-size: 50% 40px;
	}

	.waveAnimation .waveMiddle {
		animation: move_wave 3.5s linear infinite;
	}

	.bgBottom {
		opacity: 0.95;
	}

	.waveBottom {
		background-size: 50% 35px;
	}

	.waveAnimation .waveBottom {
		animation: move_wave 2s linear infinite;
	}

	/* 波浪*/
</style>