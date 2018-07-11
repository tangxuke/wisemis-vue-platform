import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

//element-ui
//import ElementUI from 'element-ui'
//import 'element-ui/lib/theme-chalk/index.css'
//Vue.use(ElementUI)

//iview
import iView from 'iview'
import 'iview/dist/styles/iview.css'
Vue.use(iView)

//bootstrap
import 'bootstrap/dist/css/bootstrap.min.css'

Vue.config.productionTip = false


new Vue({
  el:'#app',
  router,
  store,
  render: h => h(App),
  mounted:()=>{
    
    store.commit('updateMenuList')
  }
})
