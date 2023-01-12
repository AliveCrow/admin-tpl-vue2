import Vue from 'vue'
import 'normalize.css/normalize.css'

import App from './App.vue'
import ElementUI from 'element-ui';
import router from './router'
import store from './store'
import '@/icons'
import '@/styles/element-variables.scss'
import '@/styles/index.scss'
import '@/router/before'

Vue.config.productionTip = false

Vue.use(ElementUI, { zIndex: 3000 }); // element-ui 全局配置

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
