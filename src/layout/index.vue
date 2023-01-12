<template>
    <div class="common-layout">
        <el-container>
            <el-aside :width="!isFold ? '250px' : '64px'">
                <el-menu router :collapse="isFold" :collapse-transition="false" :default-active="$route.path"
                    @select="clickLink">
                    <Logo :collapse="isFold" />
                    <template v-for="menu in menus">
                        <el-submenu :index="menu.path" v-if="menu.children.length > 0 && !menu.hidden" :key="menu.name">
                            <template slot="title">
                                <i class="el-icon-location"></i>
                                <span slot="title">{{ menu.meta.title }}</span>
                            </template>
                            <el-menu-item v-for="child in menu.children" :index="child.path" :key="child.name">
                                <span slot="title">{{ child.meta.title }}</span>
                            </el-menu-item>
                        </el-submenu>
                        <el-menu-item :index="menu.path" v-else-if="!menu.hidden" :key="menu.path">
                            <i class="el-icon-setting"></i>
                            <span slot="title">{{ menu.meta.title }}</span>
                        </el-menu-item>
                    </template>
                </el-menu>
            </el-aside>
            <el-container>
                <el-header>
                    <AsideHeader></AsideHeader>
                    <TagBar @refresh="refreshRoute"></TagBar>
                </el-header>
                <el-main>
                    <transition name="fade-transform" mode="out-in">
                        <keep-alive :include="keepAliveTagStack">
                            <router-view :key="$route.name + routeKey"></router-view>
                        </keep-alive>
                    </transition>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Logo from './Logo.vue';
import AsideHeader from './Header.vue'
import TagBar from './TagBar.vue';

export default {
    name: "LayOut",
    components: {
        Logo,
        AsideHeader,
        TagBar
    },
    data() {
        return {
            routeKey: ''
        };
    },
    computed: {
        ...mapGetters([
            'menus',
            'isFold',
            'keepAliveTagStack'
        ])
    },
    methods: {
        clickLink(path) {

        },
        refreshRoute(date) {
            this.routeKey = date
        }
    }
}
</script>

<style lang="scss" scoped>
.common-layout {
    .el-menu {
        height: 100%;
        flex: 1
    }

    .el-container {
        min-height: 100vh;
    }

    .el-header {
        padding: 0;
        height: 98px !important;
    }

    .common-aside {
        display: flex;
        flex-direction: column;
        height: 100%;
    }
}
</style>