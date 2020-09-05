import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    menu: [],
    isCollapse: false,
    UserPermissions: "",
    menu: []
  },
  mutations: {
    setmenu(state, payload) {
      state.menu = payload;
    },
    setisCollapse(state) {
      state.isCollapse = !state.isCollapse;
    },
    //获取当前用户权限
    GetUserPermissions(state, payload) {
      state.UserPermissions = payload;
    },
    //获取menu
    GetMenu(state, payload) {
      state.menu = payload;
    }
  },
  actions: {
  },
  modules: {
  }
})
