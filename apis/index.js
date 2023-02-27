// 自动加载js模块 
// import path from 'path';
// const files  = require.context('./modules', false, /\.js$/)

// const modules = {}

// files.keys().forEach(key => {
// 	const name = path.basename(key, '.js')
// 	modules[name] = files(key).default || files(key)
// })


// vue3 导入模块 无require
const modules = {}
const routeModules = import.meta.glob('./modules/*.js', { eager: true });
Object.keys(routeModules).forEach(item => {
	Object.assign(modules, routeModules[item].default)
});

export default modules

