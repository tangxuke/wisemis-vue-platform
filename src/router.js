import Vue from 'vue'
import Router from 'vue-router'
import Main from './views/Main.vue'

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
          path:'register',
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
          path:'*',
          component:()=>import('@/views/NotFound')
        }
      ]
    }
  ]
})
