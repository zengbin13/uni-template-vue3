<template>
	<view class="field-wrap">
		<label class="label">{{ field.label }}</label>
		<picker :value="rangeIndex" :range="field.options" :range-key="keyField" @change="handlePickerChange">
			<!-- 未选择 -->
			<view class="not-selected" v-if="rangeIndex == -1">
				{{field?.options?.placeholder || '请选择'}}
			</view>
			<!-- 已选择 -->
			<view class="selected" v-else>{{field.options[rangeIndex][keyField]}}</view>
		</picker>
	</view>
</template>

<script>
	export default {
		name: "",
	}
</script>

<script setup>
	import {
		computed,
		ref,
		toRefs,
		watch
	} from 'vue';

	const props = defineProps({
		field: {
			type: Object,
			default: () => {
				return {}
			}
		},
		fieldNames: {
			type: Object,
			default: () => {
				return {
					text: 'text',
					value: 'value'
				}
			}
		},
		modelValue: {
			type: [String, Number],
			default: ''
		}
	})
	const {
		modelValue,
		field,
		fieldNames
	} = toRefs(props)
	const emit = defineEmits(['update:modelValue'])


	const keyField = computed(() => {
		return fieldNames.value.text
	})
	const valueField = computed(() => {
		return fieldNames.value.value
	})

	const rangeIndex = ref(-1)
	const handlePickerChange = (e) => {
		rangeIndex.value = e.detail.value
		emit('update:modelValue', field.value.options[rangeIndex.value][valueField.value])
	}

	watch(modelValue, (v) => {
		emit('update:modelValue', v)
		const index = field.value.options.findIndex(item => item[valueField.value] == v)
		if (rangeIndex.value != index) rangeIndex.value = index
	}, {
		immediate: true
	})
</script>



<style lang="scss" scoped>
	.field-wrap {
		display: flex;
		background-color: #f5f5f5;
		height: 92rpx;
		border-radius: 20rpx;
		align-items: center;
		padding: 0 32rpx;
		font-size: 30rpx;
		margin-bottom: 20rpx;

		.label {
			width: 160rpx;
			color: #333333;
		}

		picker {
			flex: 1;
		}

		.not-selected {
			color: $uni-text-color-placeholder;
		}

	}
</style>