<template>
  <view>
    <my-search @click="goSearch"></my-search>
    <view class="scoll_list">
      <scroll-view class="scoll_item_left" scroll-y="true" :style="{ height: wh + 'px' }">
        <block v-for="(item, i) in scollList" :key="i">
          <view :class="['scoll_left', active === i ? 'active' : '']" @click="changeActive(i)">
            {{ item.cat_name }}
          </view>
        </block>
      </scroll-view>
      <!-- 右侧二级分类 -->
      <scroll-view scroll-y="true" :style="{ height: wh + 'px' }" :scroll-top="scollTop">
        <view class="cate_lv2" v-for="(item2, i2) in scollList2" :key="i2">
          <!-- 二级分类标题 -->
          <view class="cate_lv2_title">/{{ item2.cat_name }}/</view>
          <!-- 三级分类 -->
          <view class="cate_lv3_list">
            <view
              class="cate_lv3_item"
              v-for="(item3, i3) in item2.children"
              :key="i3"
              @click="navgatorlv3(item3)"
            >
              <image class="cate_lv3_img" :src="item3.cat_icon"></image>
              <text>{{ item3.cat_name }}</text>
            </view>
          </view>
        </view>
      </scroll-view>
    </view>
  </view>
</template>

<script>
import setInfo from '@/mixins/tabbarInfo.js'
export default {
  mixins: [setInfo],
  data() {
    return {
      // 设备可以使用高度
      wh: 0,
      // 一级列表数据
      scollList: [],
      active: 0,
      // 二级分类数据
      scollList2: [],
      scollTop: 0
    }
  },
  onLoad() {
    // 获取设备信息
    const www = uni.getSystemInfoSync()
    this.wh = www.windowHeight - 50

    this.getScollList()
  },
  methods: {
    async getScollList() {
      const { data: res } = await uni.$http.get('/api/public/v1/categories')
      if (res.meta.status !== 200) return uni.$showMsg()
      this.scollList = res.message
      this.scollList2 = this.scollList[0].children
    },
    changeActive(e) {
      this.active = e
      this.scollList2 = this.scollList[e].children
      // 重置右侧滚动条
      this.scollTop = this.scollTop === 0 ? 0.1 : 0
    },
    // 跳转到商品列表页
    navgatorlv3(item) {
      uni.navigateTo({ url: '/subpkg/goods_list/goods_list?cid=' + item.cat_id })
    },
    // 跳转到搜索页面
    goSearch() {
      uni.navigateTo({ url: '/subpkg/search/search' })
    }
  }
}
</script>

<style lang="scss">
.scoll_list {
  display: flex;
}

.scoll_item_left {
  width: 150px;
}
.scoll_left {
  line-height: 60px;
  background-color: #ffff;
  text-align: center;
  position: relative;
  &.active {
    background-color: #eee;
    &:before {
      content: '';
      display: table;
      width: 10rpx;
      height: 50%;
      background-color: #aa0000;
      position: absolute;
      top: 50%;
      left: 0;
      transform: translateY(-50%);
    }
  }
}

.cate_lv2_title {
  text-align: center;
  font-size: 12px;
  font-weight: 700;
  margin: 30rpx 0;
}
.cate_lv3_list {
  display: flex;
  flex-wrap: wrap;
  .cate_lv3_item {
    width: 33%;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    margin-bottom: 20rpx;
  }
  .cate_lv3_img {
    width: 120rpx;
    height: 120rpx;
  }
  text {
    font-size: 12px;
  }
}
</style>
