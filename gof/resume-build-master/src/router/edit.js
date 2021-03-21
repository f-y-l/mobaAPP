import Vue from 'vue'
import Router from 'vue-router'

import EditPage from '../views/editPage/Index.vue'
import UserCenterPage from '../views/userCenterPage/UserCenterPage.vue'
import Login from '../pages/login/index.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: EditPage
    }, {  
      path: '/edit',
      name: 'edit',
      component: EditPage
    }, {
      path: '/usercenter',
      name: 'usercenter',
      component: UserCenterPage
    }, {
      path: '/login',
      name: 'login',
      component: Login
    }
  ]
})
