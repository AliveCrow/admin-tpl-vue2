import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'

import user from '@/store/modules/user'
import permission from "@/store/modules/permission";
import config from '@/store/modules/config'
import tagbar from '@/store/modules/tagbar';

Vue.use(Vuex)

export default new Vuex.Store({
  getters,
  modules: {
    user,
    permission,
    config,
    tagbar
  }
})
