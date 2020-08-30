import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    menu: [],
    isCollapse: false,
  },
  mutations: {
    setmenu(state, payload) {
      state.menu = payload;
    },
    setisCollapse(state) {
      state.isCollapse = !state.isCollapse;
    }
  },
  actions: {
  },
  modules: {
  }
})
