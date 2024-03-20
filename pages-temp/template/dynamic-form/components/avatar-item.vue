<template>
	<view>
		{{name}}
	</view>
</template>

<script>
	export default {
		name:"z-login",
	}
</script>

<script setup>
	import {
		ref,
		toRefs
	} from 'vue';
	
	const props = defineProps({
		name: {
			type: String,
			default: '组件名称'
		}
	})
	
	const { name } = toRefs(props)
</script>



<style lang="scss" scoped>

</style>