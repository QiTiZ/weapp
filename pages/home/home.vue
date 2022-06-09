<template>
  <view>
    <!-- 搜索组件 -->
    <view class="search-demo"><my-search @click="goSearch"></my-search></view>
    <!-- 轮播图 -->
    <swiper indicator-dots="true" autoplay="true" interval="3000" duration="1000" circular>
      <swiper-item v-for="(item, index) in swiperList" :key="index">
        <navigator class="swip_image" :url="'/subpkg/goods/goods?goods_id=' + item.goods_id">
          <image :src="item.image_src"></image>
        </navigator>
      </swiper-item>
    </swiper>

    <!-- 导航区域 -->
    <view class="nav_list">
      <view class="nav_item" v-for="(item, index) in navList" :key="index">
        <image :src="item.image_src" @click="changeTab(item)"></image>
      </view>
    </view>

    <!-- 楼层区域 -->
    <view class="floor_list">
      <view class="floor_item" v-for="(item, i) in floorList" :key="i">
        <!-- 楼层标题 -->
        <image class="item_image" :src="item.floor_title.image_src"></image>
        <!-- 楼层图片区域 -->
        <view class="item_box">
          <!-- 左侧大图片 -->
          <navigator class="item_box_left" :url="item.product_list[0].url">
            <image
              :src="item.product_list[0].image_src"
              :style="{ width: item.product_list[0].image_width + 'rpx' }"
              mode="widthFix"
            ></image>
          </navigator>
          <!-- 右侧4张小图片 -->
          <view class="item_box_right">
            <navigator
              class="item_box_right_item"
              v-for="(item2, i2) in item.product_list"
              :key="i2"
              v-if="i2 !== 0"
              :url="item2.url"
            >
              <image
                :src="item2.image_src"
                mode="widthFix"
                :style="{ width: item2.image_width + 'rpx' }"
              ></image>
            </navigator>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import setInfo from '@/mixins/tabbarInfo.js'
export default {
  mixins: [setInfo],
  data() {
    return { swiperList: [], navList: [], floorList: [] }
  },
  onLoad() {
    this.getSwiperList()
    this.getNavList()
    this.getFloorList()
  },
  methods: {
    // 获取轮播图数据
    async getSwiperList() {
      const { data: res } = await uni.$http.get('/api/public/v1/home/swiperdata')
      if (res.meta.status !== 200) return uni.$showMsg()
      this.swiperList = res.message
    },
    // 获取导航数据
    async getNavList() {
      const { data: res } = await uni.$http.get('/api/public/v1/home/catitems')
      if (res.meta.status !== 200) return uni.$showMsg()
      this.navList = res.message
    },
    // 点击进入tabbar分类
    changeTab(item) {
      if (item.name === '分类') {
        uni.switchTab({ url: '/pages/cate/cate' })
      }
    },
    // 获取楼层数据
    async getFloorList() {
      const { data: res } = await uni.$http.get('/api/public/v1/home/floordata')
      if (res.meta.status !== 200) return uni.$showMsg()
      // 分割api中的参数
      res.message.forEach(floor => {
        floor.product_list.forEach(prod => {
          prod.url = '/subpkg/goods_list/goods_list?' + prod.navigator_url.split('?')[1]
        })
      })
      this.floorList = res.messages

      console.log(this.floorList)
    },
    goSearch() {
      uni.navigateTo({ url: '/subpkg/search/search' })
    }
  }
}
</script>

<style lang="scss">
swiper {
  height: 350rpx;
  swiper-item,
  .swip_image,
  image {
    height: 100%;
    width: 100%;
  }
}

.nav_list {
  display: flex;
  margin: 15px 0;
  justify-content: space-around;
}
.nav_item image {
  height: 140rpx;
  width: 128rpx;
}

.floor_item .item_image {
  height: 60rpx;
  width: 100%;
  display: flex;
}

.item_box_right {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}
.item_box {
  display: flex;
  padding-left: 10px;
}

.search-demo {
  position: sticky;
  top: 0;
  z-index: 999;
}
</style>
