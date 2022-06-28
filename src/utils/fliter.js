import Vue from 'vue'
// 导入时间插件
import dayjs from 'dayjs'
// 从dayjs导入相对时间插件
import relativeTime from 'dayjs/plugin/relativeTime'
// 导入dayjs语言包
import 'dayjs/locale/zh-cn'
import moment from 'moment'
// 将插件使用到dayjs中
dayjs.extend(relativeTime)
// 全局使用语言
dayjs.locale('zh-cn')
// 全局过滤器  // 得到相对时间
Vue.filter('fliterTimeDay', (value) => {
  return dayjs().from(dayjs(value))
})

// 全局过滤器  // 得到时间格式
Vue.filter('fliterDate', (value) => {
  return value === '' ? '' : moment(value).format('YYYY-MM-DD')
})
