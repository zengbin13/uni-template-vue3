<template>
	<view class="page-wrap">
		<z-navbar :title="title"></z-navbar>
		<view class="page-content">
			<!-- 用户数据 -->
			<view class="userinfo" @click="login">
				<view class="avatar">
					<uni-icons type="person-filled" size="36" v-if="!loginData.avatar"></uni-icons>
					<image v-else :src="loginData.avatar" mode="widthFix" class="avatar-img"></image>
				</view>
				<view class="desc-wrap" v-if="loginData.nickname">
					<view class="desc-1">{{loginData.nickname}}</view>
					<view class="desc-2">欢迎回来</view>
				</view>
				<view class="desc-wrap" v-else>
					<view class="desc-1">请点击登录</view>
					<view class="desc-2">登录后享受更好的服务体验</view>
				</view>
				<uni-icons type="right" size="22" color="#aaa" class="right-icon"></uni-icons>
			</view>
			<!-- 登录弹窗 -->
			<z-wx-login ref="loginRef" @comfirm="handleConfirm"></z-wx-login>
		</view>
	</view>
</template>

<script setup>
	import {
		ref,
		inject
	} from 'vue';
	import {
		onLoad,
		onShow
	} from "@dcloudio/uni-app";

	const title = ref('标题')

	//登录相关
	const loginData = ref({
		avatar: '',
		nickname: ''
	})
	const loginRef = ref(null)
	const login = () => {
		loginRef.value?.open()
	}
	const handleConfirm = (data) => {
		loginData.value = {
			...data
		}
	}
</script>

<style lang="scss" scoped>
	.userinfo {
		display: flex;
		align-items: center;
		position: relative;

		.avatar {
			width: 120rpx;
			height: 120rpx;
			border-radius: 50%;
			background-color: #ccc;
			display: flex;
			justify-content: center;
			align-items: center;
			overflow: hidden;

			.uniui-person-filled {
				color: #fff !important;
			}
			
			.avatar-img {
				width: 100%;
				border-radius: 50%;
			}
		}

		.desc-wrap {
			flex: 1;
			margin-left: 20rpx;
			color: #fff;

			.desc-1 {
				font-size: 34rpx;
				font-weight: 500;
			}
		}
	}
</style>