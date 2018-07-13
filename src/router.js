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
      component: Main,
      redirect:'/home',
      children:[
        {
          path:'home',
          component:()=>import('@/views/Home')
        },
        {
          path:'about',
          component:()=>import('@/views/About')
        },
        {
          path:'new-menu',
          component:()=>import('@/views/NewMenu')
        },
        {
          path:'menu-list',
          component:()=>import('@/views/Menu')
        },
        {
          path:'404',
          component:()=>import('@/views/NotFound')
        }
      ]
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
