<template>
    <el-submenu :index="route.path">
        <template slot="title">
            <Icon>
                <component :is="route.meta.icon" />
            </Icon>
            <span slot="title">{{ route.meta.title }}</span>
        </template>
        <template v-for="child in route.children">
            <MenuItem v-if="child.children.length === 0" :route="child" :index="`${route.path}/${child.path}`"
                :key="child.path" />
            <SubMenu :route="child" :key="child.name" v-else />
        </template>
    </el-submenu>
</template>

<script>
import MenuItem from './MenuItem.vue';

export default {
    name: 'SubMenu',
    components: { MenuItem },
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
        }
    }
}
</script>

<style lang="scss" scoped>
.xicon {
    margin-right: 5px;
}
</style>