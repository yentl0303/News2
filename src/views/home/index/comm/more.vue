<template>
  <div class="more">
      <van-popup v-model="show" class="popupStyle">
          <div v-if="reportShow === false">
            <van-cell value="不感兴趣" icon="bill-o" @click ='notlike'/>
            <van-cell @click='reportShow = true' title="反馈垃圾内容" icon="warning-o" is-link />
            <van-cell value="拉黑作者" icon="delete" @click='shieldUserClick'/>
          </div>
          <div v-else>
            <van-cell @click="reportClick(item.id)" v-for="(item, index) in report" :key="index" :value="item.type"/>
          </div>
      </van-popup>
  </div>
</template>

<script>
import { notlikeChannelListData, reportsChannelListData, shieldUser } from '@/api/index.js'
export default {
  props: ['article', 'author'],
  data () {
    return {
      show: false, // 控制窗体显示与隐藏
      report: [
        { id: 0, type: '其他问题' },
        { id: 1, type: '标题夸张' },
        { id: 2, type: '低俗色情' },
        { id: 3, type: '错别字多' },
        { id: 4, type: '旧闻重复' },
        { id: 5, type: '广告软文' },
        { id: 6, type: '内容不实' },
        { id: 7, type: '涉嫌违法犯罪' },
        { id: 8, type: '侵权' }
      ],
      reportShow: false // 控制反馈垃圾内容显示与隐藏
    }
  },
  methods: {
    // 1.不感兴趣
    async notlike () {
      try {
        // 将文章id传递给父组件,由父组件删除列表中的数据
        this.$emit('notlikeP', this.article)
        // 将请求服务器删除服务器的数据
        var res = await notlikeChannelListData(this.article)
        console.log(res)
      } catch (error) {
        console.log('错误')
      }
      // 无论成功失败关闭弹出框
      this.show = false
    },
    // 2.处理反馈垃圾内容
    async reportClick (typeid) {
      try {
        // 向服务器发送请求
        await reportsChannelListData({
          target: this.article, // 文章id
          type: typeid
        })
        // 退到非举报状态
        this.reportShow = false
        // 关闭面板
        this.show = false
        // 弹出消息
        this.$toast.success('举报成功')
      } catch (error) {
        // 退到非举报状态
        this.reportShow = false
        // 关闭面板
        this.show = false
        // 弹出消息
        this.$toast.fail('举报失败')
      }
    },
    // 3.拉黑作者
    shieldUserClick () {
      this.$dialog.confirm({
        title: '警告',
        message: '确认拉黑此作者？'
      }).then(() => {
        // 点击确认
        shieldUser(this.author).then((res) => {
          // 将文章id传递给父组件,由父组件删除列表中的数据
          this.$emit('notlikeauthor', this.author)
          console.log(res)
          if (res.status === 201) {
            // 退到非举报状态
            this.reportShow = false
            // 关闭面板
            this.show = false
            // 弹出消息
            this.$toast.fail('拉黑成功')
          } else {
            // 退到非举报状态
            this.reportShow = false
            // 关闭面板
            this.show = false
            // 弹出消息
            this.$toast.fail('拉黑失败')
          }
        })
      })
    }
  }
}
</script>

<style lang='less'>
.more{
  .popupStyle{
      width: 80%;
  }
}

</style>
