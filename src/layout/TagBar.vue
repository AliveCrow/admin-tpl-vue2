<template>
    <div class="tab-bar-view">
        <span v-for="tag in tagStack" :key="tag.name"
            :class="'tab-item' + [isFixed(tag) ? ' fixed' : ''] + [isCurrent(tag) ? ' current' : '']"
            @click="clickTag(tag)">
            {{ tag.meta.title }}
            <i v-if="isCurrent(tag)" class="el-icon-refresh" @click="refresh"></i>
            <i v-if="!isFixed(tag)" class="el-icon-close" @click="closeTag(tag)"></i>
        </span>
        <!-- <span class="tab-item current">
            {{ $route.name }}
            <i class="el-icon-refresh"></i>
            <i class="el-icon-close"></i>
        </span>
        <span class="tab-item">
            {{ $route.name }}
        </span> -->
    </div>
</template>

<script>
import { mapGetters } from 'vuex';

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
            const fixedTag = this.permissionRoutes.filter(route => route.meta.isFixed)
            this.$store.commit('tagbar/SET_TAG_STACK', fixedTag);
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

.tab-bar-view {
    height: $tab-bar-height;
    padding-left: 5px;
    border-bottom: 1px solid rgba($--color-primary, .1);
    white-space: nowrap;
    position: relative;
    width: 100%;


    .tab-item {
        font-size: .8rem;
        display: inline-block;
        padding: 0 10px 0 15px;
        height: $tab-bar-height;
        line-height: $tab-bar-height;
        border: 1px solid rgba($--color-primary, .1);
        margin-right: 4px;
        background-color: #eee;
        cursor: default;

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
        position: relative;
        box-shadow: none !important;
        border-bottom: 1px solid #fff;

        &:hover {

            border-bottom: 1px solid $--color-primary;
        }
    }
}
</style>