<template>
  <div class="reply">
  <van-popup v-model="show" position="bottom" :style="{ height: '70%' }">
   <!-- 当前评论 -->
   <p style='padding:0 10px'>当前评论</p>
   <comment :commentData="commentsObj" :isReply='true'></comment>
    <!-- 回复列表 -->
    <p style='padding:0 10px'>评论回复</p>
   <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
    <comment  v-for="(item, index) in replyData" :key="index" :isReply='true' :commentData='item' @getmycommentSemit='getmycommentSemit' :commentid='commmid'></comment>
   </van-list>
  </van-popup>
  </div>
</template>

<script>
import comment from './comment.vue'
import { getcomment } from '@/api/comment.js'
import bus from '@/utils/bus.js'
export default {
  components: {
    comment
  },
  data () {
    return {
      show: false, // 控制面板显示与隐藏
      replyData: [], // 存储回复评论列表
      commentsObj: [], // 存储评论数据
      loading: false, // 上拉组件状态
      finished: false, // 上拉数据状态
      offset: null, // 请求页数标识
      limit: 10, // 默认请求数据长度
      endid: '', // 结束标识
      commmid: ''
    }
  },
  methods: {
    // 1.评论上拉
    async onLoad () {
      // 请求回复列表
      var res = await getcomment('c', this.commentsObj.com_id.toString(), this.offset, this.limit)
      this.replyData = [...this.replyData, ...res.data.data.results]
      // 记录offset
      this.offset = res.data.data.last_id
      // 记录结束标识
      this.endid = res.data.data.end_id
      this.loading = false
      if (this.offset === this.endid) {
        this.finished = true
      }
    },
    // 2.执行将评论数据添加进数据列表
    getmycommentSemit (value) {
      this.replyData.unshift(value)
      console.log('reply:', this.commentsObj.com_id.toString())
      this.commentsObj.reply_count++
    }
  },
  mounted () {
    bus.$on('fromData', value => {
      this.commentsObj = value
      this.commmid = this.commentsObj.com_id.toString()
      console.log(this.commmid)
      this.replyData = [] // 存储回复评论列表
      this.loading = false // 上拉组件状态
      this.finished = false
      this.offset = null
      this.endid = ''// 结束标识
    })
  }
}
</script>

<style lang='less'>
.reply{
  .cell{
   display: flex;
   justify-content: space-between;
  .img{
    width: 33px;
    height: 33px;
    img{
      width: 100%;
      height: 100%;
      border-radius: 50%;
    }
  }
  .textBox{
    flex: 1;
    margin-left: 10px;
    div:nth-child(1){
      color: #585b67;
    }
    div:nth-child(2){
      padding: 10px 0;
    }
    .right{
     padding: 5px 10px;
     background-color: #eaefee;
     border-radius: 15px;
     margin-left: 10px;
    }
  }
  .like{
      .icon{
        font-size: 20px;
        margin-right: 5px;
        vertical-align: middle;
        color: #ed3b22;
      }
  }
   }
}
</style>
