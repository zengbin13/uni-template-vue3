import {
	computed,
	nextTick,
	onMounted,
	ref
} from 'vue';

export function usePaging(
	getListApi, {
		title,
		init: initQueryForm,
		request,
		response
	} = {
		title: '',
		init: {},
		request: null,
		response: null,
	}
) {
	const total = ref(0);
	const totalTitle = computed(() => {
		return `${title}(${total.value || 0})`;
	});

	const extra = ref([])

	const pagingRef = ref(null);
	let dataList = ref([]);
	const defaultPageSize = ref(initQueryForm.limit || 7);

	const queryForm = ref({
		...initQueryForm,
	});

	const queryList = async (pageNo, pageSize) => {
		console.log(`页码:${pageNo}, 分页${pageSize}`);
		// 构造参数
		let params = Object.assign(queryForm.value, {
			cur_page: pageNo,
			limit: pageSize,
			start_time: queryForm.value.date && queryForm.value.date[0],
			end_time: queryForm.value.date && queryForm.value.date[1],
		});
		request && request(params);
		try {
			const res = await getListApi(params);
			total.value = res.total || res.count || 0;
			const list = res.list || res.data || res.tree;
			extra.value = res?.extra || res?.detail || []
			console.log('列表数据', list);
			response && response(list);
			pagingRef.value?.complete(list);
			return list;
		} catch (e) {
			console.log(e);
			pagingRef.value?.complete(false);
			return [];
		}
	};

	// 刷新列表  不更新pageNo和pageSize
	const refresh = () => {
		if (!pagingRef.value) return;
		console.log(888);
		pagingRef.value.refresh();
	};

	// 重载列表  更新pageNo和pageSize
	const reload = () => {
		if (!pagingRef.value) return;
		pagingRef.value.reload();
	};
	// 清空分页数据，pageNo恢复为默认值
	const clear = () => {
		if (!pagingRef.value) return;
		pagingRef.value.clear();
	};

	// 参数重置并获取
	const getResetDataList = () => {
		queryForm.value = {
			...initQueryForm
		};
		reload();
	};

	// 获取数据
	const getDataList = (params = {}) => {
		queryForm.value = Object.assign(queryForm.value, params);
		setDefaultPageSize(queryForm.value.limit || 7);
		reload();
	};

	// 获取全部数据
	const getAllDataList = (params = {}) => {
		return new Promise((resolve, reject) => {
			queryForm.value = Object.assign(queryForm.value, params);
			clear();
			setDefaultPageSize(9999);
			nextTick(async () => {
				try {
					const list = await queryList(pagingRef.value.pageNo, pagingRef.value
						.pageSize);
					resolve(list);
				} catch (error) {
					reject(error);
				}
			});
		});
	};

	// 设置一页尺寸
	const setDefaultPageSize = (count) => {
		defaultPageSize.value = count;
	};

	return {
		total,
		totalTitle,
		extra,
		dataList,
		queryList,
		pagingRef,
		defaultPageSize,
		queryForm,
		refresh,
		reload,
		getDataList,
		getAllDataList,
		getResetDataList,
	};
}