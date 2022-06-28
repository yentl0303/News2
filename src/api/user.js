import create from '@/utils/create'
// 1.获取用户个人数据
export function getUserData () {
  return create({
    url: '/app/v1_0/user',
    method: 'get'
  })
}
// 2.获取用户个人数据
export function getUserPersonData () {
  return create({
    url: '/app/v1_0/user/profile',
    method: 'get'
  })
}
// 3.修改用户数据
export function setUserPersonData (data) {
  return create({
    url: '/app/v1_0/user/profile',
    method: 'PATCH',
    data
  })
}
// 4.上传图片
export function uploadPersonalImage (photo) {
  // 异步请求不能携带文件
  var fd = new FormData()
  fd.append('photo', photo)
  return create({
    url: '/app/v1_0/user/photo',
    method: 'PATCH',
    data: fd
  })
}
