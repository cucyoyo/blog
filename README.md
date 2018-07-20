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

### 依赖
- 图片剪裁：[ElemeFE image-cropper](http://elemefe.github.io/image-cropper/)
- 图片处理：[gm](http://aheckmann.github.io/gm/docs.html)
  - 重要步骤：1.安装软件 windows下注意ImageMagick安装过程中有一个选项`install legacy (or older) utilities`要勾选，否则会报错command failed（无法执行命令）
    2. npm install gm --save
    3. app.js中`let gm = require('gm').subClass({imageMagick: true});`
    4. 剪裁并保存：
  - gm环境安装
    - First download and install [GraphicsMagick](http://www.graphicsmagick.org/) or [ImageMagick](http://www.imagemagick.org/).
    In Mac OS X, you can simply use Homebrew and do:
    `brew install imagemagick`
    `brew install graphicsmagick`

    - If you want WebP support with ImageMagick, you must add the WebP option:
    `brew install imagemagick --with-webp`

    - then either use npm:
    `npm install gm --save`

    - or clone the repo:
    `git clone git://github.com/aheckmann/gm.git`

  - ubuntu安装方法可能在这里有解决：https://stackoverflow.com/questions/48557587/gm-node-js-cant-resize-images-of-large-filesize
- 富文本编辑器 [一款轻便的富文本编辑器---Quill](https://quilljs.com) | [简单示例](https://blog.csdn.net/St_Sp_En/article/details/79103754)
### 问题记录

- 解决不能上传过大图片的问题：413 (payload too large)(要加在app使用的最开始，加到中间发现不生效)
```
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
```
```
apiRouter.use(bodyParser.urlencoded({limit: '50mb', extended: true}))
apiRouter.use(bodyParser.json({limit: '50mb'}))
```

