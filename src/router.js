import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import About from './views/About.vue'
import Login from './views/Login'
import User from './views/users/User'
import ChangePassword from './views/users/ChangePassword'

import UserRoutes from './routes/users-routes'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      component: About
    },
    {
      path:'/login',
      name:'login',
      component:Login
    },
    {
      path:'/user',
      name:'user',
      component:User,
      children:UserRoutes
    }
  ]
})
