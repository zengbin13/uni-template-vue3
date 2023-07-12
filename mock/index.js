import {
	resultSuccess
} from '@/mock/utils.js'
import Mock from 'mockjs';

const {
	Random
} = Mock;

// 仅支持浏览器
// Mock.mock('/api/users', 'get', {
// 	code: 200,
// 	message: 'success',
// 	data: {
// 		username: '@name',
// 		age: '@integer(20, 40)',
// 		'gender|1': ['男', '女'],
// 	},
// });

// https://images.pexels.com/photos/17110381/pexels-photo-17110381.jpeg

const sizes = [
	'375x250', '375x300', '375x350', '375x400'
];
let imgCount = 6213726;
export function getWaterfallList(page = 1, size = 20) {
	return new Promise((resolve, reject) => {
		const data = [];
		const start = (page - 1) * size;
		const end = start + size;
		for (let i = start; i < end; i++) {
			const size = sizes[getRandomInt(0, sizes.length)];
			imgCount += 1;
			data.push({
				'id': Random.guid(),
				'image2': `https://images.pexels.com/photos/${imgCount}/pexels-photo-${imgCount}.jpeg?auto=compress&cs=tinysrgb&w=250`,
				'image': Random.image(size, Random.color(), `img${i+1}`),
				'title': Random.csentence(10, 30),
				'width': size.split('x')[0],
				'height': size.split('x')[1],
			})
		}
		setTimeout(() => {
			resolve(data);
		}, getRandomInt(100, 300))
	})
}

function getRandomInt(min = 1000, max = 2000) {
	return Math.floor(Math.random() * max) + min;
}