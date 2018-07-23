const express = require('express')
const app = express()
const config = require('./config')
const sqlite3 = require('sqlite3').verbose()
// Change database to other than :memory:, in-memory database will be lost when closed.
// const db         = new sqlite3.Database(':memory:')
const db = new sqlite3.Database('blog.db')
const sha512 = require('js-sha512').sha512
const bodyParser = require('body-parser')
const uuidv4 = require('uuid/v4')
const http = require('http');

// Initialize API router
let apiRouter = express.Router()
apiRouter.use(bodyParser.urlencoded({limit: '50mb', extended: false}))
apiRouter.use(bodyParser.json({limit: '50mb'}))
// 解决不能上传过大图片的问题：413 (payload too large)
// app.use(bodyParser.json({limit: '50mb'}));
// app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

// Database driver
const SQLite3Driver = require('./database/SQLite3Driver')
let driver = new SQLite3Driver(db)

// Models
const User = require('./models/User')
const Token = require('./models/Token')
const Post = require('./models/Post')
const Tag = require('./models/Tag')

// 图片剪裁工具：http://aheckmann.github.io/gm/docs.html
let gm = require('gm').subClass({imageMagick: true});
let fs = require('fs');

// Middlewares
const adminAuthenticationMiddleware = require('./middlewares/adminAuthenticationMiddleware')(driver)


// Run migration one time
// require('./database/migration')(db)

// Create our first user
User.make(driver, [null, 'admin', sha512(config.adminPassword), 'admin'], (result) => {
  if (result) {
    console.log("Admin user created with password hash of " + sha512(config.adminPassword))
  } else {
    console.log("Failed to create admin user")
    throw "Fatal database error"
  }
})

