<template>
  <view>
    <!-- 添加收货地址 -->
    <view class="address-box" v-if="JSON.stringify(address) === '{}'">
      <button class="address-btn" type="primary" size="mini" @click="chooseAddress">
        请选择收货地址 +
      </button>
    </view>

    <!-- 已有收货地址 -->
    <view class="address-have" v-else @click="chooseAddress">
      <!-- 收货人区域 -->
      <view class="address-person">
        <view class="person">收货人: {{ address.userName }}</view>
        <view class="phone">
          电话: {{ address.telNumber }}
          <uni-icons type="arrowright"></uni-icons>
        </view>
      </view>
      <!-- 收货地址区域 -->
      <view class="address-detail">
        <view class="address-detail-left">收货地址:</view>
        <view class="address-detail-right">{{ addressStr }}</view>
      </view>
    </view>

    <image class="bottom-img" src="../../static/cart_border@2x.png"></image>
  </view>
</template>

<script>
import { mapState, mapMutations, mapGetters } from 'vuex'
export default {
  name: 'my-address',
  data() {
    return {}
  },
  computed: { ...mapState('user', ['address']), ...mapGetters('user', ['addressStr']) },
  methods: {
    ...mapMutations('user', ['updateAddress']),
    // 选择收货地址
    async chooseAddress() {
      const [err, success] = await uni.chooseAddress({}).catch(err => err)
      if (err === null && success.errMsg === 'chooseAddress:ok') {
        // this.address = success
        this.updateAddress(success)
      }

      //  用户没有授权
      if (err && err.errMsg === 'chooseAddress:fail auth deny') {
        this.reAuth() // 调用 this.reAuth() 方法，向用户重新发起授权申请
      }
    },
    // 重新发起地址的授权
    reAuth() {
      uni.showModal({
        content: '检测到您没打开地址权限，是否去设置打开？',
        cancelText: '取消',
        confirmText: '确认'
      })

      // 如果弹框异常，则直接退出
      if (err2) return

      //  如果用户点击了 “取消” 按钮，则提示用户 “您取消了地址授权！”
      if (confirmResult.cancel) return uni.$showMsg('您取消了地址授权！')

      // 如果用户点击了 “确认” 按钮，则调用 uni.openSetting() 方法进入授权页面，让用户重新进行授权
      if (confirmResult.confirm)
        return uni.openSetting({
          //  授权结束，需要对授权的结果做进一步判断
          success: settingResult => {
            //  地址授权的值等于 true，提示用户 “授权成功”
            if (settingResult.authSetting['scope.address'])
              return uni.$showMsg('授权成功！请选择地址')
            //  地址授权的值等于 false，提示用户 “您取消了地址授权”
            if (!settingResult.authSetting['scope.address'])
              return uni.$showMsg('您取消了地址授权！')
          }
        })
    }
  }
}
</script>

<style lang="scss">
.address-box {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  text-align: center;
  .address-btn {
    margin: 20px;
  }
}

.address-have {
  padding: 5px;
  margin: 10px 0;
  font-size: 14px;
  .address-person {
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
  }
  .address-detail {
    display: flex;
    // justify-content: space-between;
    align-items: center;
    .address-detail-left {
      white-space: nowrap;
    }
    .address-detail-right {
      margin-left: 10px;
    }
  }
}

.bottom-img {
  display: block;
  width: 100%;
  height: 5px;
}
</style>
