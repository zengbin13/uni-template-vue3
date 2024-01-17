<template>
	<view class="bottom-btn-group" :style="groupStyle" :class="{fixed: fixed}">
		<uv-button v-if="btn1" shape="square" :hairline="false" type="primary" :customStyle="customStyle1"
			@click="handleClick(1)">{{btn1.text}}
		</uv-button>
		<uv-button v-if="btn2" shape="square" :hairline="false" type="primary" :customStyle="customStyle2"
			@click="handleClick(2)">{{btn2.text}}
		</uv-button>
	</view>
	<uv-safe-bottom></uv-safe-bottom>
</template>

<script>
	export default {
		name: "bottom-btn-group",
	}
</script>

<script setup>
	import {
		ref,
		inject,
		toRefs,
		computed
	} from 'vue';

	const initStyle = {
		height: '44px',
		fontWeight: 'bold',
		fontSize: '32rpx',
	}

	const emits = defineEmits(['click1', 'click2'])
	const props = defineProps({
		gap: {
			type: Number,
			default: 20,
		},
		cancelBack: {
			type: Boolean,
			default: true
		},
		btn1: {
			type: [Object, Boolean],
			default: () => {
				return {
					text: '确认',
					customStyle: {}
				}
			}
		},
		btn2: {
			type: [Object, Boolean],
			default: () => {
				return {
					text: '取消',
					customStyle: {}
				}
			}
		},
		fixed: {
			type: Boolean,
			default: false,
		}
	})

	const {
		fixed,
		btn1,
		btn2,
		gap,
		cancelBack
	} = toRefs(props)

	const groupStyle = computed(() => {
		let column = 0
		if (btn1.value) column++
		if (btn2.value) column++
		return {
			display: 'grid',
			gridTemplateColumns: `repeat(${column}, 1fr)`,
			gap: `${gap.value}rpx`,
			padding: `${gap.value}rpx`,
		}
	})

	const customStyle1 = computed(() => {
		if (!btn1.value) return initStyle
		return Object.assign({}, initStyle, btn1.value.customStyle || {})
	})
	const customStyle2 = computed(() => {
		if (!btn2.value) return initStyle
		return Object.assign({}, initStyle, {
			background: '#cddbe9',
			color: uni.$uv.config.color['uv-primary'],
			border: 'none'
		}, btn2.value.customStyle || {})
	})

	const handleClick = (num) => {
		if (cancelBack.value && num == 2) {
			uni.navigateBack()
			return
		}
		emits(`click${num}`)
	}
</script>

<style lang="scss" scoped>
	.fixed {
		position: fixed;
		z-index: 9;
		width: 100%;
		bottom: 0;
		left: 0;
		right: 0;
	}

	.bottom-btn-group {}
</style>