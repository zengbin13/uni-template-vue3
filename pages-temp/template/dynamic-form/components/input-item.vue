<template>
	<view class="field-wrap">
		<label class="label">{{ field.label }}</label>
		<input type="text" :value="modelValue" :placeholder="field?.options?.placeholder || '请输入'" @input="handleChange" />
	</view>
</template>

<script>
	export default {
		name: "",
	}
</script>

<script setup>
	import {
		ref,
		toRefs
	} from 'vue';

	const props = defineProps({
		field: {
			type: Object,
			default: () => {
				return {}
			}
		},
		modelValue: {
			type: String,
			default: ''
		}
	})
	const {
		modelValue,
		field
	} = toRefs(props)
	
	const emit = defineEmits(['update:modelValue'])
	
	const handleChange = (e) => {
		emit('update:modelValue', e.detail.value)
	}
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
	input {
		font-size: 30rpx;
	}
	
}
</style>