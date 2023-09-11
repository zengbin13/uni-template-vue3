<template>
	<view class="index-wrap">
		<u-navbar back-text="返回" title="微信"></u-navbar>
		<view class="">
			<u-button @click="route('/pages-p/weixin/login/login')">微信登录</u-button>
		</view>
	</view>
</template>

<script setup>
	import {
		inject
	} from 'vue';
	const route = inject('route')
</script>

<script>
	export default {
		options: {  
    // 微信小程序中 options 选项  
    multipleSlots: true, //  在组件定义时的选项中启动多slot支持，默认启用  
    styleIsolation: 'shared', //  启动样式隔离。当使用页面自定义组件，希望父组件影响子组件样式时可能需要配置。具体配置选项参见：微信小程序自定义组件的样式  
    addGlobalClass: true, //  表示页面样式将影响到自定义组件，但自定义组件中指定的样式不会影响页面。这个选项等价于设置 styleIsolation: apply-shared  
    virtualHost: true //  将自定义节点设置成虚拟的，更加接近Vue组件的表现。我们不希望自定义组件的这个节点本身可以设置样式、响应 flex 布局等，而是希望自定义组件内部的第一层节点能够响应 flex 布局或者样式由自定义组件本身完全决定  
  }  
	}
</script>

<style lang="scss" scoped>
// 微信小程序修改组件样式使用深度选择器 ::v-deep 

// 情况一:  页面样式修改组件样式使用 ::v-deep
// 情况二:  父组件样式修改子组件样式使用 styleIsolation: 'shared'
::v-deep .u-btn {
	margin: 120rpx;
}
</style>