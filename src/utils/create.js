import axios from 'axios'
// 导入store
import store from '@/store'
// 导入json-bigint 以解决number安全值的问题
import jsonbigint from 'json-bigint'
// 导入保存token的方法
import { setToken } from '@/utils/myToken.js'
const instance = axios.create({
//  基地址
  baseURL: process.env.VUE_APP_URL,
  transformResponse: [(data) => {
    try {
      return jsonbigint.parse(data)
    } catch (error) {
      return data
    }
  }]
})

// 新的定义axios
const instance1 = axios.create({
  baseURL: process.env.VUE_APP_URL
})
// 添加请求拦截器
instance.interceptors.request.use(function (config) {
//  在发送请求之前做些什么
//  判断store中是否存在token
  const token = store.state.infoToken.token
  if (token) {
    // 存在就将token给响应头
    config.headers.Authorization = 'Bearer ' + token
  }
  return config
}, function (error) {
//  对请求错误做些什么
  return Promise.reject(error)
})
// 添加响应拦截器
instance.interceptors.response.use(function (response) {
//  对响应数据做点什么
  return response
}, async function (error) {
  //  对响应错误做点什么
  // 获取error里的状态码401
  var status = error.response.status
  // 判断状态码是否是token过期
  if (status === 401) {
    // 如果状态码过期
    // 就获取store中的刷新token
    var refreshToken = store.state.infoToken.refresh_token
    // 重新发送刷新token请求
    var res = await instance1({
      url: '/app/v1_0/authorizations',
      method: 'PUT',
      // 请求头
      headers: {
        Authorization: 'Bearer ' + refreshToken
      }
    })
    // 接收响应回来的token
    console.log(res)
    var newToken = res.data.data.token
    // 将新token和刷新token参数保存到对象中
    var tokenObj = {
      token: newToken,
      refresh_token: refreshToken
    }
    // 将新创建的对象保存到store和locatStroage
    store.commit('setToken', tokenObj)
    setToken('infoToken', tokenObj)
    // 继续发送未完成的请求
    return instance(error.config)
  }
  return Promise.reject(error)
})

export default instance
