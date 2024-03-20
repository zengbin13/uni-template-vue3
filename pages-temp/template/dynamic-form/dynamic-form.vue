<template>
	<view class="page-wrap">
		<z-navbar :title="title"></z-navbar>
		{{formData}}
		<view class="page-content">
			<form>
				<!-- #ifndef MP -->
				<component v-for="(field, index) in formFields" :key="index" :is="getComponentType(field.type)"
					:field="field" v-model="formData[field.name]" />
				<!-- #endif -->
			</form>
		</view>
	</view>
</template>

<script setup>
	import {
		ref,
	} from 'vue';
	import {
		onLoad,
		onShow
	} from "@dcloudio/uni-app";
	import InputItem from './components/input-item.vue'
	import SelectItem from './components/select-item.vue'

	const title = ref('动态表单')

	const formFields = ref([])
	const getFormFields = () => {
		setTimeout(() => {
			formFields.value = [
				// {
				// 	"type": "avatar",
				// 	"label": "头像",
				// 	"name": "avatar"
				// },
				{
					"type": "text",
					"label": "姓名",
					"name": "name",
					"options": {
						"placeholder": "请输入姓名",
						"required": true,
					},
				},
				// {
				// 	"type": "number",
				// 	"label": "年龄",
				// 	"name": "age"
				// },
				{
					"type": "select",
					"label": "性别",
					"name": "gender",
					"options": [{
						text: "男",
						value: 0,
					}, {
						text: "女",
						value: 1,
					}, ]
				}
			]
		}, 500)
	}
	getFormFields()

	// 表单填写数据
	const formData = ref({
		gender: 0
	})


	// 根据字段类型返回相应的组件名称
	const getComponentType = (type) => {
		switch (type) {
			case 'text':
				return InputItem;
			case 'select':
				return SelectItem;
			default:
				return InputItem;
		}
	}
</script>

<style lang="scss" scoped>

</style>