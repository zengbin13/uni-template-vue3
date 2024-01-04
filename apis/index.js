// vue3 导入模块 
const modules = {};
const routeModules = import.meta.glob('./modules/*.js', {
	eager: true
});

Object.keys(routeModules).forEach((item) => {
	const moduleName = item.replace('./modules/', '').replace('.js', '');
	const moduleExports = routeModules[item].default;
	modules[moduleName] = moduleExports;
});

export default modules;