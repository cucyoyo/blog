# 基于node + vue 搭建个人站点

- 后端代码参考：[challenge-3-hours-blogging](https://github.com/junthehacker/challenge-3-hours-blogging)，
[bilibili的视频](https://www.bilibili.com/video/av18704783?from=search&seid=6901712256634222410)
- 前端样式参考[Vic Chen的博客](http://www.vicchen.me/giveup_wordpress_and_rewrite_my_blog/)

## 技术栈
### 后端及后台管理页面
- Node + Express
- 单页Vue.js
- Sqlite3
### 前端
- Vue-cli（详细信息见FE目录下的readme文件）


## 环境搭建

### 后台管理
* 首先打开 config.js，修改 `port` 至你想用的端口，修改 `adminPassword` 为你的用户密码。
* 运行 `npm install`
* 运行 `node app.js`

### 前端展示
- 进入FE目录
- npm i
- npm run dev
- 打开127.0.0.1:8080查看效果
