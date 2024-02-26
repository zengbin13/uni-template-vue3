<template>
	<view>
		<view class="position shape">
			<view class="center">
				<text>{{normalizedDuration}}</text>
				<slider class="flex-1" :max="duration" :min="0" :value="currentTime" :step="sliderStep"
					active-color="#adb5bd" :block-size="15" @change="onSliderChange" @changing="onSliderChanging" />
				<text>{{normalizedCurrentTime}}</text>
			</view>

			<view class="center">
				<view type="shangyishou" @click="prev()" size="text-3xl">上</view>
				<view :type="middleIcon" @click="toggle()" size="text-5xl px-5">暂停</view>
				<view type="xiayishou" @click="next()" size="text-3xl">
					下
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
	const middleIcon = computed(() => isActive.value ? 'bofang' : 'ziyuan')
</script>


<style lang="sass" scoped>

</style>