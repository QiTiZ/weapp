import { mapGetters } from 'vuex'
export default {
  computed: { ...mapGetters('cart', ['total']) },
  onShow() {
    this.setInfo()
  },
  watch: {
    total() {
      this.setInfo()
    }
  },
  methods: {
    setInfo() {
      // 动态设置tabbar徽标
      uni.setTabBarBadge({
        index: 2,
        text: this.total + '' // text 必须为字符串
      })
    }
  }
}
