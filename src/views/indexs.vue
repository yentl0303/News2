<template>
  <div>
      <van-button type='default'>无色</van-button>
      <van-button type='primary'>绿色</van-button>
      <van-button type='info'>蓝色</van-button>
      <van-button type='danger'>红色</van-button>
      <van-button type='warning'>黄色</van-button>
      <!-- 单元格 -->
      <van-cell-group>
      <van-cell title="标题" value="内容" ></van-cell>
      <van-cell title="标题" label="注释" value="内容"></van-cell>
      </van-cell-group>
      <!-- 自定义单元格 -->
      <van-cell-group>
          <van-cell>
              <template #title>
                    <van-icon name="chat-o" />
              </template>
          </van-cell>
      </van-cell-group>
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>
