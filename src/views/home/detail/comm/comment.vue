<template>
  <div class="comment">
  <van-cell title="单元格">
    <template #title>
    <div class="cell">
     <div class="img">
         <img :src="commentData.aut_photo" alt="">
     </div>
     <div class="textBox">
      <div>{{commentData.aut_name}}</div>
      <div>{{commentData.content}}</div>
      <div>
          <span class="left">{{commentData.pubdate | fliterTimeDay}}</span>
          <span class="right" @click='replay' v-if="isReply === false">回复{{commentData.reply_count}}</span>
      </div>
     </div>
     <div class="like">
         <van-icon name="like" class="icon"/>{{commentData.like_count}}
     </div>
     </div>
    </template>
  </van-cell>
      <!-- 发表评论 -->
  <mycomment @getmycommentSemit='getmycommentSemit' :isReplyed="isReplys" :comid='comid'></mycomment>
  </div>
</template>

<script>
import mycomment from './mycomment.vue'
// 导入公交车
import bus from '@/utils/bus.js'
export default {
  props: ['commentData', 'isReply', 'commentid'],
  components: {
    mycomment
  },
  data () {
    return {
      isReplys: '',
      comid: ''
    }
  },
  methods: {
    // 1.将自己发表的评论添加到评论列表中
    getmycommentSemit (value) {
      this.$emit('getmycommentSemit', value)
    },
    // 2.点击回复按钮打开面板
    replay () {
      this.$emit('openchildpanl', true)
      // 将数据存入公交车
      bus.$emit('fromData', this.commentData)
    }
  },
  created () {
    if (this.isReply) {
      this.isReplys = true
      this.comid = this.commentid
    } else {
      this.isReplys = false
    }
  }
}
</script>

<style lang='less'>
.comment{
  padding: 0 10px;
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
