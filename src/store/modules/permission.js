import router, { constantRouterMap, asyncRouterMap } from "@/router";
import { loadView } from '@/utils'
import api from '@/api'
import Layout from '@/layout'
import _ from 'lodash'

function generateRoute(array, parentRoute = {}) {

	const result = array.map(route => {
		const routePath = _.startsWith(route.path, '/') ? _.trimStart(route.path, '/') : route.path
		const parent = {
			path: route.path,
			name: route?.name ? route.name : _.upperFirst(_.camelCase(routePath)),
			component: parentRoute.path ? loadView(parentRoute.path + '/' + route.path) : Layout,
			hidden: route?.hidden || false,
			meta: {
				noCache: true,
				isFixed: false,
				icon: '',
				...(route?.meta || {})
			},
			children: route?.children || []
		}

		if (route.children && route.children.length > 0) {
			parent.children = generateRoute(route.children, parent)
		}
		return parent
	})
	return result
}


const state = {
	menus: [],
	routes: constantRouterMap[0].children
}
const mutations = {
	SET_MENU: (state, menus) => {
		const initMenu = constantRouterMap.find(r => r.name === 'layout')
		state.menus = initMenu.children.concat(menus || [])
	},
	SET_ROUTES: (state, routes) => {
		state.routes = constantRouterMap.concat(routes).filter(route => !route.hidden)
	}
}
const actions = {
	GenerateRoutes({ commit }) {
		return new Promise((resolve, reject) => {
			api.user.getPermission().then(res => {
				const permissionRoutes = generateRoute(res.data.permission).concat([{ path: '*', redirect: '/404', hidden: true, meta: { isFixed: false } }])
				commit('SET_ROUTES', permissionRoutes)
				permissionRoutes.forEach(item => {
					router.addRoute(item)
				})
				resolve()
			})
		})
	}
}

export default {
	state,
	mutations,
	actions,
	namespaced: true,
}
