import Vue from 'vue'
import VueRouter from 'vue-router'

// 导入要跳转的组件
import indexs from '@/views/indexs.vue'
import login from '@/views/login/login.vue'
import home from '@/views/home/home.vue'
import index from '@/views/home/index/index.vue'
import my from '@/views/home/my/my.vue'
import search from '@/views/home/search/search.vue'
import searchResult from '@/views/home/searchResult/searchResult.vue'
import detail from '@/views/home/detail/detail.vue'
import personal from '@/views/home/personal/personal.vue'
import zhi from '@/views/home/personal/comm/zhi.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/indexs',
    component: indexs
  },
  {
    // 登录页1
    path: '/login',
    component: login
  },
  {
    // 登录页2
    path: '/checklogin',
    component: login
  },
  {
    // 文章详情页
    path: '/detail',
    component: detail
  },
  {
    // 首页
    path: '/home',
    component: home,
    redirect: '/index',
    children: [
      {
        // 首页
        path: '/index',
        component: index
      },
      {
        // 我的
        path: '/my',
        component: my
      },
      {
        // 搜索
        path: '/search',
        component: search
      }
    ]
  },
  { // 搜索结果
    path: '/searchResult',
    component: searchResult
  },
  { // 个人信息
    path: '/personal',
    component: personal
  },
  { // 小智同学
    path: '/zhi',
    component: zhi
  }
]

const router = new VueRouter({
  routes
})

export default router
