import Vue from 'vue'
import axios from 'axios'

// import router from '@/router'

// axios 配置
axios.defaults.timeout = 10000;
axios.defaults.baseURL = '127.0.0.1:3000/';
// 将axios挂载到prototype上，在组件中可以直接使用this.axios访问
Vue.prototype.axios = axios;


export default axios
