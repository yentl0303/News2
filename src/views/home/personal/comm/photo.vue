<template>
  <div class="photo">
      <van-popup v-model="show" class="popup" :close-on-click-overlay='false'>
        <div @click='uploadImg'>从相册选择图片</div>
        <input @change="clickgetImage" ref='file' type="file" style='display:none'>
        <div class="upload">拍照上传</div>
        <div @click='show=false'>取消</div>
      </van-popup>
  </div>
</template>

<script>
import { uploadPersonalImage } from '@/api/user.js'
import Vue from 'vue'
import { ImagePreview } from 'vant'
Vue.use(ImagePreview)
export default {
  data () {
    return {
      show: false // 控制窗体显示与隐藏
    }
  },
  methods: {
    // 1.点击相册打开
    uploadImg () {
      // 触发input的点击事件
      this.$refs.file.click()
    },
    // 2.点击图片获得图片
    clickgetImage () {
      console.log(this.$refs.file.files[0])
      var imgs = new FileReader()
      imgs.readAsDataURL(this.$refs.file.files[0])
      // 收到转换结果后执行
      imgs.addEventListener('load', () => {
        // 显示到预览层
        ImagePreview({
          images: [imgs.result],
          showIndex: false,
          onClose: this.closeEven
        })
      })
    },
    // 3.关闭预览图片时执行
    closeEven () {
      // 询问是否将此图片上传
      this.$dialog.confirm({
        title: '提示',
        message: '是否将此图片上传'
      })
        .then(async () => {
          console.log('上传')
          // 将获取的图片上传
          var res = await uploadPersonalImage(this.$refs.file.files[0])
          this.$emit('uploadResImage', res.data.data.photo)
        })
        .catch(() => {
        })
    }
  }
}
</script>

<style lang='less'>
.photo{
  .popup{
    width: 85%;
    line-height: 40px;
    text-align: center;
    div:nth-child(2){
      border-top: 1px solid #ccc;
      border-bottom: 1px solid #ccc;
    }
  }
}
</style>
