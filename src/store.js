import Vue from 'vue'
import Vuex from 'vuex'

import app from '@/stores/app'
import custom from '@/stores/custom'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  modules:{
    'app':app,
    'custom':custom
  },
  mutations: {
  },
  actions: {

  }
})
