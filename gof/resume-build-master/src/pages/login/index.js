import Vue from 'vue'
import App from './index.vue'
import store from '../../store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
import VueAxios from 'vue-axios'
import router from '../../router/edit.js'

axios.defaults.baseURL = './'

Vue.use(VueAxios,axios)
Vue.use(ElementUI)
Vue.config.productionTip = false

new Vue({
  comments: true,
  store,
  router,
  render: h => h(App)
}).$mount('#app')
