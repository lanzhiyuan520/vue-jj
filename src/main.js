import Vue from 'vue'

import App from './App'
import lanPackages from '../package/'
import router from '../router'
import store from '../store/'
const env = process.env.NODE_ENV
if (env === 'development') {
  Vue.prototype.$imgBaseUrl = 'http://localhost:7001'
} else {
  Vue.prototype.$imgBaseUrl = 'https://lanxg.lanzhiyuan99.cn/egg'
}

Vue.use(lanPackages)

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
