import Vue from 'vue'
import Vuex from 'vuex'
//  导入获取token方法
import { getToken } from '@/utils/myToken.js'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    infoToken: getToken('infoToken') || {} //  有token获取token 没有就是空对象
  },
  mutations: {
    setToken: function (state, info) {
      state.infoToken = info
    }
  }
})
