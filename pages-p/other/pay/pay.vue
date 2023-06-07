<template>
	<view class="wrap">
		<u-navbar :title="title"></u-navbar>
		<input type="text" class="input" v-model="price">
		<!-- #ifdef APP-PLUS -->
		<u-button @click="requestPayment('alipay', price)" :loading="loading">支付宝支付</u-button>
		<u-button @click="requestPayment('wxpay', price)">微信支付</u-button>
		<!-- #endif -->

		<!-- #ifdef MP-WEIXIN -->
		<u-button @click="weixinPay(price)">微信支付</u-button>
		<!-- #endif -->
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

	const apis = inject('apis')
	const showToast = inject('showToast')
	const route = inject('route')

	const title = ref('支付')

	const price = ref(0.01)
	const loading = ref(false)
	const requestPayment = async (payType = 'alipay', price = 0.1) => {
		try {
			const {
				provider
			} = await uni.getProvider({
				service: "payment",
			})
			if (!provider.includes(payType)) {
				showToast(`不包含的支付方式: ${payType}`);
				return
			}
			const orderInfo = await getOrderInfo(payType, price);
			try {
				const res = await uni.requestPayment({
					provider: payType,
					orderInfo: orderInfo
				})
				console.log(res);
			} catch (e) {
				console.error(e, '支付失败');
				showToast('支付失败');
			}
		} catch (e) {
			console.error(e);
			showToast('获取支付通道或订单失败');
		}
	}
	const getOrderInfo = async (payType, price) => {
		const url = `https://demo.dcloud.net.cn/payment/?payid=${payType}&appid=HBuilder&total=${price}`
		try {
			const {
				data
			} = await uni.request({
				url
			});
			return data
		} catch (err) {
			return Promise.reject('获取支付订单失败')
		}
	}

	/**
	 * 开通流程: 
	 *   1. 申请微信支付商户号 https://pay.weixin.qq.com/
	 *   2. 绑定已有商户号并开通微信支付 https://mp.weixin.qq.com/
	 * 支付流程: 
	 *   1. 调用wx.login 接口，获取code
	 *   2. 后端根据code appid appsecert获取 openid（用户唯一标识）
	 *   3. wx.requestPayment 调起微信支付
	 */
	const weixinPay = async (price) => {
		try {
			const {
				code
			} = await uni.login({
				scopes: "auth_base" //静默授权
			})
			const url = `https://unidemo.dcloud.net.cn/payment/wx/mp?code=${code}&amount=${price}`
			const {
				data
			} = await uni.request({
				url
			});
			let paymentData = data.payment || {};
			const res = await uni.requestPayment({
				timeStamp: paymentData.timeStamp,
				nonceStr: paymentData.nonceStr,
				package: paymentData.package,
				signType: 'MD5',
				paySign: paymentData.paySign,
			})
			showToast('支付成功');
		} catch (e) {
			console.error(e);
			showToast('支付失败');
		}
	}
</script>


<style lang="scss" scoped>
	.input {
		border: 1px solid #464646;
		margin: 20rpx 0;
		border-radius: 6rpx;
		height: 52rpx;
		padding: 10rpx 20rpx;
		display: flex;
		margin: 20rpx;
		display: flex;
		align-items: center;

		&::before {
			content: '￥';
			color: $uni-color-primary;
			margin-right: 10rpx;
		}
	}

	// 微信小程序修改组件样式使用深度选择器 ::v-deep
	::v-deep .u-btn {
		margin: 20rpx;
	}
</style>