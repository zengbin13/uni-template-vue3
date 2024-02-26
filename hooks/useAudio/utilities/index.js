import { getCurrentScope, onScopeDispose , unref} from 'vue'

/**
 * 在副作用作用域被 stop 时，触发回调
 */
export const tryOnScopeDispose = fn => {
	if (getCurrentScope()) {
		onScopeDispose(fn)
		return true
	}
	return false
}


/**
 * 是否是字符串类型
 */
export const isString = v => typeof v === 'string'

/**
 * 是否是布尔类型
 */
export const isBoolean = v => typeof v === 'boolean'

/**
 * 节流过滤器
 */
export const throttleFilter = (
	ms,
	trailing = true,
	leading = true
) => {
	let timer
	let lastExec = 0
	let preventLeading = !leading

	const clear = () => {
		if (timer) {
			clearTimeout(timer)
			timer = undefined
		}
	}

	const filter = invoke => {
		const duration = unref(ms)
		const elapsed = Date.now() - lastExec // 过去多少时间

		clear()

		// 立即触发
		if (duration <= 0) {
			lastExec = Date.now()
			return invoke()
		}

		// 到达时间后触发
		if (elapsed > duration) {
			lastExec = Date.now()
			// 阻止 leading 下的触发
			if (preventLeading) {
				preventLeading = false
			} else {
				invoke()
			}
		}

		// 拖尾，确保时间到达后再触发
		if (trailing) {
			timer = setTimeout(() => {
				lastExec = Date.now()
				if (!leading) {
					preventLeading = true
				}
				clear()
				invoke()
			}, duration)
		}

		// 非拖尾下，阻止 leading 下的触发
		if (!leading && !timer) {
			timer = setTimeout(() => {
				preventLeading = true
			}, duration)
		}
	}

	return filter
}

/**
 * 创建过滤器包装函数
 */
export const createFilterWrapper = (filter, fn) => {
	function wrapper(...args) {
		const cb = () => fn.apply(this, args)
		const options = {
			fn,
			args,
			thisArg: this
		}
		filter(cb, options)
	}
	return wrapper
}