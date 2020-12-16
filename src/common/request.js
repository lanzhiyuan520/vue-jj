import axios from 'axios'
import Vue from 'vue'
const env = process.env.NODE_ENV
import store from '../../store'
let baseURL;
if (env === 'development') {
  baseURL = 'http://localhost:7001/egg'
} else if (env === 'production') {
  baseURL = 'https://lanxg.lanzhiyuan99.cn/egg'
}
const instance = axios.create({
  baseURL,
  timeout: 1000 * 60,
  headers: {
    'X-Custom-Header': 'foobar'
  }
});


// 添加请求拦截器
instance.interceptors.request.use(function (config) {
  let token = JSON.parse(localStorage.getItem('user') || '{}').token
  if (!token) {
    token = ''
  }
  config.headers.token = token
  // 在发送请求之前做些什么
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 添加响应拦截器
instance.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  if (response.data.code === 1) {
    Vue.prototype.$message({
      title : response.data.msg,
      type : 'error'
    })
  } else if (response.data.code === 2) {
    store.commit('exit')
  }
  return response.data;
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error);
});


export default instance
