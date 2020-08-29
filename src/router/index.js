import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: "homepage"
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "login" */ '../views/Login/login.vue')
  },
  {
    path: '/homepage',
    name: 'Homepage',
    component: () => import(/* webpackChunkName: "homepage" */ '../views/Homepage/homepage.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
