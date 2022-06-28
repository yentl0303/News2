<template>
  <div class="mycomment">
   <van-search
    v-model="value"
    show-action
    placeholder="写评论"
  >
  <template #action>
      <div @click="onCancel">
     发送
      </div>
  </template>
  </van-search>
  </div>
</template>

<script>
import { setcomment, setcommentReply } from '@/api/comment.js'
export default {
  props: ['isReplyed', 'comid'],
  data () {
    return {
      value: '' // 输入的值
    }
  },
  methods: {
    // 1.点击发送
    async onCancel () {
      if (this.value === '') {
        return
      }
      if (this.isReplyed) {
        var res = await setcommentReply(this.comid, this.value, this.$route.query.id)
        console.log(res)
        // 将得到的数据保存
        this.$emit('getmycommentSemit', res.data.data.new_obj)
        this.value = ''
      } else {
        var ress = await setcomment(this.$route.query.id, this.value)
        console.log(ress)
        // 将得到的数据保存
        this.$emit('getmycommentSemit', ress.data.data.new_obj)
        this.value = ''
      }
    }
  },
  mounted () {
    console.log('我是评论组件')
  }
}
</script>

<style lang='less'>
.mycomment{
    width: 100%;
    margin-top: 58px;
    position: fixed;
    left: 0;
    bottom: 0;
    .van-search{
      border: 2px solid #efefef;
    }
    .van-icon{
        display: none !important;
    }
}
</style>
