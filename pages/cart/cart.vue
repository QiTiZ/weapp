<template>
  <view>
    <view class="cart-contain" v-if="cart.length !== 0">
      <!-- 地址模块 -->
      <my-address></my-address>

      <!-- 商品列表图表 -->
      <view class="cart-title">
        <uni-icons type="shop" size="18"></uni-icons>
        <text class="cart-wenben">购物车</text>
      </view>

      <!-- 商品列表区域 -->
      <uni-swipe-action>
        <!-- 基础用法 -->
        <view class="cart-list" v-for="(item, i) in cart" :key="i">
          <!-- 滑动删除 -->
          <uni-swipe-action-item :right-options="options" @click="delGoods(item)">
            <my-goodslist
              :item="item"
              showRadio
              showNumBox
              @stateChange="changeState"
              @numChange="numChange"
            ></my-goodslist>
          </uni-swipe-action-item>
        </view>
      </uni-swipe-action>

      <!-- 结算区域 -->
      <my-seltter></my-seltter>
    </view>

    <!-- 没有商品显示的默认样式 -->
    <view class="empty-box" v-else>
      <img class="empty-img" src="/static/cart_empty@2x.png" alt="" />
      <text class="empty-dis">空空如也~</text>
    </view>
  </view>
</template>

<script>
import setInfo from '@/mixins/tabbarInfo.js';
import { mapState, mapMutations } from 'vuex';
export default {
  mixins: [setInfo],
  computed: { ...mapState('cart', ['cart']) },
  data() {
    return {
      options: [
        {
          text: '删除',
          style: { backgroundColor: '#C00000' }
        }
      ]
    };
  },
  methods: {
    ...mapMutations('cart', ['updateGoodsState', 'updateGoodsCount', 'delectGoods']),
    // 商品数量的改变
    changeState(e) {
      this.updateGoodsState(e);
    },
    numChange(e) {
      this.updateGoodsCount(e);
    },
    delGoods(e) {
      this.delectGoods(e);
    }
  }
};
</script>

<style lang="scss">
.cart-title {
  display: flex;
  height: 40px;
  padding-left: 5px;
  align-items: center;
  .cart-wenben {
    margin-left: 10px;
    font-size: 14px;
  }
}
.cart-contain {
  padding-bottom: 50px;
}

.empty-box {
  display: flex;
  flex-direction: column;
  margin-top: 150px;
  // text-align: center;
  align-items: center;
  .empty-img {
    width: 90px;
    height: 90px;
  }

  .empty-dis {
    margin-top: 15px;
  }
}
</style>
