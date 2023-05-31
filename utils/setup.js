import http from '@/apis/http/index.js'
import apis from '@/apis/index.js'
import {
	showToast
} from '@/utils/utils.js'

export function setupProvide(app) {
	app.provide('http', http)
	app.provide('apis', apis)
	app.provide('showToast', showToast)
	app.provide('route', uni.$u.route)
}