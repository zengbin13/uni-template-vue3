import {
	throttleFilter,
	createFilterWrapper
} from './index.js'

/**
 * 使用节流函数
 */
export const useThrottleFn = (
	fn,
	ms = 200,
	trailing = true,
	leading = true
) => {
	return createFilterWrapper(
		throttleFilter(ms, trailing, leading),
		fn
	)
}
