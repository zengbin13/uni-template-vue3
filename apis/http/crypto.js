import CryptoJS from 'crypto-js'
import {
	KEY_STR as keyStr,
	IV_STR as ivStr
} from './config.js'

/**
 * AES加密
 * @param {Object} text 待加密的数据
 */
export function encrypt(text) {
	var key = CryptoJS.enc.Utf8.parse(keyStr); //为了避免补位，直接用16位的秘钥
	var iv = CryptoJS.enc.Utf8.parse(ivStr); //16位初始向量
	var encrypted = CryptoJS.AES.encrypt(text, key, {
		iv: iv,
		mode: CryptoJS.mode.CBC,
		padding: CryptoJS.pad.Pkcs7,
	});
	return encrypted.toString();
}

/**
 * AES解密
 * @param {Object} text 解密
 */
export function decrypt(text) {
	var key = CryptoJS.enc.Utf8.parse(keyStr); //为了避免补位，直接用16位的秘钥
	var iv = CryptoJS.enc.Utf8.parse(ivStr); //16位初始向量
	var encrypted = CryptoJS.AES.decrypt(text, key, {
		iv: iv,
		mode: CryptoJS.mode.CBC,
		padding: CryptoJS.pad.Pkcs7,
	});
	return encrypted.toString(CryptoJS.enc.Utf8);
}