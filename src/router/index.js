import Vue from 'vue'
import VueRouter from 'vue-router'
import { getUserByToken } from "@/request/api"
import store from '../store'

Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    redirect: "/homepage"
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "login" */ '../views/Login/login.vue')
  },
  {
    path: "*",
    component: () => import(/* webpackChunkName: "404" */ '../views/404.vue')
  }

]

var homepageRoutes = {
  "/editcategory": {
    path: "/editcategory/:cid",
    component: () => import(/* webpackChunkName: "editcategory" */ '../views/category/EditCategory.vue')
  },
  "/editattribute": {
    path: "/editattribute/:aid",
    component: () => import(/* webpackChunkName: "editattribute" */ '../views/attribute/EditAttribute.vue')
  },
  "/editbrand": {
    path: "/editbrand/:bid",
    component: () => import(/* webpackChunkName: "editbrand" */ '../views/brand/EditBrand.vue')
  },
  "/edittopic": {
    path: "/edittopic/:tid",
    component: () => import(/* webpackChunkName: "edittopic" */ '../views/topic/EditTopic.vue')
  },
  "/editgood": {
    path: "/editgood/:gid",
    component: () => import(/* webpackChunkName: "editgood" */ '../views/good/EditGood.vue')
  },
  "/good": {
    path: "/good",
    component: () => import(/* webpackChunkName: "goods" */ '../views/good/Good.vue')
  },
  "/category": {
    path: "/category",
    component: () => import(/* webpackChunkName: "category" */ '../views/category/Category.vue')
  },
  "/brand": {
    path: "/brand",
    component: () => import(/* webpackChunkName: "brand" */ '../views/brand/Brand.vue')
  },
  "/attribute": {
    path: "/attribute",
    component: () => import(/* webpackChunkName: "attribute" */ '../views/attribute/Attribute.vue')
  },
  "/order": {
    path: "/order",
    component: () => import(/* webpackChunkName: "order" */ '../views/order/Order.vue')
  },
  "/topic": {
    path: "/topic",
    component: () => import(/* webpackChunkName: "topic" */ '../views/topic/Topic.vue')
  },
  "/statdata": {
    path: "/statdata",
    component: () => import(/* webpackChunkName: "statdata" */ '../views/statdata/Statdata.vue')
  }
}


const router = new VueRouter({
  routes
})

function getRouter() {
  var newRouters = [];
  store.state.menu.forEach(el => {
    if (homepageRoutes[el.path]) {
      newRouters.push(homepageRoutes[el.path])
    }
  })
  if (newRouters.length > 0) {
    router.addRoutes([
      {
        path: '/homepage',
        name: 'Homepage',
        component: () => import(/* webpackChunkName: "homepage" */ '../views/Homepage/homepage.vue'),
        children: newRouters
      }
    ])
  }
  return newRouters[0].path
}

router.beforeEach((to, from, next) => {
  //登录页面跳转到系统首页
  if (from.path == "/login" && to.path == "/homepage" && store.state.menu.length > 0) {
    // 动态添加当前登录用户的路由规则
    next(getRouter());
    // 登录后的其他页面刷新（vuex初始值）
  } else if (localStorage.getItem("token") && store.state.menu.length === 0) {
    // 发送请求
    getUserByToken().then(res => {
      if (res.errno === 0) {
        // menu存到vuex
        store.commit('setmenu', res.data.menu);
        // 动态添加当前登录用户的路由规则
        getRouter()
        // 返回到原来的页面
        next(to);
      }
    })
    // 防止用户未登录，访问其他页面
  } else if (!localStorage.getItem("token") && to.path != "/login") {
    return next("/login")
    // 登录后不允许访问登录页面
  } else if (localStorage.getItem("token") && to.path == "/login") {
    return next(from);
  } else {
    return next();
  }
})

export default router
