<template>
  <div class="index">
      <!-- 搜索栏 -->
      <van-nav-bar fixed title="首页"  class="nav" />
      <!-- 频道栏 -->
      <van-tabs v-model="active" color='#868efb'>
        <van-tab v-for="(item, index) in channelData" :key="index" :title="item.name">
            <!-- 频道图标 -->
            <div class="cellFont" @click='popClick'>
                <van-icon name="wap-nav" />
            </div>
            <van-pull-refresh v-model="item.isLoading" @refresh="onRefresh">
                 <!-- 内容 -->
            <van-list
              v-model="item.loading"
              :finished="item.finished"
              finished-text="没有更多了"
              @load="onLoad"
              class="vanList"
              >
            <van-cell v-for="(items, index) in item.detailData" :key="index" :title="item.title">
            <template #title>
            <p>{{items.title}}</p>
            <van-grid v-if="items.cover.type != 0" :border="false" :column-num="3">
              <van-grid-item v-for="(itemss, index) in items.cover.images" :key="index">
                <van-image lazy-load :src="itemss" />
              </van-grid-item>
            </van-grid>
            <div class="box">
              <div class="left">
              <span>{{items.aut_name}}</span>
              <span>{{items.comm_count}}评论</span>
              <span>{{items.pubdate | fliterTimeDay}}</span>
              </div>
              <div class="rigth">
                <van-icon name="cross" @click="show(items)"/>
              </div>
            </div>
            </template>
            </van-cell>
            </van-list>
            </van-pull-refresh>
        </van-tab>
      </van-tabs>
      <!-- 频道列表弹出框 -->
      <channelPop ref='channelPopRef' :channelData='channelData' :active.sync='active' @addList='forChanneData'></channelPop>
      <!-- 更多详情弹出框 -->
      <more ref='moreRef' :article = 'article' :author='author' @notlikeP = 'notlikeP' @notlikeauthor='notlikeauthor'></more>
  </div>
</template>

<script>
import { getChannelList, getChanneldetail } from '@/api/index.js'
import { getToken } from '@/utils/myToken.js'
// 导入子组件
import channelPop from '@/views/home/index/comm/channelPop.vue'
import more from '@/views/home/index/comm/more.vue'
export default {
  components: {
    channelPop,
    more
  },
  data () {
    return {
      channelData: [], // 频道列表
      active: 0, // van-tabs标签栏下标
      loading: false, // 组件加载状态
      finished: false, // 数据是否加载完毕
      list: [], // 文章数据源
      isLoading: false, // 下拉组件状态
      article: '', // 文章id
      author: '' // 作者id
    }
  },
  methods: {
    // 1.list加载时执行的事件
    async onLoad () {
      console.log(this.active)
      // 获取tab标签栏频道列表的id
      var channelDataChild = this.channelData[this.active]
      console.log(channelDataChild)
      var id = channelDataChild.id
      console.log(id)
      // 传入id获取此id的相关资讯
      var res = await getChanneldetail(id)
      console.log(res.data.data.results)
      console.log(channelDataChild)
      // 将请求的频道详情赋值给频道列表中用来存储频道详情的数组对象
      channelDataChild.detailData = [...channelDataChild.detailData, ...res.data.data.results]
      console.log(channelDataChild.detailData)
      // 将组件加载的状态停止
      channelDataChild.loading = false
      // 怎么将数据加载停止，当请求的数据长度为0时
      if (res.data.data.results.length === 0) {
        channelDataChild.finished = true
      }
      console.log(channelDataChild.detailData)
    },
    // 2.下拉刷新数据
    onRefresh () {
      // 获取当前频道的数据
      var channelDataChild = this.channelData[this.active]
      // 将当前频道的数据清空
      channelDataChild.detailData = []
      // 将上拉组件状态重置为false
      channelDataChild.loading = false
      // 将上拉组件刷新的数组状态重置为false
      channelDataChild.finished = false
      // 将下拉组件重置为false
      channelDataChild.isLoading = false
      // 重新请求数据
      this.onLoad()
    },
    // 3.获取频道列表
    async getChannelListFun () {
      // 判断用户是否登录
      var tokenIndex = this.$store.state.infoToken.token
      console.log('tokenIndex', tokenIndex)
      if (tokenIndex) {
        // 如果登录了就直接从服务器中获取频道列表
        var res = await getChannelList()
        this.channelData = res.data.data.channels
        // 并将频道数据保存到token
      } else {
        // 如果没登录判断location中有没有频道channel
        var channel = getToken('channel')
        if (channel) {
        // 如果loaction中有频道就直接从loaction中取
          this.channelData = channel
        } else {
        // 如果loaction中没有就请求服务器默认的频道
          var ress = await getChannelList()
          this.channelData = ress.data.data.channels
        }
      }
      this.forChanneData()
      console.log(this.channelData)
    },
    // 4.将每个频道的数据添加到频道列表中，为他们添加一个对象，以此存储频道数据
    forChanneData () {
      // 循环频道列表
      this.channelData.forEach((item) => {
        this.$set(item, 'detailData', [])// 为频道的每个对象添加一个数组对象，存储频道数据
        this.$set(item, 'loading', false)// 上拉组件加载状态
        this.$set(item, 'finished', false)// 上拉组件数据状态
        this.$set(item, 'isLoading', false)// 下拉组件状态
      })
    },
    // 5.点击频道列表图标弹出窗体
    popClick () {
      this.$refs.channelPopRef.show = true
    },
    // 6.弹出更多操作窗体
    show (item) {
      this.$refs.moreRef.show = true
      // 将获取的文章id给子组件
      console.log(item)
      this.article = item.art_id.toString()
      this.author = item.aut_id.toString()
      console.log(this.author)
    },
    // 7.子组件不感兴趣由父组件操作
    notlikeP (id) {
      // 获取当前频道
      var thisChannel = this.channelData[this.active]
      // 循环频道列表的详情数据
      thisChannel.detailData.forEach((item, index) => {
        if (item.art_id.toString() === id) {
          thisChannel.detailData.splice(index, 1)
        }
      })
      console.log('成功')
    },
    // 8.拉黑作者
    notlikeauthor (id) {
      // 获取当前频道
      var thisChannel = this.channelData[this.active].detailData
      console.log(thisChannel)
      var i = 0
      // 循环频道列表的详情数据
      thisChannel.forEach((item, index) => {
        if (item.aut_id.toString() === id) {
          thisChannel.splice(index, 1)
          console.log('hh')
        }
        console.log(i++)
      })
      console.log('成功')
    }
  },
  // 当dom渲染完成就获取频道列表
  mounted () {
    this.getChannelListFun()
  }
}
</script>

<style lang='less'>
.index{
    margin-bottom: 50px;
   // background-color: #f5f7f9;
  .van-nav-bar {
    background-color: #868efb;
  }
  .van-nav-bar__title {
    color: #fff;
  }
  .van-tabs--line .van-tabs__wrap{
    position: fixed;
    width: 90%;
    top: 46px;
    left: 0;
    z-index: 999;
  }
  .vanList{
      margin-top: 90px;
  }
  .cellFont{
          position: fixed;
          top: 46px;
          right: 0;
          width: 10%;
          height: 45px;
          background-color: #868efb;
          line-height: 45px;
          text-align: center;
          font-size: 28px;
          z-index: 1000;
    }
    .box{
      display: flex;
      justify-content: space-between;
      .left{
        span{
          margin-right: 10px;
          color: #999;
        }
      }
    }
}
</style>
