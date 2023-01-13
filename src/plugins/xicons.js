import { Icon } from '@v2icons/utils'
import { Home, People, Bug } from '@v2icons/ionicons5'


const installxIcons = {
	install(Vue, options) {
		// 配置此应用
		Vue.component('Icon', Icon)
		Vue.component('HomeIcon', Home)
		Vue.component('PeopleIcon', People)
		Vue.component('ErrorIcon', Bug)
	}
}

export default installxIcons
