<template>
	<uni-data-picker class="input-area" :popup-title="`请选择${name}`" :localdata="list" :value="modelValue" :map="map"
		@change="onchange" v-slot:default="{data, error, options}">
		<view class="tree-area">
			<view v-if="error" class="error">
				<text>{{error}}</text>
			</view>
			<view v-else-if="data.length" class="selected">
				<text class="iconfont"></text>
				<text v-for="(item,index) in data" :key="index" class="selected-item">
					{{item.text + ' '}}
				</text>
			</view>
			<view v-else class="no-selected">
				<text class="iconfont"></text>
				<text>请选择</text>
			</view>
			<text class="iconfont icon-cancel" @click.stop="cancel" v-show="modelValue"></text>
		</view>
	</uni-data-picker>
	<slot name="right"></slot>
</template>

<script>
	export default {
		name: "input-tree-select",
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
			default: '树形结构'
		},
		// 输入值
		modelValue: {
			type: [String, Number],
			default: 0
		},
		// 是否必填
		isRequired: {
			type: Boolean,
			default: false
		},
		// 是否边框
		isBorder: {
			type: Boolean,
			default: true
		},
		list: {
			type: Array,
			default: () => []
		},
		map: {
			type: Object,
			default: () => {
				return {
					text: 'text',
					value: 'value',
					children: 'children',
				}
			}
		}
	})

	const {
		name,
		isRequired,
		modelValue,
		isBorder,
		list,
		map
	} = toRefs(props)

	const changeValue = (value) => {
		emits('update:modelValue', value)
	}

	const onchange = (e) => {
		const data = e.detail.value
		const value = data[data.length - 1].value
		emits('update:modelValue', value)
	}
	const cancel = () => {
		emits('update:modelValue', 0)
	}
</script>

<style lang="scss" scoped>
	.input-area {
		flex: 1;
		border-radius: 5rpx;
		// background-color: $uni-bg-color-grey;
		align-items: center;

		.tree-area {
			display: flex;
			height: 60rpx;
			cursor: pointer;
			justify-content: space-between;
			align-items: center;
			padding-left: 10px;
			padding-right: 5px;
		}
		.no-selected {
			color: $uni-text-color-placeholder;
		}
	}
</style>