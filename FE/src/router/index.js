import Vue from 'vue'
import Router from 'vue-router'

import notFound from '@/components/NotFound' // 404
import index from '@/components/index' // 首页
import detail from '@/components/detail' // 详情页




Vue.use(Router);

export default new Router({
  // mode: 'hash',
  routes: [
    { path: '*', name: 'notFound',component: notFound }, //404
    { path: '/', name: 'index', component: index }, // 首页
    // { path: '/detail/:id', name: 'detail', component: detail }, // 首页
    { path: '/detail', name: 'detail', component: detail }, // 首页

  ],

  mode: 'hash',
  base: __dirname
})