// 允许跨域
apiRouter.all('*',function (req, res, next) {
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

/**
 * Route to login and create a new token
 */
apiRouter.post('/login', (req, res) => {
  if (req.body.username && req.body.password) {
    User.get(driver, req.body.username, (user) => {
      // Check password here
      if (sha512(req.body.password) === user.password) {
        let tokenBody = uuidv4()
        Token.make(driver, [null, req.body.username, tokenBody], (result) => {
          if (result) {
            res.status(200)
            res.send({
              token: tokenBody
            })
          } else {
            res.status(500)
            res.send('internal error')
          }
        })
      } else {
        res.status(401)
        res.send('unauthorized')
      }
    })
  } else {
    res.status(400)
    res.send('bad request')
  }
})

/**
 * Route to check current login status
 */
apiRouter.get('/checkLoginStatus', adminAuthenticationMiddleware, (req, res) => {
  res.status(200)
  res.send('ok')
})

// 用于测试图片剪裁
apiRouter.get('/testGM', (req, res) => {
  gm("111.jpg").crop(300, 300, 330, 168).write('123.jpg', function (err) {
    if (!err) {
      console.log("图片剪裁成功")
    } else {
      console.log("图片剪裁失败");
      console.log(err);
    }
  });
  res.status(200)
  res.send('ok')
});
// end-用于测试图片剪裁

/**
 * Route to create a new post, AUTH REQUIRED
 */
apiRouter.post('/createNewPost', adminAuthenticationMiddleware, (req, res) => {
  // if (req.body.title && req.body.content) {
  if (req.body.id && req.body.title && req.body.desc && req.body.img_url && req.body.rect && req.body.tags.length !== 0 && req.body.html) {
    try {
      // todo 这里应该有数据库的捕获异常和回滚操作
      if (req.body.id == -1) {  // 新建 blog
          // let createTime = new Date().toLocaleDateString("en-US");
          let createTime = new Date().toLocaleString();
          let updateTime = createTime;

          var sql = "insert into posts (title, tags, desc, createTime, updateTime) values (?,?,?,?,?)";
          // var blogId;
          db.run(sql,[req.body.title, req.body.tags, req.body.desc,createTime, updateTime],function(){
              // // 获取插入id
              // console.log(this.lastID);
              // // 获取改变行数
              // console.log(this.changes)
              var blogId = this.lastID;
              let img_path_half = './static/imgs/' + blogId; // 原图和剪裁后的图，两种名字还要处理
              let img_path = img_path_half + '.jpg'; // 原图和剪裁后的图，两种名字还要处理
              let html_path = './static/htmls/' + blogId + '.txt';

              // todo 这里应该去捕获异常
              handleImg(req.body.img_url, req.body.rect, img_path_half);
              handleHtml(req.body.html, html_path);

              sql = 'UPDATE posts SET img_path=?, html_path=?  WHERE id=?';
              db.run(sql, ['imgs/' + blogId + '.jpg', html_path, blogId], function () {
                  console.log(this.changes);
              });
              res.status(200)
              res.send('ok')
          });
      } else {    // 修改 blog
          let updateTime = new Date().toLocaleString();
          // let updateTime = new Date().toLocaleDateString("en-US");
          var blogId = req.body.id;
          let img_path_half = './static/imgs/' + blogId; // 原图和剪裁后的图，两种名字还要处理
          let img_path = img_path_half + '.jpg'; // 原图和剪裁后的图，两种名字还要处理
          let html_path = './static/htmls/' + blogId + '.txt';

          // todo 这里应该去捕获异常
          handleImg(req.body.img_url, req.body.rect, img_path_half);
          handleHtml(req.body.html, html_path);

          sql = 'UPDATE posts SET title=?, desc=?, tags=?, img_path=?, html_path=?, updateTime=?  WHERE id=?';
          db.run(sql, [req.body.title, req.body.desc,req.body.tags, 'imgs/' + blogId + '.jpg', html_path, updateTime, blogId], function () {
              console.log(this.changes);
          });
          res.status(200)
          res.send('ok')
      }



    } catch(e) {
      console.error('Error caught by catch block:', e);
      res.status(500)
      res.send('internal error')
    }


    // Post.make(driver, [null, req.body.title, req.body.tags, img_path, html_path, createTime, updateTime], (result) => {
    //   if (result) {
    //     res.status(200)
    //     res.send('ok')
    //   } else {
    //     res.status(500)
    //     res.send('internal error')
    //   }
    // })
  } else {
    res.status(400)
    res.send('bad request')
  }
});

// 处理图片，保存 + 剪裁，返回剪裁后的图片路径
function handleImg(img_url, rect, path) {
  // 先保存再剪裁

  // //  新建时传过来的是base64，修改时是直接的url
  // if(img_url.indexOf('data:image/jpg;base64,')>-1){
  //     // base64 图片操作
  //     var base64Data = img_url.replace(/^data:image\/\w+;base64,/, '');
  //     var dataBuffer = new Buffer(base64Data, 'base64');
  //
  //     var html = fs.writeFileSync(path + '_raw.jpg', dataBuffer);
  //     console.log('同步保存base64图片');
  // }else{
  //     //path 图片操作
  //     // http.get(img_url, function (res) {
  //     http.get('http://www.vicchen.me/wp-content/uploads/2016/03/atom-tab1.jpg', function (res) {
  //         res.setEncoding('binary');//二进制（binary）
  //         var imageData ='';
  //         res.on('data',function(data){//图片加载到内存变量
  //             imageData += data;
  //         }).on('end',function(){//加载完毕保存图片
  //             fs.writeFileSync(path + '_raw.jpg', imageData, 'binary');
  //             console.log('同步保存url图片');
  //         });
  //     });
  // }
  //   gm(path + '_raw.jpg').crop(rect.width, rect.height, rect.left, rect.top).write(path + '.jpg', function (err) {
  //       if (!err) {
  //           console.log("图片剪裁成功");
  //           // todo 保存数据库
  //           return 1;
  //       } else {
  //           console.log("图片剪裁失败");
  //           console.log(err);
  //           return 0;
  //       }
  //   });


  // 先保存再剪裁
  if(img_url.indexOf('data:image')>-1){
    var base64Data = img_url.replace(/^data:image\/\w+;base64,/, '');
    var dataBuffer = new Buffer(base64Data, 'base64');
    fs.writeFile(path + '_raw.jpg', dataBuffer, function (err) {
      if (err) {
        console.log(err);
        return 0;
      } else {
        console.log('图片保存成功');

        gm(path + '_raw.jpg').crop(rect.width, rect.height, rect.left, rect.top).write(path + '.jpg', function (err) {
          if (!err) {
            console.log("图片剪裁成功");
            // todo 保存数据库
            return 1;
          } else {
            console.log("图片剪裁失败");
            console.log(err);
            return 0;
          }
        });
      }
    });
  }else{ // 直接剪裁，不重新生成原始图片
    console.log(path)
    console.log(rect)
    fs.rename(path + '.jpg', path + '_raw.jpg', function (err) {
      if (err) throw err;
      fs.stat(path + '_raw.jpg', function (err, stats) {
        if (err) throw err;
        console.log('stats: ' + JSON.stringify(stats));
        gm(path + '_raw.jpg').crop(rect.width, rect.height, rect.left, rect.top).write(path + '.jpg', function (err) {
          if (!err) {
            console.log("图片剪裁成功");
            // todo 保存数据库
            return 1;
          } else {
            console.log("图片剪裁失败");
            console.log(err);
            return 0;
          }
        });
      });
    });

  }

}

// 处理富文本编辑器生成的 html， 保存为txt文件，返回文件保存路径
function handleHtml(html, path) {
  console.log("准备写入文件");
  fs.writeFile(path, html,  function(err) {
    if (err) {
      console.error(err);
      return 0;
    }
    else {
      console.log("数据写入成功！");
      return 1
    }
  });
}

// 处理标签数组， 返回 '1,2,3' 格式
function handleTags(tags) {

}

// 上传图片，保存图片 + 图片剪裁
apiRouter.post('/imgPost', adminAuthenticationMiddleware, (req, res) => {
  if (req && req.body ) {
    if (req.body.img_url && req.body.rect) {
      // 先保存再剪裁
      var base64Data = req.body.img_url.replace(/^data:image\/\w+;base64,/, '');
      var dataBuffer = new Buffer(base64Data, 'base64');
      fs.writeFile('456_raw.jpg', dataBuffer, function (err) {
        if (err) {
          console.log(err);
          res.status(500);
          res.send('internal error(图片保存失败)');
        } else {
          console.log('图片保存成功');

          gm('456_raw.jpg').crop(req.body.rect.width, req.body.rect.height, req.body.rect.left, req.body.rect.top).write('456.jpg', function (err) {
          // gm('456_raw.jpg').crop(68,68,74,74).write('456.jpg', function (err) {
            if (!err) {
              console.log("图片剪裁成功");
              // todo 保存数据库
              res.status(200);
              res.send('ok');
            } else {
              console.log("图片剪裁失败");
              console.log(err);
              res.status(500);
              res.send('internal error(图片剪裁失败)');
            }
          });
        }
      });
    }

  } else {
    res.status(400);
    res.send('bad request')
  }
});

// 富文本编辑器的上传
apiRouter.post('/testQuill', adminAuthenticationMiddleware, (req, res) => {
  if (req.body.html) {
    console.log("准备写入文件");
    fs.writeFile('html.txt', req.body.html,  function(err) {
      if (err) {
        console.error(err);
        res.status(500);
        res.send('internal error');
      } else {
        console.log("数据写入成功！");
        res.status(200);
        res.send('ok');
      }
    });
  } else {
    res.status(400)
    res.send('bad request')
  }
});
/**
 * Route to get all posts
 */
apiRouter.get('/posts', (req, res) => {
  let data = {};
  let result = [];
  let all_tags = [];
  // let a = "kljals"
  Post.all(driver, (posts) => {
    // console.log(a)
    for (let i in posts) {
      // console.log(result)
      var html = fs.readFileSync(posts[i].html_path);
      console.log("循环同步读取html内容" );
      result.push({
        id: posts[i].id,
        title: posts[i].title,
        desc: posts[i].desc,
        tags: posts[i].tags,
        img_url: posts[i].img_path,
        html: html.toString(),
        createTime: posts[i].createTime,
        updateTime: posts[i].updateTime
      })
    }
    // data.posts = JSON.stringify(result.reverse());
    data.posts = result.reverse();

    Tag.all(driver, (tags) => {
      for (let i in tags) {
        // console.log(result)
        all_tags.push({
          id: tags[i].id,
          value: tags[i].name,
          label: tags[i].name,
        })
      }
      data.all_tags = all_tags;
      res.send(data)
    })
  })
})


/**
 * Route to update a post, AUTH REQUIRED
 */
apiRouter.post('/updatePost', adminAuthenticationMiddleware, (req, res, next) => {
  if (req.body.id, req.body.title, req.body.desc, req.body.content) {
    Post.get(driver, req.body.id, (post) => {
      if (post) {
        post.update(req.body.title, req.body.desc, req.body.content, (result) => {
          if (result) {
            res.status(200)
            res.send('ok')
          } else {
            res.status(500)
            res.send('internal error')
          }
        })
      } else {
        res.status(404)
        res.send("not found")
      }
    })
  } else {
    res.status(400)
    res.send('bad request')
  }
})

/**
 * Route to delete a post, AUTH REQUIRED
 */
apiRouter.post('/deletePost', adminAuthenticationMiddleware, (req, res, next) => {
  if (req.body.id) {
    Post.get(driver, req.body.id, (post) => {
      if (post) {
        post.delete((result) => {
          if (result) {
            res.status(200)
            res.send('ok')
          } else {
            res.status(500)
            res.send('internal error')
          }
        })
      } else {
        res.status(404)
        res.send("not found")
      }
    })
  }
})


// Serve index and admin pages
app.use('/', express.static('static'))

// Use API router
app.use('/api/v1', apiRouter)


// Start the server
app.listen(config.port, () => console.log('App listening on port ' + config.port))

