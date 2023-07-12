export function resultSuccess(data, {
	msg = 'ok'
} = {}) {
	return {
		code: 0,
		data,
		msg,
	}
}

export function resultError(msg = 'Request failed', {
	code = -1,
	data = null
} = {}) {
	return {
		code: 0,
		data,
		msg,
	}
}