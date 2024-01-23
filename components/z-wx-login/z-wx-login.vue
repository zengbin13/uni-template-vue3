<template>
	<uni-popup ref="popupRef" type="bottom" :safe-area="false">
		<view class="popup-wrap">
			<view class="desc-wrap">
				<view class="desc-1">{{desc1}}</view>
				<view class="desc-2">{{desc2}}</view>
			</view>
			<view class="form-wrap">
				<view class="form-item avatar">
					<view class="label">
						头像
					</view>
					<view class="content">
						<button class="avatar-btn uv-reset-button" open-type="chooseAvatar"
							@chooseavatar="onChooseAvatar" v-if="!formData.avatar">
							请选择头像
						</button>
						<image v-else :src="formData.avatar" mode="widthFix" class="avatar-img"></image>
					</view>
				</view>
				<view class="form-item nickname">
					<view class="label">
						昵称
					</view>
					<view class="content">
						<input  type="nickname" v-model="formData.nickname" placeholder="请输入昵称" @blur="bindblur" />
					</view>
				</view>
			</view>
			<view class="btn-wrap">
				<button class="close-btn btn uv-reset-button" @click="handleClose">取消</button>
				<!-- 获取手机号码 -->
				<button class="submit-btn btn uv-reset-button" open-type="getPhoneNumber" @getphonenumber="handleSubmit"
					v-if="getPhone">
					保存
				</button>
				<!-- 不获取手机号码 -->
				<button class="submit-btn btn uv-reset-button" @click="handleSubmit" v-else>
					保存
				</button>
			</view>
			<uv-safe-bottom></uv-safe-bottom>
		</view>
	</uni-popup>
</template>

<script>
	export default {
		name: "z-wx-login",
	}
</script>

<script setup>
	import {
		ref,
		toRefs
	} from 'vue';

	const emits = defineEmits(['comfirm'])
	const props = defineProps({
		desc1: {
			type: String,
			default: '获取您的昵称、头像、手机号'
		},
		desc2: {
			type: String,
			default: '获取用户头像、昵称、手机号信息，主要用于完善个人资料，向用户提供更好使用体验'
		},
		getPhone: {
			type: Boolean,
			default: true,
		},
	})

	const {
		getPhone,
	} = toRefs(props)

	//表单业务逻辑
	const initForm = {
		avatar: '',
		nickname: '',
		//手机号
		code: '',
		encryptedData: '',
		errMsg: '',
		iv: ''
	}
	const formData = ref({
		...initForm
	})
	const onChooseAvatar = (e) => {
		formData.value.avatar = e.detail.avatarUrl
	}
	const bindblur = (e) => {
		formData.value.nickname = e.detail.value
	}
	

	const handleClose = () => {
		close()
	}

	const handleSubmit = (e) => {
		if (!formData.value.avatar) {
			uni.showToast({
				title: '请选择上传头像',
				icon: 'none'
			})
			return
		}
		if (!formData.value.nickname) {
			uni.showToast({
				title: '请填写昵称',
				icon: 'none'
			})
			return
		}
		//处理获取手机号逻辑
		if (getPhone.value) {
			if (!e.detail.code) {
				uni.showToast({
					title: '已取消授权手机号',
					icon: 'none'
				})
			} else {
				formData.value = {
					...formData.value,
					...e.detail
				}
			}
		}
		emits('comfirm', {
			...formData.value
		})
		close()
	}


	// popup
	const popupRef = ref(null)
	const open = () => {
		formData.value = {
			...initForm
		}
		popupRef.value?.open()
	}
	const close = () => {
		formData.value = {
			...initForm
		}
		popupRef.value?.close()
	}
	defineExpose({
		open,
		close
	})
</script>



<style lang="scss" scoped>
	.popup-wrap {
		background-color: #fff;
		padding: 10rpx 30rpx 5rpx;
		border-radius: 36rpx 36rpx 0 0;

		.desc-wrap {
			margin-bottom: 6rpx;
			margin-top: 20rpx;

			.desc-1 {
				font-weight: bold;
				font-size: 30rpx
			}

			.desc-2 {
				font-size: 28rpx;
				color: #ababab;
				margin-top: 24rpx;
				padding-bottom: 14rpx;
				border-bottom: 1px solid #f3f3f3;
			}
		}

		.form-wrap {
			.form-item {
				display: flex;
				align-items: center;
				height: 60px;
				border-bottom: 1px solid #f3f3f3;

				.label {
					width: 100rpx;
				}

				.content {
					// flex: 1;
				}

				.avatar-btn {
					color: $uni-text-color-placeholder;
				}

				.avatar-img {
					width: 88rpx;
					height: 88rpx;
					border-radius: 50%;
				}
			}
		}

		.btn-wrap {
			height: 100rpx;
			display: grid;
			grid-template-columns: repeat(2, 1fr);
			align-items: center;
			margin-top: 20rpx;

			.btn {
				width: 300rpx;
				height: 80rpx;
				background: antiquewhite;
				display: flex;
				align-items: center;
				justify-content: center;
				border-radius: 10rpx;
			}

			.close-btn {
				background-color: #fafafa;
				color: #39B54A;
			}

			.submit-btn {
				background-color: #39B54A;
				color: #fff;
			}
		}

	}
</style>