<template>
  <div class="zhi">
    <van-nav-bar title="小志同学" left-arrow @click-left="$router.back()" fixed/>
    <!-- 聊天区 -->
    <div class="chat" ref='chat'>
     <div class="img" :class="{ user: item.isRobot === false }" v-for="(item, index) in dialogDate" :key="index">
        <img v-if="item.isRobot === false" :src="data.photo" alt="">
        <img v-else src="http://img5.imgtn.bdimg.com/it/u=1991885397,650821970&fm=15&gp=0.jpg" alt="">
        <div  class="conent">
            {{item.message}}
        </div>
     </div>
    </div>
    <!-- 发送消息 -->
    <van-search v-model="value" show-action>
      <template #action>
      <div @click="onCancel">
        发送
      </div>
      </template>
  </van-search>
  </div>
</template>

<script>
import socket from 'socket.io-client'
import { getUserData } from '@/api/user.js'
export default {
  data () {
    return {
      value: '', // 输入的消息
      dialogDate: [
        { message: '你好啊，我是小志~', isRobot: true }
      ],
      io: null, // 接收连接服务器
      data: [] // 保存个人数据
    }
  },
  methods: {
    // 点击发送
    onCancel () {
      if (this.value.trim() === '') {
        this.value = ''
        return
      }
      console.log('发送的数据是:' + this.value)
      // 向服务器发送数据
      this.io.emit('message', {
        msg: this.value,
        timestamp: Date.now()
      })
      this.dialogDate.push({
        message: this.value,
        isRobot: false
      })
      // 发送消息之后自动滚动
      this.$nextTick(() => {
        this.$refs.chat.scrollTop = this.$refs.chat.scrollHeight
      })
      this.value = ''
      console.log(this.data)
    }
  },
  // 进入页面先建立websocket连接
  async mounted () {
    this.io = socket('http://ttapi.research.itcast.cn?token=' + this.$store.state.infoToken.token)
    // 获取数据
    var res = await getUserData()
    this.data = res.data.data
    // 接收响应的数据
    this.io.on('message', data => {
      console.log('接收的数据是：', data)
      this.dialogDate.push({
        message: data.msg,
        isRobot: true
      })
      // 发送消息之后自动滚动
      this.$nextTick(() => {
        this.$refs.chat.scrollTop = this.$refs.chat.scrollHeight
      })
    })
  }
}
</script>

<style lang='less'>
.zhi{
   .van-nav-bar {
    background-color: #868efb;
  }
  .van-nav-bar__title {
    color: #fff;
  }
  .van-nav-bar__arrow {
    color: #fff !important;
  }
  .van-search{
      position: fixed;
      left: 0;
      bottom: 0;
      width: 100%;
      border: 2px solid #efefef;
    }
    .van-icon-search{
        display: none !important;
    }
    .chat{
      position: fixed;
      top: 46px;
      bottom: 58px;
      width: 100%;
      overflow: auto;
      .img{
          display: flex;
          width: 100%;
          margin-top: 20px;
          overflow: hidden;
        img{
            float: left;
            width: 40px;
            height: 40px;
            border-radius: 50%;
        }
        .conent{
            float: left;
            background-color: #dddddd;
            padding: 10px;
            margin-left: 10px;
            max-width: 60%;
        }
      }
      .user {
              display: flex;
              flex-direction: row-reverse;
              // img {
              //     float: right;
              // }
              .conent{
                  // float: right;
                  margin-right: 10px;
                  margin-left: 0;
              }
      }
    }
}
</style>
