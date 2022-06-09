<template>
  <view>
    <view class="goods-list">
      <view v-for="(item, i) in goodsList" :key="i" @click="gotoGoods(item)">
        <my-goodslist :item="item"></my-goodslist>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      queryData: {
        query: '',
        cid: '',
        pagenum: 1,
        pagesize: 10
      },
      goodsList: [],
      total: 0,
      // 上拉加载节流阀
      isLoading: false
    }
  },
  onLoad(options) {
    this.queryData.query = options.query || ''
    this.queryData.cid = options.cid || ''
    this.getGoodsList()
  },
  methods: {
    // 获取列表数据
    async getGoodsList(cb) {
      this.isLoading = true
      const { data: res } = await uni.$http.get('/api/public/v1/goods/search', this.queryData)
      if (res.meta.status !== 200) return uni.$showMsg()
      this.isLoading = false
      cb && cb()
      // 合并数据
      this.goodsList = [...this.goodsList, ...res.message.goods]
      this.total = res.message.total
    },
    // 跳转到商品详情
    gotoGoods(item) {
      uni.navigateTo({ url: '/subpkg/goods/goods?goods_id=' + item.goods_id })
    }
  },
  // 上拉加载
  onReachBottom() {
    // 判断是否为最后一页数据
    if (this.queryData.pagenum * this.queryData.pagesize >= this.total)
      return uni.$showMsg('没有更多了')
    // 判断当前是否有其他请求在发送
    if (this.isLoading) return
    this.queryData.pagenum++
    this.getGoodsList()
  },
  // 下拉刷新
  onPullDownRefresh() {
    const aa = Math.ceil(this.total / this.queryData.pagesize)
    const bb = Math.ceil(Math.random() * aa)
    this.queryData.pagenum = bb
    this.total = 0
    this.isLoading = false
    this.goodsList = []

    this.getGoodsList(() => uni.stopPullDownRefresh())
  }
}
</script>
<style lang="scss"></style>
