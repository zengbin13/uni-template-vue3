<template>
	<view class="input-select">
		<uni-data-checkbox :modelValue="modelValue" @update:modelValue="changeValue" :localdata="list"
			:multiple="isMultiple" class="select"></uni-data-checkbox>
	</view>
</template>

<script>
	export default {
		name: "input-checkbox",
		options: {
			styleIsolation: 'shared'
		}
	}
</script>

<script setup>
	import {
		ref,
		inject,
		toRefs,
	} from 'vue';

	const emits = defineEmits(['update:modelValue', "change"])
	const props = defineProps({
		// 标题
		name: {
			type: String,
			default: '选择数据'
		},
		// 输入值  multiple=true时为 Array类型，否则为 String或Number类型
		modelValue: {
			type: [Number, Array, String],
			default: ''
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
		// 是否为多选
		isMultiple: {
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
		isMultiple
	} = toRefs(props)

	const changeValue = (value) => {
		emits('update:modelValue', value)
		// 尝试调用uv-form的验证方法
		// uni.$uv.formValidate({}, "change")
	}
</script>

<style lang="scss" scoped>
	.input-select {
		display: flex;
		flex: 1;
		align-items: center;

		.select {
			max-width: 90%;
			flex: 1;
			border-radius: 5rpx;
			margin-left: 10px;
			overflow: hidden;
		}

	}

	::v-deep .uni-data-checklist .checklist-group .checklist-box .checklist-content .checklist-text {
		font-size: $uni-font-size-base;
	}

	::v-deep .checklist-box {
		height: 25px;
	}
</style>