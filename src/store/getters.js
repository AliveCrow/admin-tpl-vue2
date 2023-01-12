const getters = {
	roles: state => state.user.roles,
	userInfo: state => state.user.userInfo,
	token: state => state.user.token,
	menus: state => state.permission.menus,
	permissionRoutes: state => state.permission.routes,
	isFold: state => state.config.isFold,
	tagStack: state => state.tagbar.tagStack,
	keepAliveTagStack: state => state.tagbar.keepAliveTagStack
}

export default getters
