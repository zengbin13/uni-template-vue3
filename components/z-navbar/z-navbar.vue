<template>
	<!-- 使用v-bind="$props"将所有props传递给子组件 -->
	<uv-navbar v-bind="$props" placeholder bgColor="#ffffff00" :titleStyle="titleStyle" :fixed="true" autoBack>
	</uv-navbar>
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
	
	const titleStyle = {
		'fontWeight': 'bold',
		"fontSize": '20px'
	}

	// const props = defineProps({
	// 	title: {
	// 		type: String,
	// 		default: '名称'
	// 	}
	// })

	// const {
	// 	title
	// } = toRefs(props)
</script>

<style lang="scss" scoped>

</style>