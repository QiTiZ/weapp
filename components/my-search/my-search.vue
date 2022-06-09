<template>
  <view class="search-contain" :style="{ 'background-color': bgcolor }" @click="changeSerach">
    <view class="search" :style="{ 'border-radius': radius + 'rpx' }">
      <uni-icons size="20" type="search"></uni-icons>
      <text class="text">搜索</text>
    </view>
  </view>
</template>

<script>
export default {
  name: 'my-search',
  props: {
    // 背景颜色
    bgcolor: {
      type: String,
      default: '#c00000'
    },
    // 圆角
    radius: {
      type: Number,
      default: 35 // rpx
    }
  },
  data() {
    return {}
  },
  methods: {
    changeSerach() {
      this.$emit('click')
    }
  }
}
</script>

<style lang="scss">
.search-contain {
  height: 100rpx;
  // background-color: #c00000;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 20rpx;
  .search {
    height: 70rpx;
    background-color: #fff;
    // border-radius: 35rpx;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .text {
    font-size: 30rpx;
    margin-left: 10px;
  }
}
</style>
