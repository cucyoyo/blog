# 基于node + vue 搭建个人站点

- 后端代码参考：[challenge-3-hours-blogging](https://github.com/junthehacker/challenge-3-hours-blogging)，
[bilibili的视频](https://www.bilibili.com/video/av18704783?from=search&seid=6901712256634222410)
- 前端样式参考：[Vic Chen的博客](http://www.vicchen.me/giveup_wordpress_and_rewrite_my_blog/)

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
* **注意：**第一次运行需要将app.js中的`require('./database/migration')(db)`的注释打开，用于创建数据库`blog.db`,下次运行之前就把注释掉就好。
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

- node文件读写
```
console.log("准备写入文件");
fs.writeFile('input.txt', '我是通 过fs.writeFile 写入文件的内容',  function(err) {
   if (err) {
       return console.error(err);
   }
   console.log("数据写入成功！");
   console.log("--------我是分割线-------------")
   console.log("读取写入的数据！");
   fs.readFile('input.txt', function (err, data) {
      if (err) {
         return console.error(err);
      }
      console.log("异步读取文件数据: " + data.toString());
   });
});
```
```
// 同步读写
var html = fs.readFileSync(posts[i].html_path);
console.log("同步读取: " + html.toString());
```

- 保存网络图片
```
   var $  = require('jquery');
   var http = require('http');
   var fs = require('fs');
   $.get("http://www.baidu.com",function(bd){
   	var _html = $(bd);
   	var imgs = _html.find('img');
   	http.get(imgs[0].src, function (res) {
   		res.setEncoding('binary');//二进制（binary）
   		var imageData ='';
   		res.on('data',function(data){//图片加载到内存变量
   			imageData += data;
   		}).on('end',function(){//加载完毕保存图片
   			fs.writeFile('out.gif', imageData, 'binary', function (err) {//以二进制格式保存
   				if (err) throw err;
   				console.log('file saved');
   			});
   		});
   	});
   });
```
- 实时监控和更新node js 文件
```
npm install -g supervisor
supervisor app.js
```

- 由于浏览器缓存的问题，图片地址不变（服务器图片内容发生了变化）使得图片不刷新变更
	在图片地址src不变的情况下让浏览器重新加载图片 
	实际上，在src不变时，浏览器直接就去读取缓存了 

	解决办法： 
	var img_src ='http://www.ilsea.net/images/seagull.jpg?t='+Math.random(); 

- 前后端跨域解决
```
app.all('*',function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');

  if (req.method == 'OPTIONS') {
    res.send(200); /让options请求快速返回/
  }
  else {
    next();
  }
});
```

### 前端相关问题
- localStorage值不能是对象，只能将对象转为字符串用的时候再转回去