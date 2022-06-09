<template>
  <view class="goods-item">
    <!-- 左侧图片区域 -->
    <view class="goods-list-left">
      <radio :checked="item.goods_state" color="#c00000" v-if="showRadio" @click="getState" />
      <image class="goods-ipc" :src="item.goods_small_logo || defaultImg"></image>
    </view>
    <!-- 右侧标题 -->
    <view class="goods-list-right">
      <view class="goods-name">{{ item.goods_name }}</view>
      <view class="goods-price-box">
        <!-- 价格区域 -->
        <view class="goods-price">￥{{ item.goods_price | tofixed }}</view>
        <!-- 商品数量区域 -->
        <uni-number-box
          :min="1"
          :value="item.goods_count"
          v-if="showNumBox"
          @change="getNumCount"
        ></uni-number-box>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      defaul: {}
    },
    showRadio: {
      type: Boolean,
      default: false
    },
    showNumBox: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      // 默认图片
      defaultImg: 'http://mtw.so/6hnf8p'
    }
  },
  filters: {
    tofixed(num) {
      return Number(num).toFixed(2)
    }
  },
  methods: {
    getState() {
      this.$emit('stateChange', {
        // 商品的id
        goods_id: this.item.goods_id,
        // 商品最新勾选状态
        goods_state: !this.item.goods_state
      })
    },
    // 商品数量的变化
    getNumCount(val) {
      this.$emit('numChange', {
        // 商品的id
        goods_id: this.item.goods_id,
        // 商品最新数量
        goods_count: val - 0
      })
    }
  }
}
</script>

<style lang="scss">
.goods-item {
  display: flex;
  padding: 6px 5px;
  border-bottom: 1px solid #efefef;
  // align-items: center;
  .goods-list-left {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .goods-ipc {
      width: 100px;
      height: 100px;
      margin-right: 5px;
    }
  }
  .goods-list-right {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .goods-name {
      font-size: 14px;
    }
    .goods-price-box {
      display: flex;
      justify-content: space-between;
      .goods-price {
        color: #c00000;
        font-size: 16px;
      }
    }
  }
}
</style>
