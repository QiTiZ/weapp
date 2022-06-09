export default {
  namespaced: true,
  state: () => ({
    address: JSON.parse(uni.getStorageSync('address') || '{}'),
    token: '',
    userinfo: JSON.parse(uni.getStorageSync('userinfo') || '{}')
  }),
  mutations: {
    updateAddress(state, address) {
      state.address = address

      this.commit('user/saveAddress')
    },
    // 持久化存储address
    saveAddress(state) {
      uni.setStorageSync('address', JSON.stringify(state.address))
    },
    updateUserInfo(state, userinfo) {
      state.userinfo = userinfo
      this.commit('user/saveUserInfo')
    },
    // 持久化userinfo
    saveUserInfo(state) {
      uni.setStorageSync('userinfo', JSON.stringify(state.userinfo))
    }
  },
  getters: {
    addressStr(state) {
      if (!state.address.provinceName) return ''

      return state.address.provinceName + state.address.cityName + state.address.countyName + state.address.detailInfo
    }
  }
}
