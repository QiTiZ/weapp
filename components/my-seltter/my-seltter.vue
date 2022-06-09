<template>
  <view>
    <view class="seltter-box">
      <!-- 全选区域 -->
      <view src="seltter-all" @click="allChoose">
        <radio :checked="checkFull" color="#c00000" />
        <text>全选</text>
      </view>
      <!-- 合计区域 -->
      <view class="seltter-price">
        合计:
        <text class="money">¥ {{ accountPrice }}</text>
      </view>
      <!-- 结算按钮区域 -->
      <view class="seltter-btn" @click="seltterEnd">
        <text>结算({{ accountBtn }})</text>
      </view>
    </view>
  </view>
</template>

<script>
import { mapGetters, mapMutations, mapState } from 'vuex'
export default {
  name: 'my-seltter',
  data() {
    return {}
  },
  computed: {
    ...mapGetters('cart', ['accountBtn', 'accountPrice', 'total']),
    ...mapGetters('user', ['addressStr']),
    ...mapState('user', ['token']),
    checkFull() {
      return this.total === this.accountBtn
    }
  },
  methods: {
    ...mapMutations('cart', ['updateGoodsAllState']),
    // 全选按钮
    allChoose() {
      this.updateGoodsAllState(!this.checkFull)
    },
    // 点击结算按钮
    seltterEnd() {
      if (!this.accountBtn) return uni.$showMsg('请选择结算商品')
      if (!this.addressStr) return uni.$showMsg('请选择收货地址')
      if (!this.token) return uni.$showMsg('请登录')
    }
  }
}
</script>

<style lang="scss">
.seltter-box {
  display: flex;
  height: 50px;
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 999;
  width: 100%;
  background-color: #fff;
  justify-content: space-between;
  align-items: center;
  padding: 0 5px;
  .seltter-all {
  }
  .seltter-price {
    .money {
      color: #c00000;
      font-weight: 700;
    }
  }
  .seltter-btn {
    background-color: #c00000;
    height: 50px;
    line-height: 50px;
    text-align: center;
    align-items: center;
    min-width: 100px;
    color: #fff;
  }
}
</style>
