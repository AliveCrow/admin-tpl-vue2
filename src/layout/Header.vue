<template>
    <div class="aside-header">
        <div class="icon-fold">
            <div class="icon" @click="toggleAside">
                <i class="el-icon-s-fold" v-if="!isFold"></i>
                <i class="el-icon-s-unfold" v-else></i>
            </div>
            <el-breadcrumb separator="/">
                <transition-group name="breadcrumb">
                    <el-breadcrumb-item :to="{ path: '/dashboard' }" key="dashboard">首页</el-breadcrumb-item>
                    <el-breadcrumb-item v-if="$route.name !== '主页'" :key="$route.name">{{
                        $route.name
                    }}</el-breadcrumb-item>
                </transition-group>
            </el-breadcrumb>
        </div>
        <el-dropdown class="avatar" :show-timeout="0" :hide-timeout="0">
            <span class="el-dropdown-link">
                下拉菜单<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item icon="el-icon-plus">黄金糕</el-dropdown-item>
                <el-dropdown-item icon="el-icon-circle-plus">狮子头</el-dropdown-item>
                <el-dropdown-item icon="el-icon-circle-plus-outline">螺蛳粉</el-dropdown-item>
                <el-dropdown-item icon="el-icon-check">双皮奶</el-dropdown-item>
                <el-dropdown-item icon="el-icon-circle-check">蚵仔煎</el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    name: 'AsideHeader',
    computed: {
        ...mapGetters([
            'isFold'
        ])
    },
    methods: {
        toggleAside() {
            this.$store.commit('config/TOGGLE_FOLD', !this.isFold);
        }
    }
}
</script>

<style lang="scss" scoped>
.aside-header {
    height: 64px;
    box-shadow: 0 1px 4px rgb(0 21 41 / 8%);
    display: flex;
    align-items: center;
    justify-content: space-between;

    .avatar {
        cursor: default;

        .el-dropdown-link {
            padding: 0 22px;
            height: 64px;
            line-height: 64px;
            display: inline-block;
        }

        :hover {
            background-color: rgba($--color-primary, .2);
        }

    }

    .icon-fold {
        cursor: pointer;
        display: flex;
        align-items: center;

        .icon {
            i {
                font-size: 25px;
                vertical-align: -.225em;
                height: 64px;
                line-height: 64px;
                padding: 0 22px;
            }

            :hover {
                background-color: rgba($--color-primary, .2);
            }
        }


    }
}
</style>