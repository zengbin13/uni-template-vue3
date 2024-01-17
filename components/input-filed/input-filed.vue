<template>
	<view class="content">
		<view class="prefix" v-if="$slots.prefix">
			<slot name="prefix">
			</slot>
		</view>
		<input v-if="isNumber" type="number" :placeholder="!disabled ? placeholder : ''" class="input" :value="modelValue"
			@input="changeValue($event.detail.value)" :disabled="disabled" :class="{'disabled': disabled}" min="0"
			:maxlength="max" />
		<input v-else type="text" :placeholder="!disabled ? placeholder : ''" class="input" :value="modelValue"
			@input="changeValue($event.detail.value)" :disabled="disabled" :class="{'disabled': disabled}"
			:maxlength="max" />
		<view class="unit" v-if="unit">
			{{unit}}
		</view>
		<view class="suffix" v-if="$slots.suffix">
			<slot name="suffix">
			</slot>
		</view>
	</view>
</template>

<script>
	export default {
		name: "input-filed",
	}
</script>

<script setup>
	import {
		ref,
		inject,
		toRefs
	} from 'vue';

	const showToast = inject('showToast')

	const emits = defineEmits(['update:modelValue'])
	const props = defineProps({
		// 输入值
		modelValue: {
			type: [String, Number],
			default: ''
		},
		// 是否为数值
		isNumber: {
			type: Boolean,
			default: false
		},
		// 占位符
		placeholder: {
			type: String,
			default: '请输入',
		},
		// 是否可输入
		disabled: {
			type: Boolean,
			default: false
		},
		// 是否可输入
		unit: {
			type: String,
			default: ''
		},
		prefix: {
			type: String,
			default: ''
		},
		max: {
			type: [String, Number],
			default: '99'
		},
		// 是否校验
		isVerif: {
			type: Boolean,
			default: true
		},
		verificationRules: {
			type: Object,
			default: () => {
				return {
					fn: (v) => {
						const number = Number(v)
						return number < 0
					},
					warn: '输入值不能小于0',
					initValue: 0,
				}
			}
		}

	})

	const {
		isNumber,
		modelValue,
		placeholder,
		disabled,
		unit,
		prefix,
		max,
		verificationRules,
		isVerif,
	} = toRefs(props)

	const changeValue = (value) => {
		if (isNumber.value && isVerif.value && verificationRules.value.fn(value)) {
			showToast(verificationRules.value.warn)
			emits('update:modelValue', verificationRules.value.initValue)
			return
		}
		emits('update:modelValue', value)
	}
</script>

<style lang="scss" scoped>
	.disabled {
		color: $uni-text-color-disable !important;
	}

	.content {
		display: flex;
		flex: 1;
		justify-content: flex-end;
		align-items: center;

		.input {
			flex: 1;
			height: 60rpx;
			border-radius: 5rpx;
			// background-color: $uni-bg-color-grey;
			padding: 0 16rpx;
			font-size: $uni-font-size-base;
			color: #000;
		}

		.unit {
			margin-left: 12rpx;
			border-radius: 5rpx;
			height: 60rpx;
			line-height: 60rpx;
			padding: 0 12rpx;
			// background-color: $uni-bg-color-grey;
		}

		.prefix,
		.suffix {
			margin-right: 12rpx;
			border-radius: 5rpx;
			height: 60rpx;
			line-height: 60rpx;
			padding: 0 6rpx;
			// background-color: $uni-bg-color-grey;
		}

	}
</style>