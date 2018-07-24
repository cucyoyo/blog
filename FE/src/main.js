// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import $ from 'jquery'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import config from './config/config'
Vue.prototype.serverIP = config.serverIP
import axios from './axios'
// 引入echarts
import echarts from 'echarts'

// 引入公共方法
import '@/assets/public'
// 引入公共样式
import "./assets/common.css";
import "./assets/public.css";

Vue.prototype.$echarts = echarts;


Vue.use(ElementUI);


Vue.config.productionTip = false;



new Vue({
  el: '#app',
  router,
  axios,
  components: { App },
  template: '<App/>'
})
