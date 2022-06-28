<template>
  <div class="login">
    <van-nav-bar title="登录" />
    <van-cell-group>
      <van-field
        v-model="form.phone"
        required
        :error-message="result.phonerul"
        left-icon="smile-o"
        placeholder="请输入手机号"
      >
        <template #left-icon>
          <i class="iconfont icon-iphone"></i>
        </template>
      </van-field>
      <van-field
        v-model="form.ecode"
        required
        :error-message="result.ecoderul"
        left-icon="smile-o"
        placeholder="请输入验证码"
      >
        <template #left-icon>
          <i class="iconfont icon-lockround"></i>
        </template>
        <template #button>
          <van-button size="small" color="#ededed" class="fieldButtonStyle"
            >获取验证码</van-button
          >
        </template>
      </van-field>
    </van-cell-group>
    <div class="loginButton">
      <van-button type="info" :loading="isloading" size="large" @click="submitData">登录</van-button>
    </div>
  </div>
</template>

<script>
import { getLogin } from '@/api/login.js'
//  获取token
import { setToken } from '@/utils/myToken.js'
export default {
  data () {
    return {
      form: {
        phone: '13411111136', // 电话
        ecode: '246810' // 手机验证码
      },
      result: {
        phonerul: '', // 电话提示
        ecoderul: '' // 手机验证码提示
      },
      isloading: false //  控制加载样式显示与隐藏
    }
  },
  methods: {
    //  1.点击确定按钮
    async submitData () {
      console.log(this.$store.state.infoToken)
      //   验证参数合法性
      if (this.submit() === false) {
        return false
      } else {
        console.log('验证成功')
        //  加载按钮显示
        this.isloading = true
        try {
          const res = await getLogin({
            mobile: this.form.phone,
            code: this.form.ecode
          })
          //  定义变量接收请求的数据
          const dataLogin = res.data.data
          //  将请求的数据（token）保存到vuex中
          this.$store.commit('setToken', dataLogin)
          //  将数据token保存到locationStorage中
          // window.localStorage.setItem('tokenObj', JSON.stringify(dataLogin))
          setToken('infoToken', dataLogin)
          console.log(dataLogin)
          // 进行判断当前的login是正常的/login，还是验证的/checklogin
          if (this.$route.path === '/checklogin') {
            // 返回上一页
            this.$router.back()
          } else {
            // 进入首页
            this.$router.push('/home')
          }
        } catch (error) {
          this.$toast.fail('登录失败')
        }
        //  加载按钮隐藏
        this.isloading = false
      }
    },
    //  2.封装逻辑
    submit () {
      const rules = []
      // 验证手机号
      if (this.form.phone.length === 11) {
        this.result.phonerul = ''
        rules.push(true)
      } else {
        this.result.phonerul = '电话验证失败'
        rules.push(false)
      }
      //  验证验证码
      if (this.form.ecode.length === 6) {
        this.result.ecoderul = ''
        rules.push(true)
      } else {
        this.result.ecoderul = '手机验证码验证失败'
        rules.push(false)
      }
      //  验证是否可以发送到服务器
      if (rules.includes(false)) {
        return false
      } else {
        return true
      }
    }
  }
}
</script>

<style lang="less">
.login {
  .van-nav-bar {
    background-color: #868efb;
  }
  .van-nav-bar__title {
    color: #fff;
  }
  .fieldButtonStyle {
    border-radius: 20px;
    .van-button__text {
      color: #7e7e7e;
    }
  }
  .loginButton {
    padding: 20px 10px;
  }
}
</style>
