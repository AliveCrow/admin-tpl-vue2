<template>
    <el-menu-item :index="menuIndex(route)" :key="route.path">
        <Icon>
            <component :is="route.meta.icon" />
        </Icon>
        <template #title>
            {{ route.meta.title }}
        </template>
    </el-menu-item>
</template>

<script>
import _ from 'lodash'
export default {
    name: 'MenuItem',
    props: {
        route: {
            type: Object,
            required: true,
            default() {
                return {
                    path: '',
                    name: '',
                    meta: {
                        title: '',
                        icon: '',
                        isFixed: false,
                        noCache: true
                    },
                    children: []
                }
            }
        },
        index: {
            type: String,
            required: false,
            default: ''
        }
    },
    computed: {
        menuIndex() {
            return (route) => {
                if (!this.index) {
                    return _.startsWith(route.path, '/') ? route.path : `/${route.path}`
                }
                return this.index
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.xicon {
    margin-right: 5px;
}
</style>