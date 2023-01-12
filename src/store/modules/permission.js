import router, { constantRouterMap, asyncRouterMap } from "@/router";
import { loadView } from '@/utils'
import api from '@/api'
import Layout from '@/layout'

function generateRoute(array) {
	const result = array.map(item => {
		const parent = {
			name: item.name,
			path: item.path,
			children: item.children || [],
			meta: item?.meta || {
				isFixed: false
			},
		}

		if (item?.component) {
			parent.component = loadView(item.component)
		}

		if (item.children && item.children.length > 0) {
			parent.children = item.children.map(r => {
				return {
					name: r.name,
					path: r.path,
					component: loadView(r.component),
					children: r.children || [],
					meta: r?.meta || {
						isFixed: false
					},
				}
			})
		}
		return parent
	}).concat([{ path: '*', redirect: '/404', hidden: true, meta: { isFixed: false } }])
	return result


}

export function generateMenu(array) {
	return array.map(item => {
		const parent = {
			name: item.name,
			path: item.path,
			hidden: item.hidden || false,
			children: [],
			meta: item?.meta || {}
		}
		if (item.children && item.children.length > 0) {
			parent.children = item.children.map(r => {
				return {
					name: r.name,
					path: `${item.path}/${r.path}`,
					children: r.children || [],
					hidden: r.hidden || false,
					meta: r?.meta || {}
				}
			})
		}
		return parent
	})
}

const state = {
	menus: [],
	routes: []
}
const mutations = {
	SET_MENU: (state, menus) => {
		state.menus = menus
	},
	SET_ROUTES: (state, routes) => {
		state.routes = routes
	}
}
const actions = {
	GenerateRoutes({ commit }) {
		return new Promise((resolve, reject) => {
			api.user.getPermission().then(res => {
				const routes = generateRoute(res.data.permission)
				routes.forEach(item => {
					router.addRoute('home', item)
				})
				console.log(generateMenu(res.data.permission));
				commit('SET_MENU', generateMenu(res.data.permission))
				commit('SET_ROUTES', routes)
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
