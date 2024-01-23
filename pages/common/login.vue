<template>
	<view class="login-page">
		<!-- 背景图片 -->
		<view class="login-bj">
			<!-- <image class="img" src="@/static/images/login_bg.png" mode="widthFix"></image> -->
			<image class="img" :src="logoBgUrl" mode="heightFix"></image>
			<view class="text">
				<view class="hello">
					您好，欢迎使用
				</view>
				<view class="name">
					{{env.VITE_PROJECT_NAME}}
				</view>
			</view>
		</view>
		<!-- 登录表单 -->
		<view class="login-form">
			<uni-forms ref="form" :modelValue="formData" :rules="rules">
				<uni-forms-item label="" name="account">
					<uni-easyinput prefixIcon="person" type="text" v-model="formData.account" placeholder="请输入" />
				</uni-forms-item>
				<uni-forms-item label="" name="password">
					<uni-easyinput prefixIcon="locked-filled" type="password" v-model="formData.password"
						placeholder="" />
				</uni-forms-item>
			</uni-forms>
			<uv-button class="btn" type="primary" @click="login" :customStyle="customStyle">登 录</uv-button>
			<view class="retrieve-password">找回密码</view>
			<image class="logo" src="@/static/images/logo.png" mode="widthFix"></image>
		</view>
	</view>
</template>

<script setup>
	import {
		ref,
		inject
	} from 'vue';
	import {
		useUserStore
	} from '@/store/user.js'


	const env = uni.env
	uni.setStorageSync(uni.env.VITE_FIRSET_INSTALL, false)

	const userStore = useUserStore()


	const logoBgUrl = 'https://images.pexels.com/photos/2387615/pexels-photo-2387615.jpeg?auto=compress&cs=tinysrgb&w=600'


	// 登录逻辑
	const form = ref(null)
	const formData = ref({
		account: "JW015",
		password: "Abc123"
	})
	const rules = {
		account: {
			rules: [{
				required: true,
				errorMessage: '请输入账号'
			}]
		},
		password: {
			rules: [{
				required: true,
				errorMessage: '请输入密码'
			}]
		},
	}
	const login = async () => {
		try {
			await form.value.validate()
			await userStore.loginAction({
				"appId": "biz-portal",
				"username": formData.value.account,
				"password": formData.value.password,
			})
		} catch (e) {
			console.log('登录', e)
		}
	}

	// 按钮样式
	const customStyle = {
		height: '96rpx',
		borderRadius: '8rpx', //圆角
		// fontWeight: '600',
		fontSize: '28rpx'
	}
</script>

<style lang="scss" scoped>
	:deep(.uni-forms) {
		.uni-forms-item:nth-child(2) {
			margin: 48rpx 0 72rpx 0;
		}

		.uni-easyinput__content-input {
			height: 96rpx;
		}

		.uni-input-placeholder {
			font-size: $uni-font-size-base;
		}

		.uni-input-input {
			font-size: $uni-font-size-base;
		}
		
		.uniui-clear {
			font-size: 20px !important;
		}
		.uniui-eye-filled {
			font-size: 20px !important;
		}

	}


	.login-page {
		min-height: 100vh;
		max-height: 100vh;
	}

	.login-bj {
		position: relative;
		height: 700rpx;

		.img {
			width: 100%;
			height: 100%;
		}

		.text {
			position: absolute;
			top: 160rpx;
			left: 38rpx;
			color: #fff;

			.hello {
				font-size: 36rpx;
			}

			.name {
				margin-top: 8rpx;
				font-size: 48rpx;
				font-weight: 600;
			}
		}
	}

	.login-form {
		position: fixed;
		z-index: 1;
		top: 500rpx;
		bottom: 0;
		width: 100%;
		box-sizing: border-box;
		padding: 48rpx;
		background-color: #fff;
		border-radius: 40rpx 40rpx 0rpx 0rpx;


		.retrieve-password {
			margin-top: 34rpx;
			text-align: center;
			width: 100%;
			height: 40rpx;
			line-height: 40rpx;
			font-size: 28rpx;
			font-weight: 400;
			color: #1677FF;
		}


		.logo {
			width: 200rpx;
			position: absolute;
			bottom: 80rpx;
			left: 0;
			right: 0;
			margin: auto;
		}
	}
</style>