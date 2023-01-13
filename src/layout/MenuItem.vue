<template>
    <el-menu-item :index="index" :key="route.path">
        <Icon>
            <component :is="route.meta.icon" />
        </Icon>
        <span slot="title">{{ route.meta.title }}</span>
    </el-menu-item>
</template>

<script>
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
            default: ''
        }
    }
}
</script>

<style lang="scss" scoped>
.xicon {
    margin-right: 5px;
}
</style>