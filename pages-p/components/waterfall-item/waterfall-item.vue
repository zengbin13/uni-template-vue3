<template>
	<view class="waterfall-wrap">
		<uv-image :src="item.image" mode="widthFix" :width="`${width}px`" :height="`${item.height}px`" observeLazyLoad>
			<template v-slot:loading>
				<uv-loading-icon></uv-loading-icon>
			</template>
		</uv-image>
		<view class="title">
			{{item.title|| '-'}} {{`${width} x ${item.height}` }}
		</view>
	</view>
</template>

<script>
	export default {
		name: "waterfall-item",
	}
</script>

<script setup>
	import {
		ref,
		inject,
		toRefs
	} from 'vue';

	const props = defineProps({
		width: {
			type: [Number, String],
			default: '100%'
		},
		item: {
			type: Object,
			default: () => {
				return {
					image: '',
					with: "100%",
					height: 200,
				}
			}
		}
	})

	const {
		item,
		width
	} = toRefs(props)
</script>

<style lang="scss" scoped>
	.waterfall-wrap {
		background-color: #fff;
		margin: 20rpx 0;
		border-radius: 30rpx;
		overflow: hidden;
	}
</style>