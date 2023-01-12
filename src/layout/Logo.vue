
<template>
    <div class="aside-logo">
        <transition name="sidebarLogoFade">
            <router-link v-if="collapse" key="collapse" class="sidebar-logo-link" to="/">
                <img v-if="logo" :src="logo" class="sidebar-logo" height="40" width="40">
            </router-link>
            <router-link v-else key="expand" class="sidebar-logo-link" to="/">
                <img v-if="logo" :src="logo" class="sidebar-logo" height="40" width="40">
                <h1 class="sidebar-title">{{ title }} </h1>
            </router-link>
        </transition>
    </div>
</template>

<script>
import LogoPng from '@/assets/logo.png'
export default {
    name: 'AsideLogo',
    props: {
        collapse: {
            type: Boolean,
            required: true,
            default: false
        }
    },
    data() {
        return {
            logo: LogoPng,
            title: process.env.VUE_APP_TITLE_NAME
        }
    }
}
</script>

<style lang="scss" scoped>
.sidebarLogoFade-enter-active {
    transition: opacity 1.5s;
}

.sidebarLogoFade-enter,
.sidebarLogoFade-leave-to {
    opacity: 0;
}

.sidebar-logo-link {
    text-decoration: none;
    color: #000;
}

.sidebar-logo-link {
    margin: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;

    h1 {
        font-size: 20px;
    }
}
</style>