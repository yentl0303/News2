<template>
  <div class="detail">
    <van-nav-bar title="文章详情" left-arrow @click-left="onClickLeft" fixed/>
    <div class='body'>
      <p class="p">{{detailData.title}}</p>
      <!-- 作者信息 -->
      <div class="detailAut">
        <div class="img">
            <img :src="detailData.aut_photo" alt="">
        </div>
        <div class="textBox">
            <div>{{detailData.aut_name}}</div>
            <div>{{detailData.pubdate | fliterTimeDay}}</div>
        </div>
        <div class="focus">
        <van-button v-if="detailData.is_followed != false" type='danger' @click="removeFocus">已关注</van-button>
        <van-button v-else type='info' @click='focusAut'>+关注</van-button>
        </div>
      </div>
      <!-- 文章内容 -->
      <!-- 文章内容 -->
        <van-cell>
            <template #title>
                <div v-html="detailData.content"></div>
            </template>
        </van-cell>
      <!-- 文章操作 -->
      <div class="opartion">
        <div class="left">
            <van-button v-if="detailData.attitude == 1" type="danger" plain round @click="remdotzan"><van-icon name="like" />点赞</van-button>
            <van-button v-else round @click="dotzan"><van-icon name="like"  />点赞</van-button>
        </div>
        <div class="rigth">
            <van-button v-if="detailData.attitude == 0"  type="danger" plain round><van-icon name="delete" />不喜欢</van-button>
            <van-button v-else round @click='unLike'><van-icon name="delete" />不喜欢</van-button>
        </div>
      </div>
      <!-- 评论 -->
       <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <p style="margin-left:10px">评论</p>
          <div v-for="(item, index) in commentData" :key="index">
          <comment :commentData='item' @openchildpanl='openchildpanl' :isReply='false' @getmycommentSemit='getmycommentSemit'></comment>
          </div>
      </van-list>
      <!-- 回复面板 -->
    <reply ref='replaypanl'></reply>
    </div>
  </div>
</template>

<script>
import comment from './comm/comment.vue'
import { getdetail, setFollw, removeFollw, setZan, removeZan, dislikes } from '@/api/search.js'
import { getcomment } from '@/api/comment.js'
import reply from './comm/reply.vue'
export default {
  components: {
    comment,
    reply
  },
  data () {
    return {
      detailData: [], // 文章数据
      id: '', // 传递过来的文章id
      loading: false, // 评论上拉组件状态
      finished: false, // 评论上拉组件数据加载状态
      commentData: [], // 评论数据
      offset: null, // 分页的标识
      limit: 10, // 默认一页请求的数据
      endid: '' // 结束的标识
    }
  },
  methods: {
    // 上拉组件事件
    async onLoad () {
      // 请求服务器获取评论数据
      var res = await getcomment('a', this.id, this.offset, this.limit)
      console.log(this.limit)
      console.log(res)
      // 保存请求的评论数据
      this.commentData = [...this.commentData, ...res.data.data.results]
      // 保存下一页标识
      this.offset = res.data.data.last_id
      // 保存最后一页的标识
      this.endid = res.data.data.end_id
      // 将list加载状态设置为false
      this.loading = false
      // 判断数据是否加载完毕
      if (this.endid === this.offset) {
        this.finished = true
      }
    },
    // 1.点击返回上一页
    onClickLeft () {
      this.$router.back()
    },
    // 2.封装请求文章详情函数
    async detailFun () {
      var res = await getdetail(this.id)
      console.log(res)
      this.detailData = res.data.data
    },
    // 3.点击关注关注作者
    async focusAut () {
      var id = this.detailData.aut_id
      // 向服务器发送请求
      await setFollw(id)
      // 将detailData的关注设置为true
      this.detailData.is_followed = true
    },
    // 4.点击已关注取消关注
    async removeFocus () {
      var id = this.detailData.aut_id
      await removeFollw(id)
      // 将detailData的关注设置为false
      this.detailData.is_followed = false
    },
    // 5.点赞
    async dotzan () {
      await setZan(this.id)
      this.detailData.attitude = 1
    },
    // 6.取消点赞
    async remdotzan () {
      await removeZan(this.id)
      this.detailData.attitude = -1
    },
    // 7.对文章不喜欢
    async unLike () {
      await dislikes(this.id)
      this.detailData.attitude = 0
    },
    // 9.打开回复面板
    openchildpanl (value) {
      this.$refs.replaypanl.show = value
      // 将评论的id传递到reply组价
      this.$refs.commentid = 1
    },
    // 10.将数据添加进列表
    getmycommentSemit (value) {
      this.commentData.unshift(value)
    }
  },
  // vue实例创建完毕之后将文章id存入data中
  created () {
    this.id = this.$route.query.id
    this.detailFun()
  }
}
</script>

<style lang='less'>
.detail{
   .van-nav-bar {
    background-color: #868efb;
  }
  .van-nav-bar__title {
    color: #fff;
  }
  .van-icon-arrow-left {
    color: #fff !important;
  }
  .body{
      margin-top: 46px;
      margin-bottom: 58px;
    .p{
        height: 55px;
        text-align: center;
        line-height: 55px;
        font-size: 20px;
    }
    .detailAut{
        padding: 0 10px;
        display: flex;
        justify-content: space-around;
        align-items: center;
        .img{
            width: 44px;
            height: 44px;
            img{
              width: 100%;
              height: 100%;
              border-radius: 50%;
            }
        }
        .textBox{
            margin-left: 10px;
            flex: 1;
            div:nth-child(2) {
              font-size: 12px;
              margin-top: 10px;
            }
        }
    }
    .opartion{
      display: flex;
      text-align: center;
      .left, .rigth{
        flex: 1;
      }
    }
  }
}
</style>
