import App from './App'
import Vue from 'vue'
import store from './store/store.js'
import { $http } from '@escook/request-miniprogram'

uni.$http = $http
// 配置请求根路径
$http.baseUrl = 'http://api-hmugo-web.itheima.net'

// 自定义提示消息
uni.$showMsg = (title = '获取数据失败', duration = 1500) => {
  uni.showToast({
    title,
    duration,
    icon: 'none'
  })
}

// 请求拦截器
$http.beforeRequest = function(option) {
  uni.showLoading({ title: '数据加载中' })
}
// 响应拦截器
$http.afterRequest = function() {
  uni.hideLoading()
}

Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
  ...App,
  store
})
app.$mount()
