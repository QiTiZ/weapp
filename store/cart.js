export default {
  namespaced: true, // 模块的 state 数据
  state: () => ({
    // 购物车的数组，用来存储购物车中每个商品的信息对象
    // 每个商品的信息对象，都包含如下 6 个属性：
    // { goods_id, goods_name, goods_price, goods_count+, goods_small_logo, goods_state }
    cart: JSON.parse(uni.getStorageSync('cart') || '[]')
  }),
  // 模块的 mutations 方法
  mutations: {
    addCart(state, goods) {
      // 根据提交的商品id,判断购物车是否已经有这件商品
      // 没有商品追加到购物车,存在商品数量+1
      const goodExist = state.cart.find(x => x.goods_id === goods.goods_id)

      if (!goodExist) {
        state.cart.push(goods)
      } else {
        goodExist.goods_count++
      }
      // 通过 commit 方法，调用 m_cart 命名空间下的 saveToStorage 方法
      this.commit('cart/saveTotal')
    },
    // 更新商品的勾选状态
    updateGoodsState(state, goods) {
      const goodsState = state.cart.find(x => x.goods_id === goods.goods_id)

      if (goodsState) {
        goodsState.goods_state = goods.goods_state
        this.commit('cart/saveTotal')
      }
    },
    // 更新商品的数量
    updateGoodsCount(state, goods) {
      const goodsCount = state.cart.find(x => x.goods_id === goods.goods_id)

      if (goodsCount) {
        goodsCount.goods_count = goods.goods_count
        this.commit('cart/saveTotal')
      }
    },
    // 删除商品
    delectGoods(state, goods) {
      state.cart = state.cart.filter(x => x.goods_id !== goods.goods_id)

      this.commit('cart/saveTotal')
    },
    // 所有商品勾选状态
    updateGoodsAllState(state, newstate) {
      state.cart.forEach(x => x.goods_state = newstate)

      this.commit('cart/saveTotal')
    },
    saveTotal(state) {
      uni.setStorageSync('cart', JSON.stringify(state.cart))
    },
  },

  // 模块的 getters 属性
  getters: {
    // 统计购物车中商品的总数量
    total(state) {
      let c = 0
      // 循环统计商品的数量，累加到变量 c 中
      state.cart.forEach(goods => c += goods.goods_count)
      return c
    },
    // 结算按钮总数量
    accountBtn(state) {
      return state.cart.filter(x => x.goods_state).reduce((total, item) => {
        return total += item.goods_count
      }, 0)
    },
    // 商品总价
    accountPrice(state) {
      return state.cart.filter(x => x.goods_state).reduce((price, item) => {
        return price += item.goods_price * item.goods_count + 0
      }, 0).toFixed(2)
    }
  }
}
