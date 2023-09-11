<template>
	<u-navbar :title="title" :isBack="isBack"></u-navbar>
</template>

<script>
	export default {
		name: "z-navbar",
	}
</script>

<script setup>
	import {
		ref,
		inject,
		toRefs
	} from 'vue';

	const props = defineProps({
		title: {
			type: String,
			default: '名称'
		},
		isBack: {
			type: Boolean,
			default: true
		}
	})

	const {
		title,
		isBack
	} = toRefs(props)
</script>

<style lang="scss" scoped>

</style>