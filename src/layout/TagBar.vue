<template>
    <el-scrollbar>
        <div class="tab-bar-view">
            <span v-for="tag in tagStack" :key="tag.name"
                :class="'tab-item' + [isFixed(tag) ? ' fixed' : ''] + [isCurrent(tag) ? ' current' : '']"
                @click="clickTag(tag)">
                {{ tag.meta.title }}
                <i v-if="isCurrent(tag)" class="el-icon-refresh" @click="refresh"></i>
                <i v-if="!isFixed(tag)" class="el-icon-close" @click="closeTag(tag)"></i>
            </span>
        </div>
    </el-scrollbar>
</template>

<script>
import { mapGetters } from 'vuex';
import { constantRouterMap } from "@/router";

export default {
    name: 'TabBar',
    computed: {
        ...mapGetters([
            'tagStack',
            'permissionRoutes',
            'menus'
        ]),
        isCurrent() {
            return (tag) => {
                return this.$route.name === tag.name
            }
        },
        isFixed() {
            return (tag) => {
                return tag?.meta?.isFixed || false
            }
        }
    },
    mounted() {
        this.initTags()
        this.addTags()
    },
    methods: {
        initTags() {
            const initMenu = constantRouterMap.find(r => r.name === 'layout')
            const menus = this.menus.length === 0 ? initMenu.children : this.menus
            const fixedTag = menus.filter(route => route.meta.isFixed)
            const cacheTag = menus.filter(route => !route.meta.noCache)
            this.$store.commit('tagbar/SET_TAG_STACK', fixedTag);
            this.$store.commit('tagbar/SET_KEEP_ALIVE_TAG_STACK', cacheTag);
        },
        addTags() {
            const { name } = this.$route
            if (name) {
                this.$store.commit('tagbar/ADD_TAG', this.$route)
            }
            return false
        },
        refresh() {
            const date = new Date()
            this.$emit('refresh', date.getMilliseconds())
        },
        closeTag(tag) {
            this.$store.commit('tagbar/REMOVE_TAG', tag)
            const lastTag = this.tagStack[this.tagStack.length - 1]

            this.$router.push({ name: lastTag.name })
        },
        clickTag(tag) {
            this.$router.push({ name: tag.name })
        }
    },
    watch: {
        $route(val) {
            const hasTag = this.tagStack.some(r => r.name === val.name)
            if (!hasTag) {
                this.$store.commit('tagbar/ADD_TAG', val)
            }
        }
    }
}

</script>

<style scoped lang="scss">
$tab-bar-height: 34px;

:deep(.el-scrollbar__bar) {
    bottom: 0;
}

:deep(.el-scrollbar__wrap) {
    height: 49px;
    overflow-x: hidden;
}

.tab-bar-view {
    height: $tab-bar-height;
    padding-left: 5px;
    border-bottom: 1px solid rgba($--color-primary, .1);
    white-space: nowrap;
    width: 100%;

    .tab-item {
        font-size: .8rem;
        display: inline-block;
        padding: 0 10px 0 15px;
        height: $tab-bar-height;
        line-height: $tab-bar-height;
        border: 1px solid rgba($--color-primary, .1);
        margin-right: 5px;
        background-color: #eee;
        cursor: default;
        position: relative;
        z-index: 999999;

        i {
            font-size: 10px;
            height: 15px;
            width: 15px;
            line-height: 15px;
            text-align: center;
            border-radius: 50%;


        }

        .el-icon-refresh {
            &:hover {
                background-color: $--color-success;
                color: #fff
            }
        }

        .el-icon-close {
            &:hover {
                background-color: $--color-danger;
                color: #fff
            }
        }

        &:hover {
            background-color: $--color-primary;
            color: #fff;
        }
    }

    .tab-item.fixed.current {
        padding: 0 10px 0 15px !important;
    }

    .tab-item.fixed {
        padding: 0 15px;
    }

    .current {
        background-color: #fff;
        box-shadow: none !important;
        border-bottom: 1px solid #fff !important;


        &:hover {
            border-bottom: 1px solid $--color-primary;
        }
    }
}
</style>
