import Vue from 'vue'
import 'normalize.css/normalize.css'

import App from './App.vue'
import ElementUI from 'element-ui';
import router from './router'
import store from './store'
import '@/styles/element-variables.scss'
import '@/styles/index.scss'
import '@/router/before'

import installxIcons from '@/utils/plugins/xicons'
import { loadLocalConfig } from '@/utils'

loadLocalConfig().then(res => {

  Vue.config.productionTip = false
  Vue.prototype.$config = res

  Vue.use(ElementUI, { zIndex: 3000 }); // element-ui 全局配置
  Vue.use(installxIcons)

  new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount('#app')
}).catch(err => {

})

