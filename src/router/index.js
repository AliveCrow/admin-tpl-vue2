import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '@/layout'
import _ from 'lodash'

Vue.use(VueRouter)

//如首页和登录页和一些不用权限的公用页面
export const constantRouterMap = [
	{
		path: '/',
		name: 'layout',
		redirect: '/dashboard',
		component: Layout,
		children: [
			{
				path: 'dashboard',
				name: 'Dashboard',
				component: () => import('@/views/dashboard'),
				meta: {
					title: '主页',
					icon: 'HomeIcon',
					isFixed: true,
					cache: false
				},
				children: [],
			},
		]
	},
	{
		path: '/zip',
		component: Layout,
		meta: {
			title: 'Zip',
			icon: 'HomeIcon',
		},
		children: [
			{
				path: 'index',
				name: 'Zip',
				component: () => import('@/views/zip/index'),
				meta: {
					title: 'Zip2121',
					icon: 'HomeIcon',
					isFixed: false,
				},
				children: [] // 必须有，即使为空
			}
		],
	},
	{
		path: '/login',
		name: 'login',
		hidden: true,
		component: () => import('@/views/login')
	},
	{
		path: '/404',
		name: 'NotFound',
		hidden: true,
		component: () => import('@/views/error/page-404')
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
const createRouter = () => new VueRouter({
	mode: 'history', // require service support
	routes: constantRouterMap
})

const router = createRouter()
export function resetRouter() {
	const newRouter = createRouter()
	router.matcher = newRouter.matcher // reset router
}

export default router
