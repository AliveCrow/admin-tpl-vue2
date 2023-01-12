import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

//如首页和登录页和一些不用权限的公用页面
export const constantRouterMap = [
	{
		path: '/',
		name: 'home',
		redirect: '/dashboard',
		component: () => import('@/layout/index'),
		children: [],
		meta: {
			isFixed: true
		}
	},
	{ path: '/login', name: 'login', component: () => import('@/views/login') },
	{
		path: '/404',
		name: '404',
		component: () => import('@/views/error/404')
	}
]

//异步挂载的路由
//动态需要根据权限加载的路由表
export const asyncRouterMap = [
	// {path: '*', redirect: '/404', hidden: true}
];


const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
	return originalPush.call(this, location).catch(err => err)
}

//实例化vue的时候只挂载constantRouter
const router = new VueRouter({
	mode: 'history',
	// base: process.env.BASE_URL,
	routes: constantRouterMap
})

export default router
