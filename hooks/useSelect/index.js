import {
	computed,
	ref,
	unref,
	watch
} from 'vue';

import {
	getHistoryPage
} from '@/utils/utils.js'

export function useSelect({
	key = 'ear_id',
	type = 'sow', //sow 母猪 fat 商品猪批次 back 后备猪批次
	total = -1,
	selectAllFn = () => []
} = {}) {
	const extra = ref({})
	const selectList = ref([])
	const selectKeyList = computed(() => {
		return selectList.value.map(item => item[key])
	})
	const handleMulSelectChange = (data) => {
		// 多选
		const index = selectList.value.findIndex(item => item[key] === data[key]);
		if (index !== -1) {
			// 存在
			selectList.value.splice(index, 1)
		} else {
			// 不存在
			selectList.value.push(data)
		}
		judgeSelectAll()
	}

	const handleSingleSelectChange = (data) => {
		// 单选
		const index = selectList.value.findIndex(item => item[key] === data[key]);
		if (index !== -1) {
			// 存在
			selectList.value = []
		} else {
			// 不存在
			selectList.value = [data]
		}
	}

	const removeSelectItem = (data) => {
		const index = selectList.value.findIndex(item => item[key] === data[key]);
		// 存在
		if (index !== -1) selectList.value.splice(index, 1)
		judgeSelectAll()
	}

	// 选择所有
	const isSelectAll = ref(false)
	const resetAllList = () => {
		selectList.value = []
	}
	watch(isSelectAll, async (val) => {
		if (val) {
			const data = await selectAllFn()
			selectList.value = data
		} else {
			// 初始化limit
		}
	})
	const judgeSelectAll = () => {
		if (unref(total) !== selectKeyList.value.length) isSelectAll.value = false
		// if (unref(total) == selectKeyList.value.length) isSelectAll.value = true
	}

	// 确认选择
	const confirmSelectData = () => {
		const selectData = {
			type,
			extra: extra.value,
			list: selectList.value
		}
		const {
			page
		} = getHistoryPage()
		// #ifdef H5
		page?.$vm._.exposed.setSelectData(selectData)
		// #endif
		// #ifdef APP-PLUS
		page?.$vm._.exposed.setSelectData(selectData)
		// #endif
		// #ifdef MP-WEIXIN
		page?.$vm.setSelectData(selectData)
		// #endif
		uni.navigateBack()
	}

	// 默认多选
	const isMultiple = ref(true)
	let handleSelectChange = ref(null)
	watch(isMultiple, (val) => {
		handleSelectChange.value = val ? handleMulSelectChange : handleSingleSelectChange
	}, {
		immediate: true
	})

	return {
		extra,
		selectList,
		selectKeyList,
		handleSelectChange,
		removeSelectItem,
		isSelectAll,
		resetAllList,
		confirmSelectData,
		isMultiple
	}
}
