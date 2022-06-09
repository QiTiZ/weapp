<template>
  <view>
    <view class="login-contain">
      <!-- 头像区域 -->
      <view class="login-avator">
        <uni-icons type="contact-filled" size="100" color="#AFAFAF"></uni-icons>
      </view>
      <!-- 按钮区域 -->
      <button type="primary" class="btn-login" @click="getUserProfile">一键登录</button>
      <!-- tip区域 -->
      <view class="login-tips">登录后尽享更多权益</view>
    </view>
  </view>
</template>

<script>
import { mapMutations } from 'vuex';
export default {
  name: 'my-login',
  data() {
    return {};
  },
  methods: {
    ...mapMutations('user', ['updateUserInfo']),
    // 获取用户信息
    getUserProfile() {
      uni.getUserInfo({
        desc: '用于完善个人资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
        success: res => {
          // 3. 将用户的基本信息存储到 vuex 中
          this.updateUserInfo(res.userInfo);

          // 获取登录成功后的 Token 字符串
          this.getToken(res);
        },
        fail: res => {
          return uni.$showMsg('您取消了登录授权');
        }
      });
    },
    async getToken(info) {
      const [err, res] = await uni.login().catch(err => err);
      if (err || res.errMsg !== 'login:ok') return uni.$showMsg('登录失败！');

      // 准备参数对象
      const query = {
        code: res.code,
        encryptedData: info.encryptedData,
        iv: info.iv,
        rawData: info.rawData,
        signature: info.signature
      };

      const { data: loginRes } = await uni.$http.post('/api/public/v1/users/wxlogin', query);

      if (loginRes.meta.status !== 400) return uni.$showMsg('登录失败! ');
      uni.$showMsg('登录成功');
      console.log(loginRes);
    }
  }
};
</script>

<style lang="scss">
.login-contain {
  height: 750rpx;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .login-avator {
  }
  .btn-login {
    width: 90%;
    background-color: #c00000;
    border-radius: 100px;
  }
  .login-tips {
    margin-top: 15px;
    font-size: 14px;
    color: gray;
  }
}
</style>
