<template>
  <div class="my">
    <!-- 头部 -->
    <div class="header">
      <div class="img">
        <img :src="userData.photo" @click="$router.push('/personal')">
        <span>{{userData.name}}</span>
        <div class="postionRadius">
          <div>今日阅读</div>
          <div>0分钟</div>
        </div>
      </div>
      <div class="message">
        <div>
          <div>{{userData.art_count}}</div>
          <div>动态</div>
        </div>
        <div>
          <div>{{userData.follow_count}}</div>
          <div>关注</div>
        </div>
        <div>
          <div>{{userData.fans_count}}</div>
          <div>粉丝</div>
        </div>
      </div>
    </div>
    <!-- 宫格 -->
    <div class="grid">
      <van-grid :column-num="3">
      <van-grid-item icon="star-o" text="收藏" />
      <van-grid-item icon="clock-o" text="历史" />
      <van-grid-item icon="records" text="作品" />
    </van-grid>
    </div>
    <!-- 功能列表 -->
    <van-cell-group>
      <van-cell title="消息通知" is-link />
      <van-cell title="用户反馈" is-link />
      <van-cell title="小志同学" is-link @click="$router.push('/zhi')" />
    </van-cell-group>
  </div>
</template>

<script>
import { getUserData } from '@/api/user.js'
export default {
  data () {
    return {
      userData: [] // 用户个人数据
    }
  },
  async created () {
    var res = await getUserData()
    this.userData = res.data.data
  }
}
</script>

<style lang='less'>
.my{
 .header{
   height: 45%;
   background-color: #868efb;
   color: #fff;
   .img{
     padding: 40px 0 20px 40px;
     position: relative;
     img{
       width: 55px;
       height: 55px;
       border-radius: 50%;
       margin-right: 10px;
       vertical-align: top;
     }
     .postionRadius{
       position: absolute;
       bottom: 15px;
       right: 0;
       width: 80px;
       background-color: rgba(0, 0, 0, .4);
       font-size: 12px;
       border-top-left-radius: 24px;
       border-bottom-left-radius: 24px;
       text-align: center;
       div{
         margin: 3px 0;
       }
     }
   }
   .message{
     display: flex;
     justify-content: space-around;
     padding-bottom: 20px;
     div{
       margin-bottom: 10px;
       text-align: center;
     }
   }
 }
 .grid{
   width: 100%;
   margin-bottom: 10px;
   .van-icon-star-o{
     color: #cc5350;
   }
   .van-icon-clock-o{
     color: #d79e58;
   }
   .van-icon-records{
     color: #5075ce;
   }
 }
}
</style>
