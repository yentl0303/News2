<template>
  <div class="personal">
      <van-nav-bar title="个人信息" right-text="保存" left-arrow @click-left="$router.back()" @click-right="onClickRight"/>
      <van-cell-group>
      <van-cell title="头像" is-link @click="changeImage">
          <template #default>
              <div>
                <img class="img" :src="personal.photo" alt="">
              </div>
          </template>
      </van-cell>
      <van-cell class="margin" title="昵称" is-link @click="namechange">
          <template #default>
              <div>
                {{personal.name}}
              </div>
          </template>
      </van-cell>
      <van-cell class="margin" title="介绍" is-link @click="introchange">
          <template #default>
              <div>
                {{personal.intro}}
              </div>
          </template>
      </van-cell>
      <van-cell class="margin" title="性别" is-link @click='genderchange'>
          <template #default>
              <div>
                {{personal.gender === 0 ? '男' : '女'}}
              </div>
          </template>
      </van-cell>
      <van-cell class="margin" title="生日" is-link @click="datechange">
          <template #default>
              <div>
                {{personal.birthday | fliterDate}}
              </div>
          </template>
      </van-cell>
      </van-cell-group>
      <!-- 昵称修改界面 -->
      <van-popup v-model="nameshow" position="bottom" :style="{ height: '8%' }">
        <van-field v-model="personal.name" required/>
      </van-popup>
      <!-- 简介修改界面 -->
      <van-popup v-model="introshow" position="bottom" :style="{ height: '8%' }">
        <van-field v-model="personal.intro" required/>
      </van-popup>
      <!-- 性别 -->
      <van-popup v-model="showPicker" round position="bottom" :close-on-click-overlay='false'>
      <van-picker title="性别" show-toolbar :columns="columns" @confirm="onConfirm" @cancel="onCancel"/>
      </van-popup>
      <!-- 日期 -->
      <van-popup v-model="dateshow" round position="bottom" :close-on-click-overlay='false'>
      <van-datetime-picker v-model="personal.birthday" type="date" title="选择年月日" :min-date="minDate" :max-date="maxDate" @cancel='onCancelDate' @confirm='onConfirmDate'/>
      </van-popup>
      <!-- 修改用户头像界面 -->
      <photo ref='photo' @uploadResImage='uploadResImage'></photo>
  </div>
</template>

<script>
import { getUserData, getUserPersonData, setUserPersonData } from '@/api/user.js'
import photo from './comm/photo.vue'
import moment from 'moment'
export default {
  components: {
    photo
  },
  data () {
    return {
      personal: [], // 个人信息
      nameshow: false, // 界面显示与隐藏
      introshow: false, // 界面显示与隐藏
      showPicker: false, // 性别选项显示与隐藏
      columns: ['男', '女'], // 选择器选项
      dateshow: false, // 日期显示与隐藏
      minDate: new Date(1940, 0, 1), // 可选最小时间
      maxDate: new Date(2019, 11, 31),
      currentDate: '' // 当前时间
    }
  },
  methods: {
    // 1.点击保存
    async onClickRight () {
      await setUserPersonData({
        name: this.personal.name,
        gender: this.personal.gender,
        intro: this.personal.intro,
        birthday: moment(this.personal.birthday).format('YYYY-MM-DD').split(' ')[0]
      })
      this.$toast.success('保存成功')
      console.log('保存')
    },
    // 2.修改昵称
    namechange () {
      this.nameshow = true
    },
    // 修改简介
    introchange () {
      this.introshow = true
    },
    // 修改性别
    genderchange () {
      this.showPicker = true
    },
    // 修改生日
    datechange () {
      this.dateshow = true
    },
    // 3.修改头像
    changeImage () {
      this.$refs.photo.show = true
    },
    // 4.将请求完成的图片存入数据数组中
    uploadResImage (value) {
      this.personal.photo = value
    },
    // 5.选择器点击取消按钮chufa
    onCancel () {
      this.showPicker = false
    },
    // 6.选择器点击确定按钮
    onConfirm (value, index) {
      this.personal.gender = index
      console.log(this.personal.gender, index)
      this.showPicker = false
    },
    // 7.日期选择器取消
    onCancelDate () {
      this.dateshow = false
      this.personal.birthday = this.currentDate
    },
    // 8.日期选择器点击完成
    onConfirmDate (value) {
      this.personal.birthday = moment(value).format('YYYY-MM-DD')
      this.dateshow = false
    }
  },
  // vue实例完成后获取个人数据
  async created () {
    var res = await getUserData()
    this.$set(this.personal, 'photo', res.data.data.photo)
    this.$set(this.personal, 'name', res.data.data.name)
    this.$set(this.personal, 'intro', res.data.data.intro)
    var ress = await getUserPersonData()
    this.$set(this.personal, 'gender', ress.data.data.gender)
    this.$set(this.personal, 'birthday', ress.data.data.birthday)
    console.log(this.personal)
    this.currentDate = this.personal.birthday
  }
}
</script>

<style lang='less'>
.personal{
    .van-nav-bar {
    background-color: #868efb;
  }
  .van-nav-bar__title {
    color: #fff;
  }
  .van-icon-arrow-left {
    color: #fff !important;
  }
  .van-nav-bar__text{
      color: #fff;
  }
  .img{
      width: 25px;
      height: 25px;
      border-radius: 50%;
  }
  .margin{
      margin-top: 10px;
  }
  .van-cell__value{
      flex: 2;
  }
}
</style>
