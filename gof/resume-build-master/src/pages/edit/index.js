import Vue from 'vue'
import App from './index.vue'
import router from '../../router/edit.js'
import store from '../../store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueDraggable from 'vue-draggable'

axios.defaults.baseURL = './'

Vue.use(VueAxios, axios)
Vue.use(ElementUI)
Vue.use(VueDraggable)
Vue.config.productionTip = false

new Vue({
  comments: true,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
