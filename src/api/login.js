import create from '@/utils/create'
//  登录
function getLogin (data) {
  return create({
    url: '/app/v1_0/authorizations',
    method: 'post',
    data
  })
}

export { getLogin }
