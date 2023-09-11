<template>
	<!-- 使用z-paging-swiper为根节点可以免计算高度 -->
	<z-paging-swiper>
		<template #top>
			<z-navbar title="下拉刷新"></z-navbar>
			<z-tabs ref="tabs" :list="tabList" :current="current" @change="tabsChange" />
		</template>
		<swiper class="swiper" :current="current" @transition="swiperTransition" @animationfinish="swiperAnimationfinish">
			<swiper-item class="swiper-item" v-for="(item, index) in tabList" :key="index">
				<swiper-list-item :tabIndex="index" :currentIndex="current"></swiper-list-item>
			</swiper-item>
		</swiper>
	</z-paging-swiper>
</template>

<script setup>
	import {
		ref
	} from 'vue';
	import swiperListItem from '@/pages-p/components/swiper-list-item/swiper-list-item.vue'

	const paging = ref(null);
	const tabs = ref(null);

	const current = ref(0);
	const tabList = ref(['测试1', '测试2', ]);

	//tabs通知swiper切换
	const tabsChange = (index) => {
		current.value = index;
	}

	//swiper滑动中
	const swiperTransition = (e) => {
		tabs.value.setDx(e.detail.dx);
	}

	//swiper滑动结束
	const swiperAnimationfinish = (e) => {
		current.value = e.detail.current;
		tabs.value.unlockDx();
	}
</script>

<style>
	.swiper {
		height: 100%;
	}
</style>