<template>
  <div class="common-layout">
    <el-container>
      <el-aside :width="!isFold ? '250px' : '64px'">
        <el-menu router :collapse="isFold" :collapse-transition="false" :default-active="$route.path"
          @select="clickLink">
          <Logo :collapse="isFold" />
          <template v-for="route in permissionRoutes">
            <SubMenu v-if="route.children.length > 0 && route?.meta?.title" :route="route" :key="route.name" />
            <MenuItem v-else-if="route.children.length > 0 && !route?.meta?.title" v-for="child in route.children"
              :route="child" :key="child.path" />
            <MenuItem v-else v-for="child in route.children" :route="child" :key="child.name" />
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
import MenuItem from './MenuItem.vue';
import SubMenu from './SubMenu.vue';
import _ from 'lodash'

export default {
  name: "LayOut",
  components: {
    Logo,
    AsideHeader,
    TagBar,
    MenuItem,
    SubMenu,
  },
  data() {
    return {
      routeKey: ''
    };
  },
  computed: {
    ...mapGetters([
      'permissionRoutes',
      'menus',
      'isFold',
      'keepAliveTagStack'
    ]),

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
