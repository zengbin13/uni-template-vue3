<template>
	<view>
		<view class="position shape">
			<!-- 进度条 -->
			<view class="progress-bar">
				<text>{{normalizedDuration}}</text>
				<slider class="bar" :max="duration" :min="0" :value="currentTime" :step="sliderStep" backgroundColor="#E4E5E6"
		block-color="#3D8E86"			active-color="#3D8E86" :block-size="10" @change="onSliderChange" @changing="onSliderChanging" />
				<text>{{normalizedCurrentTime}}</text>
			</view>
			<!-- 控制台 -->
			<view class="control-board">
				<view class="shangyishou" @click="prev()">
					<image src="/static/images/template/prev.png" mode="heightFix"></image>
				</view>
				<view :class="middleIcon" @click="toggle()" >
					<image v-if="isActive" src="/static/images/template/toggle.png" mode="heightFix"></image>
					<image v-else src="/static/images/template/next.png" mode="heightFix"></image>
				</view>
				<view class="xiayishou" @click="next()">
					<image src="/static/images/template/next.png" mode="heightFix"></image>
				</view>
			</view>
		</view>
	</view>
</template>


<script setup>
	import {
		computed,
		watch,
	} from "vue"
	import {
		useAudio
	} from "@/hooks/useAudio/index.js"

	const list = [
		'https://tqw-file-dev.oss-cn-chengdu.aliyuncs.com/m1_1708933824157.mp3',
		'https://tqw-file-dev.oss-cn-chengdu.aliyuncs.com/m2_1708933838991.mp3',
		'https://tqw-file-dev.oss-cn-chengdu.aliyuncs.com/m3_1708933854182.mp3'
	]

	const {
		seek,
		prev,
		next,
		toggle,
		isActive,
		duration,
		currentTime,
		normalizedDuration,
		normalizedCurrentTime
	} = useAudio(list)


	const onSliderChange = e => seek(e.detail.value)
	const onSliderChanging = e => seek(e.detail.value, true)

	const sliderStep = computed(() => duration.value / 100)
	const middleIcon = computed(() => isActive.value ? 'play' : 'pause')
</script>


<style lang="scss" scoped>
	.shape {
		margin-top: 300rpx;
	}
	.progress-bar {
		display: flex;
		align-items: center;
		padding: 0 20rpx;
		.bar {
			flex: 1;
		}
		text {
			font-size: 24rpx;
			color: #333;
		}
	}
	
	.control-board {
		display: flex;
		align-items: center;
		justify-content: space-between;
		width: 60%;
		margin: 0 auto;
		image {
			width: 64rpx;
			height: 64rpx;
		}
		.play, .pause {
			image {
				width: 84rpx;
				height: 84rpx;
			}
		}
	}

	:deep(.uni-slider-wrapper) {
		.uni-slider-handle-wrapper {
			height: 8rpx !important;
		}
	}
</style>