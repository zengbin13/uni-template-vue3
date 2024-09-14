<template>
	<div class="container">
		<canvas ref="posterCanvas" canvas-id="poster" id="poster" :width="canvasWidth" :height="canvasHeight"></canvas>
		<button @click="savePoster">保存海报</button>
	</div>
</template>

<script setup>
	import {
		ref,
		onMounted
	} from 'vue';

	const canvasWidth = 300; // Canvas宽度
	const canvasHeight = 400; // Canvas高度
	const posterData = {
		imageUrl: "https://tqw-file-dev.oss-cn-chengdu.aliyuncs.com/090840-17084777202525_1709824927127.jpg", // 海报背景图片路径
		text: '这是海报文字', // 海报文字内容
	};

	const posterCanvas = ref(null);

	const drawPoster = async () => {
		const canvas = posterCanvas.value;
		const ctx = uni.createCanvasContext('poster')

		// // 获取图片信息
		// const imageInfo = await uni.getImageInfo({
		// 	src: posterData.imageUrl,
		// });
		

		// // 绘制背景图片
		// ctx.drawImage(imageInfo.path, 0, 0, canvasWidth, canvasHeight);

		// 设置文字样式
		ctx.font = '16px Arial';
		ctx.textAlign = 'center';
		ctx.fillStyle = '#FFFFFF'; // 文字颜色

		// 计算文字位置居中显示在图片上方
		const textX = canvasWidth / 2;
		const textY = canvasHeight / 2 - 20; // 文字在图片中垂直居中偏上一些

		// 绘制文字
		ctx.fillText(posterData.text, textX, textY);
	};

	const savePoster = () => {
		const canvas = posterCanvas.value;
		canvas.toBlob((blob) => {
			const imageUrl = URL.createObjectURL(blob);
			const link = document.createElement('a');
			link.href = imageUrl;
			link.download = 'poster.png';
			link.click();
			URL.revokeObjectURL(imageUrl);
		});
	};

	onMounted(() => {
		drawPoster();
	});
</script>

<style>
	.container {
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	#poster {
		border: 1rpx #f00;
	}
</style>