import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import { loadModules } from '@/utils'

Vue.use(Vuex)

const modules = loadModules(require.context('./modules', false, /\.js$/))

export default new Vuex.Store({
  getters,
  modules
})
