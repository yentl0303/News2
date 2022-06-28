import create from '@/utils/create'
// 1.获取评论或回复列表
export function getcomment (aandb, id, offset, limit) {
  return create({
    url: '/app/v1_0/comments',
    method: 'get',
    params: {
      type: aandb,
      source: id,
      offset: offset,
      limit: limit
    }
  })
}
// 2.发送评论
export function setcomment (id, value) {
  return create({
    url: '/app/v1_0/comments',
    method: 'post',
    data: {
      target: id,
      content: value
    }
  })
}
// 3.发送评论
export function setcommentReply (id, value, artid) {
  return create({
    url: '/app/v1_0/comments',
    method: 'post',
    data: {
      target: id,
      content: value,
      art_id: artid
    }
  })
}
// 4.对评论或评论回复点赞
export function setcommentLike (id) {
  return create({
    url: '/app/v1_0/comment/likings',
    method: 'post',
    data: {
      target: id
    }
  })
}
