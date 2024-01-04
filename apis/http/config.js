export const IS_DEV = process.env.NODE_ENV === 'development'

// api地址 
const DEV_BASE_URL = ''
const PRO_BASE_URL = 'http://api.xxx.com'
export const BASE_URL = IS_DEV ? DEV_BASE_URL : PRO_BASE_URL

// 加密 16位字符 128位
export const KEY_STR = 'XXXXXXXXXXXXXXXX'
export const IV_STR = 'YYYYYYYYYYYYYYYY'

// 响应code码
export const RES_CODE = {
	success: 0,
	error: 1,
	not_login: 2
};