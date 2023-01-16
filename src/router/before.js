import router from '@/router'
import store from '@/store'
import tokenUtil from '@/utils/auth'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { getPageTitle } from '@/utils'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/login'] // 免登录页面
router.beforeEach((to, from, next) => {
	NProgress.start()
	const token = tokenUtil.get()

	document.title = getPageTitle(to.meta.title)

	if (token) {
		if (to.path === '/login') {
			next({ path: '/' });
		} else {
			next()
			// 判断当前用户是否已拉取完user_info信息
			if (store.getters.roles.length === 0) {
				store.dispatch('user/FetchUserInfo').then(() => {
					store.dispatch('permission/GenerateRoutes').then(() => {
						next({ ...to, replace: true })
					})
				})
			} else {
				next()
			}
		}
	} else {
		if (whiteList.indexOf(to.path) !== -1) { // 在免登录白名单，直接进入
			next();
		} else {
			next('/login'); // 否则全部重定向到登录页
		}
	}
})

router.afterEach(() => {
	NProgress.done()
})