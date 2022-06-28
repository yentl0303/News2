import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 导入vant使用vant
import Vant, { Lazyload } from 'vant'
import 'vant/lib/index.css'
// 导入font文件
import '@/style/font.css'
// 导入自定义过滤器全局组件
import '@/utils/fliter.js'
// 导入自定义登录判断插件
import myfulgin from '@/utils/myfulgin.js'
// 适配移动端插件
import 'amfe-flexible/index.js'
Vue.use(Vant)
Vue.use(Lazyload)
// Vue.use(Toast)
Vue.use(myfulgin)
// 封装全局登录验证
// Vue.prototype.$login = function () {
//   // 获取token
//   var token = store.state.infoToken.token
//   // 判断token
//   if (!token) {
//     // 如果没登录
//     // 提示用户
//     Toast.fail('用户未登录')
//     // 跳转登录页
//     router.push('/login')
//     // 返回布尔值
//     return false
//   }
//   // 没有进入判断就是有登录，直接返回布尔值
//   return true
// }
Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
