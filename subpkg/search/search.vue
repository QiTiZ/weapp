<template>
  <view>
    <!-- 搜索框 -->
    <view class="search-box">
      <uni-search-bar
        class="sa"
        placeholder="请输入搜索内容"
        @input="input"
        cancelButton="none"
        radius="20"
        clearButton="auto"
      ></uni-search-bar>
    </view>

    <!-- 搜索列表 -->
    <view class="search-list" v-if="searchList.length !== 0">
      <view class="search-item" v-for="(item, i) in searchList" :key="i">
        <view class="goods-name" @click="goGoods(item)">{{ item.goods_name }}</view>
        <uni-icons type="arrowright" size="16"></uni-icons>
      </view>
    </view>

    <!-- 搜索历史区域 -->
    <view class="history-box" v-else>
      <!-- 标题区域 -->
      <view class="hostory-title">
        <text>搜索历史</text>
        <uni-icons type="trash" size="18" @click="clearHistory"></uni-icons>
      </view>
      <!-- 文字区域 -->
      <view class="history-list">
        <uni-tag
          :text="item"
          v-for="(item, i) in histories"
          :key="i"
          size="normal"
          @click="goGoodsList(item)"
        ></uni-tag>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      timer: null,
      seachValue: '',
      searchList: [],
      // 搜索历史数据
      historyList: []
    }
  },
  onLoad() {
    this.historyList = JSON.parse(uni.getStorageSync('seachValue') || '[]')
  },
  methods: {
    input(e) {
      clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        this.seachValue = e
        this.getSearchList()
      }, 500)
    },
    // 获取搜索列表
    async getSearchList() {
      if (this.seachValue === '') {
        this.searchList = []
        return
      }

      const { data: res } = await uni.$http.get('/api/public/v1/goods/qsearch', { query: this.seachValue })
      if (res.meta.status !== 200) return uni.$showMsg()
      this.searchList = res.message
      this.saveHistoryCode()
    },
    // 跳转到商品详情
    goGoods(item) {
      uni.navigateTo({ url: '/subpkg/goods/goods?goods_id=' + item.goods_id })
    },
    // 保存搜索关键词
    saveHistoryCode() {
      // this.historyList.push(this.seachValue)
      const set = new Set(this.historyList)
      set.delete(this.seachValue)
      set.add(this.seachValue)
      this.historyList = Array.from(set)

      // 搜索历史持久化
      uni.setStorageSync('seachValue', JSON.stringify(this.historyList))
    },
    // 清空搜索历史
    clearHistory() {
      this.historyList = []
      uni.setStorageSync('seachValue', '[]')
    },
    goGoodsList(e) {
      uni.navigateTo({ url: '/subpkg/goods_list/goods_list?query=' + e })
    }
  },
  computed: {
    histories() {
      return [...this.historyList].reverse()
    }
  }
}
</script>

<style lang="scss">
.search-box {
  position: sticky;
  top: 0;
  z-index: 999;
}

.uni-searchbar {
  background-color: #c00000;
}

.search-list {
  font-size: 15px;
  .search-item {
    display: flex;
    justify-content: space-between;
    text-align: center;
    align-items: center;
    padding: 10px 5px;
    // margin: 15px 0;
    border-bottom: 1px solid #eee;
    .goods-name {
      // 文字不允许换行
      white-space: nowrap;
      overflow: hidden;
      // 超出内容省略号显示
      text-overflow: ellipsis;
    }
  }
}

.history-box {
  .hostory-title {
    display: flex;
    justify-content: space-between;
    padding: 2px 8px;
    border: 1px solid #eee;
    height: 30px;
    align-items: center;
  }
  .history-list {
    margin: 4px 5px;
    .uni-tag {
      margin: 0 7px;
      background-color: #efefef;
      color: #000000;
    }
  }
}
</style>
