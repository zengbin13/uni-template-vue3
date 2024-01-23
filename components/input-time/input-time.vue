<template>
	<view class="input-time">
		<!-- 范围 -->
		<uni-datetime-picker :modelValue="modelValue" @update:modelValue="changeValue" type="daterange" v-if="isRange"
			:clearIcon="!isRequired" :disabled="disabled" :border="false">
		</uni-datetime-picker>
		<!-- 时间点 -->
		<uni-datetime-picker :type="isHour ?'datetime' : 'date'" :hide-second="!hasSecond" :modelValue="modelValue"
			v-else @update:modelValue="changeValue" :border="false" :clearIcon="!isRequired" :disabled="disabled" />
	</view>
</template>

<script>
	export default {
		name: "input-time",
		options: {
			styleIsolation: 'shared'
		}
	}
</script>

<script setup>
	import {
		ref,
		inject,
		toRefs
	} from 'vue';

	const emits = defineEmits(['update:modelValue'])
	const props = defineProps({
		// 时间类型
		isRange: {
			type: Boolean,
			default: false // 时间范围
		},
		isRequired: {
			type: Boolean,
			default: false 
		},
		// 输入值
		modelValue: {
			type: [String, Number, Array],
			default: ''
		},
		// 是否显示小时
		isHour: {
			type: Boolean,
			default: false
		},
		// 是否显示秒
		hasSecond: {
			type: Boolean,
			default: false
		},
		// 不可用
		disabled: {
			type: Boolean,
			default: false
		},
	})

	const {
		type,
		modelValue,
		isHour,
		isRange,
		disabled,
		isRequired
	} = toRefs(props)

	const changeValue = (value) => {
		emits('update:modelValue', value)
	}
</script>

<style lang="scss" scoped>
	.input-time {
		display: flex;
		flex: 1;
		justify-content: flex-end;
		align-items: center;
		overflow: hidden;
		border-radius: 5rpx;
	}

	:deep(.uni-date) {
		.uni-date-x {
			background-color: transparent;
		}
		.uniui-calendar {
			color: $uni-color-primary !important;
		}
	}
</style>