<template>
	<view class="input-select">
		<uni-data-select class="select" :placeholder="placeholder" :modelValue="modelValue"
			@update:modelValue="changeValue" type="daterange" :localdata="list" :clear="false" :disabled="disabled">
		</uni-data-select>
	</view>
	<slot name="right"></slot>
</template>

<script>
	export default {
		name: "input-select",
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
		// 标题
		name: {
			type: String,
			default: '选择数据'
		},
		// 占位符
		placeholder: {
			type: String,
			default: '请选择',
		},
		// 输入值
		modelValue: {
			type: [String, Number],
			default: 0
		},
		// 是否必填
		isRequired: {
			type: Boolean,
			default: true
		},
		// 是否边框
		isBorder: {
			type: Boolean,
			default: true
		},
		// 不可用
		disabled: {
			type: Boolean,
			default: false
		},
		// 选择数据
		list: {
			type: Array,
			default: () => {
				return [{
					text: '暂无数据',
					value: -1,
					disable: true,
				}]
			}
		}
	})

	const {
		name,
		isRequired,
		modelValue,
		isBorder,
		list,
		disabled
	} = toRefs(props)

	const changeValue = (value) => {
		emits('update:modelValue', value)
	}
</script>

<style lang="scss">
	.input-select {
		display: flex;
		flex: 1;
		justify-content: flex-end;
		align-items: center;

		.select {
			flex: 1;
			border-radius: 5rpx;
		}

		:deep(.uni-select) {
			border: none;
			flex: 1;
			height: 60rpx;
			border-radius: 5rpx;
			// background-color: $uni-bg-color-grey;
			font-size: $uni-font-size-base;

			.uni-select__selector {
				z-index: 99;
			}

			.uni-select__input-placeholder {
				font-size: $uni-font-size-base;
				color: $uni-text-color-placeholder;
			}

			.uni-select__selector-item {
				font-size: $uni-font-size-base;
			}
		}

	}
</style>