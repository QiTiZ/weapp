<template>
  <view v-if="goodsData.goods_price" class="goods-container">
    <!-- 轮播图区域 -->
    <swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" circular>
      <swiper-item v-for="(item, i) in goodsData.pics" :key="i">
        <image class="big-ipc" :src="item.pics_big" @click="preview(i)"></image>
      </swiper-item>
    </swiper>

    <!-- 商品简介区域 -->
    <view class="goods-intro">
      <!-- 价格区域 -->
      <view class="goods-price">￥{{ goodsData.goods_price }}</view>
      <!-- 标题区域 -->
      <view class="goods-title-box">
        <!-- 左侧标题 -->
        <view class="title-left">{{ goodsData.goods_name }}</view>
        <!-- 右侧收藏 -->
        <view class="goods-collect">
          <uni-fav
            :checked="checkList"
            class="favBtn"
            :circle="true"
            bg-color="#c3c3c3"
            bg-color-checked="#c00000"
            fg-color="#ffffff"
            fg-color-checked="#ffffff"
            @click="favClick()"
          />
        </view>
      </view>
      <!-- 免运费 -->
      <view class="yf"><text>快递: 免运费</text></view>
    </view>

    <!-- 商品详情 -->
    <rich-text class="richText" :nodes="goodsData.goods_introduce"></rich-text>

    <!-- 底部加入购物车 -->
    <view class="add-cart">
      <uni-goods-nav
        :fill="true"
        :options="options"
        :buttonGroup="buttonGroup"
        @click="onClick"
        @buttonClick="buttonClick"
      />
    </view>
  </view>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex'
export default {
  computed: {
    // 把 cart 模块中名称为 total 的 getter 映射到当前页面中使用
    ...mapGetters('cart', ['total'])
  },
  watch: {
    // total(newVal) {
    //   const info = this.options.find(x => x.text === '购物车')
    //   if (info) {
    //     info.info = newVal
    //   }
    // }
    total: {
      handler(newVal) {
        const info = this.options.find(x => x.text === '购物车')
        if (info) {
          info.info = newVal
        }
      },
      immediate: true
    }
  },
  data() {
    return {
      goodsData: {},
      iconColor: '',
      checkList: false,
      options: [
        {
          icon: 'shop',
          text: '店铺'
        },
        {
          icon: 'headphones',
          text: '客服',
          infoColor: 'red'
        },
        {
          icon: 'cart',
          text: '购物车',
          info: 0
        }
      ],
      buttonGroup: [
        {
          text: '加入购物车',
          backgroundColor: '#ff0000',
          color: '#fff'
        },
        {
          text: '立即购买',
          backgroundColor: '#ffa200',
          color: '#fff'
        }
      ]
    }
  },
  onLoad(options) {
    this.getGoodsData(options.goods_id)
  },
  methods: {
    ...mapMutations('cart', ['addCart']),
    // 获取数据
    async getGoodsData(goods_id) {
      const { data: res } = await uni.$http.get('/api/public/v1/goods/detail', { goods_id })
      if (res.meta.status !== 200) return uni.$showMsg()
      // 解决图片底部留白
      res.message.goods_introduce = res.message.goods_introduce
        .replace(/<img /g, '<img style="display:block;" ')
        .replace(/webp/g, 'jpg')
      this.goodsData = res.message
    },
    // 点击图片获取大图预览
    preview(i) {
      uni.previewImage({
        current: i,
        urls: this.goodsData.pics.map(item => item.pics_big)
      })
    },
    // 收藏于被收藏样式切换
    favClick() {
      this.checkList = !this.checkList
    },
    onClick(text) {
      if (text.content.text === '购物车') {
        uni.switchTab({ url: '/pages/cart/cart' })
      }
    },
    // 添加商品到购物车
    buttonClick(text) {
      if (text.content.text === '加入购物车') {
        // 2. 组织一个商品的信息对象
        const goods = {
          goods_id: this.goodsData.goods_id, // 商品的Id
          goods_name: this.goodsData.goods_name, // 商品的名称
          goods_price: this.goodsData.goods_price, // 商品的价格
          goods_count: 1, // 商品的数量
          goods_small_logo: this.goodsData.goods_small_logo, // 商品的图片
          goods_state: true // 商品的勾选状态
        }
        this.addCart(goods)
      }
    }
  }
}
</script>

<style lang="scss">
swiper {
  height: 750rpx;
  .big-ipc {
    width: 100%;
    height: 100%;
  }
}

.goods-intro {
  padding: 7px;
  padding-bottom: 0;
  .goods-price {
    font-size: 18px;
    color: #c00000;
    padding: 10px 0;
  }
  .goods-title-box {
    display: flex;
    justify-content: space-between;
    .title-left {
      font-size: 16px;
      margin-right: 5px;
    }
    .goods-collect {
      width: 120px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      font-size: 15px;
      border-left: 1px solid #eee;
    }
  }
  .yf {
    font-size: 14px;
    color: gray;
    margin: 15px 0;
  }
}

.add-cart {
  position: fixed;
  bottom: 0;
  width: 100%;
}

.goods-container {
  // 给页面外层的容器，添加 50px 的内padding，
  // 防止页面内容被底部的商品导航组件遮盖
  padding-bottom: 50px;
}
</style>
