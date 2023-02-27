export const IS_DEV = process.env.NODE_ENV === 'development'

// api 地址 apibeta pigapi
const DEV_BASE_URL = 'http://apibeta.jujiankeji.com/api'
const PRO_BASE_URL = 'http://pigapi.jujiankeji.com/api'
export const BASE_URL = IS_DEV ? DEV_BASE_URL : PRO_BASE_URL

// 加密
export const KEY_STR = '1463587320654321'
export const IV_STR = '1758326540123456'

// 响应code码 
export const RES_CODE = {
	success: 0,
	error: 1,
	not_login: 2,
	low_version: 3,
}