import Vue from 'vue'
import Router from 'vue-router'
import Main from './views/Main.vue'
import About from './views/About.vue'
import Login from './views/Login'
import PageDesigner from './designers/page-designer.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'main',
      component: Main
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
      path:'/page-designer',
      name:'page-designer',
      component:PageDesigner
    }
  ]
})
