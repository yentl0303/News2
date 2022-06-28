// 首页的接口
import create from '@/utils/create.js'
// 1.获取频道列表
export function getChannelList (params) {
  return create({
    url: '/app/v1_0/user/channels',
    method: 'get',
    params
  })
}
// 2.获取频道详情数据
export function getChanneldetail (id) {
  return create({
    url: '/app/v1_1/articles',
    method: 'get',
    params: {
      channel_id: id,
      timestamp: Date.now(),
      with_top: 0
    }
  })
}
// 3.获取所有频道列表
export function getAllChannelList (params) {
  return create({
    url: '/app/v1_0/channels',
    method: 'get',
    params
  })
}
// 4.修改频道列表
export function setChannelList (channel) {
  return create({
    url: '/app/v1_0/user/channels',
    method: 'PUT',
    data: {
      channels: channel
    }
  })
}
// 5.删除列表
export function delChannelList (channel) {
  return create({
    url: '/app/v1_0/user/channels',
    method: 'DELETE',
    data: {
      channels: channel
    }
  })
}
// 5.对文章不喜欢
export function notlikeChannelListData (id) {
  return create({
    url: '/app/v1_0/article/dislikes',
    method: 'POST',
    data: {
      target: id
    }
  })
}
// 6.对文章的反馈垃圾内容
export function reportsChannelListData (data) {
  return create({
    url: '/app/v1_0/article/reports',
    method: 'post',
    data
  })
}
// 7.拉黑作者
export function shieldUser (id) {
  return create({
    url: '/app/v1_0/user/blacklists',
    method: 'post',
    data: {
      target: id
    }
  })
}
