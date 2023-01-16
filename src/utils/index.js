import config from '../../config/app-config.json'

/**
 * 动态引入组件
 * @param view
 * @returns {function(*): any}
 */
export function loadView(view) {
	return (resolve) => require([`@/views${view}`], resolve
	)
}

/**
 * 自动引入modules中的内容
 * @param {*} modulesFiles require.context函数
 * @returns 
 */
export function loadModules(modulesFiles) {

	const modules = modulesFiles.keys().reduce((modules, modulePath) => {
		const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
		const value = modulesFiles(modulePath)
		modules[moduleName] = value.default
		return modules
	}, {})

	return modules
}

/**
 * 加载json配置
 * @returns 
 */
export function loadLocalConfig() {
	return new Promise((resolve, reject) => {
		const xhr = new XMLHttpRequest()
		xhr.open('GET', '/config/app-config.json', true)
		xhr.onreadystatechange = () => {
			if (xhr.readyState === 4) {
				if (xhr.status === 200) {
					resolve(JSON.parse(xhr.responseText))
				} else {
					reject(new Error(`Failed to load config file: ${xhr.status}`))
				}
			}
		}
		xhr.send()
	})
}

/**
 * 获取页面标题
 * @param {string} pageTitle 
 * @returns 
 */
export function getPageTitle(pageTitle) {
	const title = config.pageTitle || ''

	if (pageTitle) {
		return `${pageTitle} - ${title}`
	}
	return `${title}`
}