<template>
  <div class="channelPop">
      <!-- 弹窗 -->
      <van-popup v-model="show" position="bottom" :style="{ height: '70%' }">
          <!-- 上部 -->
          <van-cell size="large">
              <template #title>
                  <span>我的频道</span>
              </template>
              <template #default>
                 <van-button v-if="isshow==false" @click='isshow=true' plain type="danger" size="mini" round>编辑</van-button>
                 <van-button v-else @click='isshow=false' plain type="danger" size="mini" round>完成</van-button>
              </template>
          </van-cell>
          <!-- 上部频道列表 -->
          <van-grid gutter='5px'>
            <van-grid-item v-for="(item, index) in channelData" :key="index" class="gridFont" :class='{active:active == index}' @click='selcet(index)'>
                <template #text>
                    {{item.name}}<van-icon v-if="isshow == true && index!=0" name="close" class="iconfontClose"  @click="del(index,$event)"/>
                </template>
            </van-grid-item>
          </van-grid>

          <!-- 下部 -->
          <van-cell size="large">
              <template #title>
                  <span>频道推荐</span>
              </template>
          </van-cell>
          <!-- 下部频道列表 -->
          <van-grid gutter='5px'>
            <van-grid-item v-for="(item, index) in flitersChannel" :key="index" :text="item.name" @click='add(item)'>
            </van-grid-item>
          </van-grid>
      </van-popup>
  </div>
</template>

<script>
import { getAllChannelList, setChannelList } from '@/api/index.js'
import { setToken } from '@/utils/myToken.js'
export default {
  props: ['channelData', 'active'],
  data () {
    return {
      show: false, // 控制弹出框显示与隐藏
      allChannel: [], // 全部频道
      isshow: false // 控制频道列表的x图标显示与隐藏
    }
  },
  // 计算属性
  computed: {
    // 计算推荐频道
    flitersChannel () {
      // 遍历取出我的频道的id
      var ids = this.channelData.map((item) => {
        return item.id
      })
      // 遍历全部频道，判断过滤不包含我的频道id
      var newChannel = this.allChannel.filter((item) => {
        return !ids.includes(item.id)
      })
      return newChannel
    }
  },
  methods: {
    // 1.封装获取频道列表
    async getAll () {
      var res = await getAllChannelList()
      console.log(res)
      this.allChannel = res.data.data.channels
    },
    // 2.点击下部列表添加进我的频道列表
    async add (item) {
      this.channelData.push(item)
      // 为这个频道添加列表
      // 无论怎么样重新添加存储的列表数据变量
      this.$set(item, 'detailData', [])// 为频道的每个对象添加一个数组对象，存储频道数据
      this.$set(item, 'loading', false)// 上拉组件加载状态
      this.$set(item, 'finished', false)// 上拉组件数据状态
      this.$set(item, 'isLoading', false)// 下拉组件状态
      console.log(item)
      var token = this.$store.state.infoToken.token
      if (token) {
        // 如果用户登录，应该将频道列表保存到服务器
        var newarr = this.channelData.slice(1).map((item, index) => {
          return {
            id: item.id,
            seq: index + 2
          }
        })
        console.log(this.channelData)
        console.log(newarr)
        var res = await setChannelList(newarr)
        console.log(res)
      } else {
        setToken('channel', this.channelData)
      }
    },
    // 3.点击上部列表删除频道
    async del (index, e) {
      e.stopPropagation()
      console.log(index)
      // 根据下标删除元素
      this.channelData.splice(index, 1)
      if (this.active === index) {
        this.$emit('update:active', 0)
      }
      if (this.active > index) {
        this.$emit('update:active', this.active - 1)
      }
      // 判断用户是否登录
      if (this.$store.state.infoToken.token) {
        // 如果用户登录，应该将频道列表发送到服务器
        var newarr = this.channelData.slice(1).map((item, index) => {
          return {
            id: item.id,
            seq: index + 2
          }
        })
        // 用户登录，向服务器请求删除列表
        await setChannelList(newarr)
      } else {
        // 说明未登录：保存到 localstorage 中
        setToken('channel', this.channelData)
      }
    },
    // 4.点击我的频道中的某一个频道
    selcet (index) {
      console.log(index)
      // 将父组件的active赋值为当前频道的下标
      this.$emit('update:active', index)
    }
  },
  // dom渲染完成之后获取全部频道
  mounted () {
    this.getAll()
  }
}
</script>

<style lang='less'>
.channelPop{
    .van-cell--large .van-cell__title{
        font-size: 20px;
    }
    .van-grid-item__text{
        font-size: 12px;
        color: #000;
    }
    .gridFont{
        position: relative;
        .iconfontClose{
            position: absolute;
            top: -5px;
            right: -5px;
            color: #a8a8a8;
         }
    }
    .van-grid-item__content{
        font-size: 14px;
        background-color: #f3f3f3;
    }
    .active{
      color: #868efb;
    }
}
</style>
