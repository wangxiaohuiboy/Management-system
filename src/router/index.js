import Vue from 'vue'
import VueRouter from 'vue-router'
import { getUserByToken } from "@/request/api"

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
    component: () => import(/* webpackChunkName: "homepage" */ '../views/Homepage/homepage.vue'),
    children: [
      {
        path: "/good",
        component: () => import(/* webpackChunkName: "goods" */ '../views/good/Good.vue')
      },
      {
        path: "/category",
        component: () => import(/* webpackChunkName: "category" */ '../views/category/Category.vue')
      },
      {
        path: "/brand",
        component: () => import(/* webpackChunkName: "brand" */ '../views/brand/Brand.vue')
      },
      {
        path: "/attribute",
        component: () => import(/* webpackChunkName: "attribute" */ '../views/attribute/Attribute.vue')
      },
      {
        path: "/order",
        component: () => import(/* webpackChunkName: "order" */ '../views/order/Order.vue')
      },
      {
        path: "/topic",
        component: () => import(/* webpackChunkName: "topic" */ '../views/topic/Topic.vue')
      },
      {
        path: "/statdata",
        component: () => import(/* webpackChunkName: "statdata" */ '../views/statdata/Statdata.vue')
      }
    ]
  }
]

const router = new VueRouter({
  routes
})


router.beforeEach((to, from, next) => {
  if (localStorage.getItem("token")) {
    getUserByToken().then(res => {
      console.log(res);
    })
  }
  next();
})

export default router
