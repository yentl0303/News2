// 导入store
import store from '@/store/index.js'
// 导入toast
import Vue from 'vue'
import { Toast } from 'vant'
// 导入router
import router from '@/router/index.js'
Vue.use(Toast)
// 定义一个插件的空对象
var pulginObj = {}
// 为对象添加install方法
pulginObj.install = function (vueObj) {
  // 向传入的参数vue的原型添加登录方法
  vueObj.prototype.$login = function () {
    // 获取store里的token
    var token = store.state.infoToken.token
    // 判断token
    if (!token) {
      // 为空则是没登录
      // 提示用户没有登录
      Toast.fail('用户未登录')
      // 跳转到登录页
      router.push('/checklogin')
      // 返回布尔值
      return false
    }
    // 如果不执行判断，那么代表已登录,直接返回布尔值
    return true
  }
}

// 导出插件对象
export default pulginObj
// 在main.js中导入插件并使用
