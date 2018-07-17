import Vue from 'vue'
import Router from 'vue-router'
import Main from './views/Main.vue'
import Login from './views/users/Login'
import Logout from './views/users/Logout'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path:'/login',
      component:Login
    },
    {
      path: '/',
      name: 'main',
      component: Main,
      children:[
        {
          path:'/home',
          component:()=>import('@/views/Home')
        },
        {
          path:'/about',
          component:()=>import('@/views/About')
        },
        {
          name:'new-menu',
          path:'/new-menu',
          component:()=>import('@/views/NewMenu')
        },
        {
          name:'new-menu2',
          path:'/new-menu2/:name/:title/:path',
          component:()=>import('@/views/NewMenu2')
        },
        {
          path:'/menu-list',
          component:()=>import('@/views/Menu')
        },
        {
          path:'/register',
          component:()=>import('@/views/users/Register')
        },
        {
          path:'/users',
          component:()=>import('@/views/users/UserList')
        },
        {
          path:'/model-new',
          component:()=>import('@/models/model-new')
        },
        {
          name:'model-edit',
          path:'/model-edit/:name',
          component:()=>import('@/models/model-edit')
        },
        {
          path:'/model-list',
          component:()=>import('@/models/model-list')
        },
        {
          path:'/model-page/:model',
          component:()=>import('@/models/model-page')
        },
        {
          path:'/logout',
          component:Logout
        },
        {
          path:'*',
          component:()=>import('@/views/NotFound')
        }
      ]
    }
  ]
})
