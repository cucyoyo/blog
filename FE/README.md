# 个人站点前端展示代码

## 环境安装

``` bash
# 安装依赖
npm install

# 本地环境运行（localhost:8080）
npm run dev

# 线上环境构建（生成dist文件夹）
npm run build

```

## 目录结构

- 入口：index.html
- 入口js：src/main.js，其中引入了：
  - router---路由
  - axios---ajax库
  - element-ui---基于vue的组件库
  - bootstrap---全局样式组件库
  - echarts---核心图表可视化库
- 公共方法：assets/public.js
- 公共样式：assets/common.css  assets/public.css
- axios网络请求配置：axios/index.js
- 路由配置：router/index.js
