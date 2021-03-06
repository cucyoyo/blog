import Vue from 'vue'
import Router from 'vue-router'

import notFound from '@/components/NotFound' // 404
import index from '@/components/index' // 首页
import detail from '@/components/detail' // 详情页
import about from '@/components/about' // 详情页




Vue.use(Router);

export default new Router({
  // mode: 'hash',
  routes: [
    { path: '*', name: 'notFound',component: notFound }, //404
    { path: '/', redirect:'/all'}, // 首页
    { path: '/about', name: 'about', component: about }, // 首页,
    // { path: '/detail/:id', name: 'detail', component: detail }, // 首页
    { path: '/:tag', name: 'index', component: index }, // 首页
    { path: '/detail/:id', name: 'detail', component: detail }, // 首页

  ],

  mode: 'hash',
  saveScrollPosition: true,
  base: __dirname
})

