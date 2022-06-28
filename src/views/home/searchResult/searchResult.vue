<template>
  <div class="searchResult">
    <van-nav-bar title="搜索结果" left-arrow @click-left="onClickLeft"/>
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
      >
      <van-cell v-for="(item, index) in searchResultData" :key="index" class="listStyle" @click="skipDetail(item.art_id)">
        <template #title>
          <div>{{item.title}}</div>
        </template>
        <div>
          <van-grid v-if="item.cover.type != 0" :border="false" :column-num="item.cover.type">
            <van-grid-item v-for="(items, index) in item.cover.images" :key="index">
              <van-image :src="items" lazy-load/>
            </van-grid-item>
          </van-grid>
        </div>
        <div class='left'>
          <span>{{item.aut_name}}</span>
          <span>{{item.comm_count}}评论</span>
          <span>{{item.pubdate | fliterTimeDay}}</span>
        </div>
        <div class="bottomBox">
          <span><van-icon name="comment-o" class="marginrigth" @click.stop="comment"/>{{item.comm_count}}</span>
          <span><van-icon name="like-o" class="marginrigth" @click="like"/>点赞</span>
          <span><i class="iconfont icon-fenxiang marginrigth"></i>分享</span>
        </div>
      </van-cell>
    </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getSearchResult } from '@/api/search.js'
export default {
  data () {
    return {
      loading: false, // 上拉组件状态
      finished: false, // 上拉组件数组获取状态
      isLoading: false, // 下拉组件状态
      searchResultData: [], // 搜索结果
      key: '', // 传递过来的参数
      currentpage: 1, // 当前页
      pagesize: 10 // 页容量
    }
  },
  methods: {
    // 1.上拉触发的事件
    async onLoad () {
      var res = await getSearchResult(this.currentpage++, this.pagesize, this.key)
      this.searchResultData = [...this.searchResultData, ...res.data.data.results]
      this.loading = false
      if (res.data.data.results.length === 0) {
        this.finished = true
      }
    },
    // 2.下拉触发的事件
    onRefresh () {
      // 将请求的数据清空
      this.searchResultData = []
      // 将下拉组件状态重置为false
      this.isLoading = false
      // 将上拉组件状态重置初始
      this.loading = false
      this.isLoading = false
      // 重新请求数据
      this.onLoad()
    },
    // 3.点击返回
    onClickLeft () {
      this.$router.back()
    },
    // 4.点击评论
    comment () {
      // 判断全局登录验证
      if (!this.$login()) {
        // 如果没有登录阻止执行下面代码
        return
      }
      // 已登录执行下面代码
      console.log('评论')
    },
    // 5.点击点赞
    like () {
      // 判断全局登录验证
      if (!this.$login()) {
        // 如果没有登录阻止执行下面代码
        return
      }
      // 已登录执行下面代码
      console.log('点赞')
    },
    // 6.跳转到详情页
    skipDetail (id) {
      // 判断全局登录验证
      if (!this.$login()) {
        // 如果没有登录阻止执行下面代码
        return
      }
      this.$router.push('/detail?id=' + id)
    }
  },
  // dom渲染完成后获取参数
  mounted () {
    this.key = this.$route.query.key
  }
}
</script>

<style lang='less'>
.searchResult{
  .van-nav-bar {
    background-color: #868efb;
  }
  .van-nav-bar__title {
    color: #fff;
  }
  .van-icon-arrow-left {
    color: #fff !important;
  }
  .listStyle{
    display: flex;
    flex-direction: column;
    .left{
    margin: 10px 0;
    text-align: left;
    font-size: 12px;
    span{
      margin-left: 10px;
    }
    }
     .bottomBox{
    display: flex;
    justify-content: space-around;
    align-items: center;
    color: #000;
    .marginrigth{
      font-size: 16px;
      margin-right: 10px;
      vertical-align: middle;
    }
  }
  }

}
</style>
