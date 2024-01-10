<template>
	<view class="page-wrap">
		<z-navbar :title="title"></z-navbar>
		<view class="page-content">
			<uv-form labelPosition="left" :model="formData" :rules="rules" ref="form" labelWidth="70">
				<!-- 文本输入 -->
				<uv-form-item label="文本输入:" prop="name" borderBottom>
					<input-filed v-model="formData.name" placeholder="请输入名字"></input-filed>
				</uv-form-item>
				<!-- 数值输入 -->
				<uv-form-item label="数值输入:" prop="age" borderBottom>
					<input-filed v-model="formData.age" placeholder="请输入年龄" unit="岁" isNumber></input-filed>
				</uv-form-item>
				<!-- 下拉选择 -->
				<uv-form-item label="下拉选择:" prop="gender" borderBottom>
					<input-select v-model="formData.gender" placeholder="请选择性别" :list="genderList"></input-select>
				</uv-form-item>
				<!-- 单选 -->
				<uv-form-item label="单选:" prop="fruit" borderBottom>
					<input-checkbox v-model="formData.fruit" :list="fruitList"></input-checkbox>
				</uv-form-item>
				<!-- 多选 -->
				<uv-form-item label="多选:" prop="hobby" borderBottom>
					<input-checkbox v-model="formData.hobby" :list="hobbyList" isMultiple></input-checkbox>
				</uv-form-item>

				<!-- 时间选择 -->
				<uv-form-item label="时间选择:" prop="birthday" borderBottom>
					<input-time v-model="formData.birthday" isHour></input-time>
				</uv-form-item>

				<!-- 级联选择 -->
				<uv-form-item label="级联选择:" prop="city" borderBottom>
					<input-tree-select v-model="formData.city" :list="cityJSON" :map="{ text: 'name', value: 'code'}"
						name="居住城市"></input-tree-select>
				</uv-form-item>

				<!-- 文本域 -->
				<uv-form-item label="文本域:" prop="introduction" >
					<uv-textarea v-model="formData.introduction" placeholder="请输入内容" count ></uv-textarea>
				</uv-form-item>
			</uv-form>
		</view>
		<bottom-btn-group @click1="submit"></bottom-btn-group>
	</view>
</template>

<script setup>
	import {
		ref,
		inject,
		watch,
	} from 'vue';
	import {
		onLoad,
		onShow
	} from "@dcloudio/uni-app";
	import cityJSON from './pca-code.json'

	const title = ref('提交表单')

	// 下拉选择
	const genderList = [{
		text: '男',
		value: 1,
	}, {
		text: '女',
		value: 2,
	}, {
		text: '保密',
		value: 0,
		disable: true,
	}]

	const fruitList = [{
		text: '苹果',
		value: 0
	}, {
		text: '香蕉',
		value: 1
	}, {
		text: '榴莲',
		value: 2
	}]

	const hobbyList = [{
			text: '羽毛球',
			value: 0
		}, {
			text: '跑步',
			value: 1
		}, {
			text: '爬山',
			value: 2
		},
		{
			text: '睡觉',
			value: 3
		}
	]

	const cityList = [

	]

	// 表单相关
	const form = ref(null)
	const initForm = {
		name: '',
		age: '',
		gender: '',
		fruit: '',
		hobby: [],
		birthday: '',
		city: '',
		introduction: ''
	}
	const formData = ref({
		...initForm
	})
	const rules = ref({
		'name': {
			type: 'string',
			required: true,
			message: '请填写姓名',
			trigger: ['change']
		},
		'age': {
			type: 'string',
			required: true,
			message: '请填写年龄',
			trigger: ['change']
		},
		'gender': {
			required: true,
			message: '请选择性别',
		},
		'fruit': {
			required: true,
			validator: (rule, value, callback) => {
				return value !== 2
			},
			message: '有点味道的榴莲'
		},
		'hobby': {
			required: true,
			validator: (rule, value, callback) => {
				return !value.includes(3)
			},
			message: '你好像有点坏习惯'
		},
		city: {
			type: 'string',
			required: true,
			message: '请选择居住城市',
			trigger: ['change']
		},
		introduction: {
			type: 'string',
			required: true,
			message: '请填写自我介绍',
			trigger: ['change']
		}
	})

	// change校验
	Object.keys(rules.value).forEach(key => {
		watch(() => formData.value[key], () => {
			form.value.validateField(key)
		})
	})

	const submit = async () => {
		try {
			await form.value.validate()
		} catch (e) {
			console.log(e);
		}
	}
</script>

<style lang="scss" scoped>

</style>