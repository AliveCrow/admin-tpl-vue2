const res = {
    "success": true,
    data: function ({
        _req
    }) {
        const header = _req.header
        if (!header.token) {
            return {
                status: 401,
                msg: '接口未认证'
            }
        } else {
            return {
                status: 200,
                permission: [
                    {
                        path: '/permission',
                        // name: _.camelCase(_.upperFirst('authority-management')),
                        children: [
                            {
                                path: 'user-management',
                                meta: {
                                    title: '用户管理',
                                    icon: 'PeopleIcon',
                                    isFixed: false,
                                    noCache: true
                                }
                            },
                            {
                                path: 'role-management',
                                meta: {
                                    title: '角色管理',
                                    icon: 'PeopleIcon',
                                    isFixed: false,
                                    noCache: true
                                }
                            },
                            {
                                path: 'permission-management',
                                meta: {
                                    title: '权限管理',
                                    icon: 'PeopleIcon',
                                    isFixed: false,
                                    noCache: true
                                }
                            }
                        ]
                    },
                    {
                        path: '/error',
                        children: [
                            {
                                path: '404',
                                meta: {
                                    title: '404',
                                    icon: 'ErrorIcon',
                                    isFixed: false,
                                    noCache: true
                                }
                            },
                            {
                                path: '401',
                                meta: {
                                    title: '401',
                                    icon: 'ErrorIcon',
                                    isFixed: false,
                                    noCache: true
                                }
                            }
                        ]
                    }
                ]
            }
        }
    }
}