import api from '@/api'
import tokenUtil from "@/utils/auth";

const state = {
	userInfo: {},
	roles: [],
	token: ''
}
const mutations = {
	SET_TOKEN: (state, token) => {
		state.token = token
	},
	SET_USERINFO: (state, userInfo) => {
		state.userInfo = userInfo
	},
	SET_ROLES: (state, roles) => {
		state.roles = roles
	}
}
const actions = {
	Login({commit}, {username, password}) {
		return new Promise((resolve, reject) => {
			api.user.login({username, password})
				.then(res => {
					if (res.data.status === 200) {
						tokenUtil.set(res.data.token)
						commit('SET_TOKEN', res.data.token)
						resolve()
					} else {
						reject()
					}
				})
				.catch(err => {
					reject(err)
				})
		})
	},
	FetchUserInfo({commit}) {
		return new Promise((resolve, reject) => {
			api.user.getUserInfo().then(res => {
				if (res.data.status === 200) {
					commit('SET_USERINFO', res.data.userInfo)
					commit('SET_ROLES', res.data.userInfo.roles)
					resolve()
				} else {
					reject()
				}
			}).catch(err => reject(err))
		})
	}
}

export default {
	namespaced: true,
	state,
	mutations,
	actions,
}
