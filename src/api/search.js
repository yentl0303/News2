import create from '@/utils/create'
// 1.请求搜索联想
export function getThinkList (params) {
  return create({
    url: '/app/v1_0/suggestion',
    method: 'get',
    params
  })
}
// 2.请求搜索结果
export function getSearchResult (pages, per, qs) {
  return create({
    url: '/app/v1_0/search',
    method: 'get',
    params: {
      page: pages,
      per_page: per,
      q: qs
    }
  })
}

// 3.文章详情
export function getdetail (id) {
  return create({
    url: '/app/v1_0/articles/' + id,
    method: 'get'
  })
}

// 4.对作者关注
export function setFollw (id) {
  return create({
    url: '/app/v1_0/user/followings',
    method: 'post',
    data: {
      target: id
    }
  })
}

// 5.对作者取消关注
export function removeFollw (target) {
  return create({
    url: '/app/v1_0/user/followings/' + target,
    method: 'DELETE'
  })
}

// 6.对文章点赞
export function setZan (id) {
  return create({
    url: '/app/v1_0/article/likings',
    method: 'post',
    data: {
      target: id
    }
  })
}

// 7.取消文章点赞
export function removeZan (target) {
  return create({
    url: '/app/v1_0/article/likings/' + target,
    method: 'DELETE'
  })
}

// 8.对文章不喜欢
export function dislikes (id) {
  return create({
    url: '/app/v1_0/article/dislikes',
    method: 'post',
    data: {
      target: id
    }
  })
}
