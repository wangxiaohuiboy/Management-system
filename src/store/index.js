import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    menu:[]
  },
  mutations: {
    setmenu(state,payload){
      state.menu = payload;
    }
  },
  actions: {
  },
  modules: {
  }
})
