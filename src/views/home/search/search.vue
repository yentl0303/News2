<template>
  <div class="search">
    <!-- 搜索组件 -->
    <van-search
    v-model="value"
    show-action
    placeholder="请输入搜索关键词"
    @search="onSearch"
    @cancel="onCancel"
    background='#868efb'
    @input='inputValue'
    />
    <!-- 数据联想 -->
    <van-cell-group v-if="thinkList.length != 0">
      <van-cell title="搜索联想"/>
      <van-cell v-for="(item, index) in thinkList" :key="index" icon="search"  @click='toThinkResult(item.oldItem)'>
        <template #title>
          <span v-html="item.newItem"></span>
        </template>
      </van-cell>
    </van-cell-group>
    <!-- 搜索记录 -->
     <van-cell-group v-else>
      <van-cell title="搜索历史">
        <template #default>
          <van-icon name="delete" @click='allhistorey'/>
        </template>
      </van-cell>
      <van-cell v-for="(item, index) in historyData" :key="index" icon="search" :title="item" @click='onSearch(item)'>
          <template #default>
            <van-icon name="cross" @click.stop='deletehistory(index)'/>
          </template>
      </van-cell>
    </van-cell-group>
  </div>
</template>

<script>
import { getThinkList } from '@/api/search.js'
import { setToken, getToken, removeToken } from '@/utils/myToken.js'
export default {
  data () {
    return {
      value: '', // 搜索的值
      thinkList: [], // 联想值
      timer: null, // 定时器
      historyData: getToken('history') || [] // 历史搜索数据
    }
  },
  methods: {
    // 1.回车事件
    onSearch (value) {
      // 将输入的值保存到historyData变量中
      this.historyData.unshift(value)
      this.historyData = [...new Set(this.historyData)]
      // 将historyData保存到本地中，打开页面就可以获取数据
      setToken('history', this.historyData)
      // 获取值后跳转到结果页
      this.$router.push('/searchResult?key=' + value)
    },
    // 2.取消事件
    onCancel (value) {
      this.thinkList = []
    },
    // 3.输入值时触发联想
    inputValue (value) {
      // 当值为空时
      if (value.trim().length === 0) {
        this.thinkList = []
        return
      }
      clearTimeout(this.timer)
      this.timer = setTimeout(async () => {
        var res = await getThinkList({ q: value })
        console.log(res)
        this.thinkList = res.data.data.options
        // 循环将联想数据修改
        this.thinkList = this.thinkList.map((item) => {
          return {
            oldItem: item,
            newItem: item.replace(this.value, '<span style="color:red;">' + this.value + '</span>')
          }
        })
      }, 600)
    },
    // 4.点击联想列表
    toThinkResult (item) {
      this.onSearch(item)
    },
    // 5.删除搜索历史
    deletehistory (index) {
      this.historyData.splice(index, 1)
      // 重新覆盖本地历史
      setToken('history', this.historyData)
    },
    // 6.删除全部历史搜素数据
    allhistorey () {
      this.$dialog.confirm({
        title: '提示',
        message: '是否清空全部历史数据'
      }).then(() => {
        this.historyData = []
        removeToken('history')
      })
    }
  }
}
</script>

<style lang='less'>
.search{
    .van-search__action{
        color: #fff;
    }
    .van-search__action:active {
        background-color: #868efb;
    }
}
</style>
