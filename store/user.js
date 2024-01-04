import {
	defineStore
} from 'pinia';
import {
	loginApi,
} from '@/apis/modules/user.js'


const initUserInfo = {
	id: "",
	username: "",
}

export const useUserStore = defineStore('user', {
	state: () => {
		return {
			token: '',
			// 用户信息
			userInfo: {
				...initUserInfo,
			},
		};
	},
	actions: {
		setSacnRandom() {
			this.sacnRandom = Math.random()
		},
		setToken(token) {
			this.token = token;
			uni.setStorageSync('token', token);
		},
		setUserInfo(data) {
			this.userInfo = data;
			uni.setStorageSync('userInfo', data);
		},
		// 退出登录
		async logoutAction() {
			try {
				await loginOutApi()
				this.setUserInfo({});
				this.setToken('');
				uni.reLaunch({
					url: '/pages/login/login'
				})
			} catch (e) {
				//TODO handle the exception
			}
		},
		// 登录
		async loginAction(form) {
			try {
				const {
					data
				} = await loginApi({
					"appId": "biz-portal",
					...form
				});
				const {
					userInfo,
					token
				} = data || {}
				// 获取用户信息
				this.setUserInfo(userInfo);
				this.setToken(token);
				uni.switchTab({
					url: '/pages/tabbar/home'
				});
			} catch (e) {
				console.log(e);
				//TODO handle the exception
				throw Error('登录失败');
			}
		},
	},
});