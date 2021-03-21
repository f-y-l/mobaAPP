import Vue from 'vue'
import Vuex from 'vuex'
import resume from './resume'
import user from './user'
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    resume,
    user
  }
})
