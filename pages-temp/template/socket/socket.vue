<template>
	<view class="page-wrap">
		<z-navbar :title="title"></z-navbar>
		<view class="page-content">

			<view v-for="(item,index) in messageList" :key="index" class="message-item" :class="{
				'self': item.self
			}">
				<uv-avatar text="李"></uv-avatar>
				<view class="content">
					<view class="">
						时间：{{item.time}}
					</view>
					<view class="">
						消息: {{item.content}}
					</view>
				</view>
			</view>
		</view>
		<view class="input-box">
			<uv-input placeholder="请输入消息" border="surround" v-model="message"></uv-input>
			<uv-button class="send-btn" type="primary" text="发送" @click="sendMessage"></uv-button>

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
	import ReconnectingWebSocket from '@/utils/sockt.js'
	import dayjs from 'dayjs'

	const title = ref('标题')
	const sid = ref(Math.random().toString())
	const message = ref('')
	const messageList = ref([])
	const socket = new ReconnectingWebSocket(`ws://47.109.93.90/app/api/websocket/${sid.value}`, {
		messageHandler: (message) => {
			console.log('接受消息:', message);
			messageList.value.push({
				content: message,
				time: dayjs().format('YYYY-MM-DD HH:mm:ss'),
				self: false
			})
		}
	})

	const sendMessage = () => {
		const messageData = {
			sid: sid.value,
			content: message.value,
			message: message.value,
			time: dayjs().format('YYYY-MM-DD HH:mm:ss'),
			self: true
		}
		socket.send(JSON.stringify(messageData))
		messageList.value.push(messageData)
	}
</script>


<style lang="scss" scoped>
	.input-box {
		display: flex;
		padding: 20rpx;

		.send-btn {
			margin-left: 30rpx;
		}
	}

	.message-item {
		margin: 20rpx 0rpx 50rpx;
		display: flex;

		.content {
			margin: 0 20rpx;
		}
	}

	.message-item.self {
		flex-direction: row-reverse;

		.content {
			text-align: right;
		}
	}
</style>