const express = require('express')
const app = express()
const config = require('./config')
const sqlite3 = require('sqlite3').verbose()
// Change database to other than :memory:, in-memory database will be lost when closed.
// const db         = new sqlite3.Database(':memory:')
const db = new sqlite3.Database('dd.db')
const sha512 = require('js-sha512').sha512
const bodyParser = require('body-parser')
const uuidv4 = require('uuid/v4')

// Initialize API router
let apiRouter = express.Router()
// apiRouter.use(bodyParser.urlencoded({limit: '50mb', extended: false}))
// apiRouter.use(bodyParser.json({limit: '50mb'}))
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
  if (req.body.title && req.body.content) {
    Post.make(driver, [null, req.body.title, req.body.content, new Date().toLocaleDateString("en-US")], (result) => {
      if (result) {
        res.status(200)
        res.send('ok')
      } else {
        res.status(500)
        res.send('internal error')
      }
    })
  } else {
    res.status(400)
    res.send('bad request')
  }
})

// 图片剪裁代码
apiRouter.post('/imgPost', adminAuthenticationMiddleware, (req, res) => {

  if (req && req.body ) {
    if (res.body.img_url && res.body.rect) {
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

          gm('456_raw.jpg').crop(req.body.rect.width, req.body.rect.height, req.body.rect.x, req.body.rect.y).write('456.jpg', function (err) {
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




  // if(req.body.title && req.body.content){
  //   Post.make(driver, [null, req.body.title, req.body.content, new Date().toLocaleDateString("en-US")], (result) => {
  //     if(result){
  //       res.status(200)
  //       res.send('ok')
  //     } else {
  //       res.status(500)
  //       res.send('internal error')
  //     }
  //   })
  // } else {
  //   res.status(400)
  //   res.send('bad request')
  // }
})
/**
 * Route to get all posts
 */
apiRouter.get('/posts', (req, res) => {
  Post.all(driver, (posts) => {
    let result = []
    for (let i in posts) {
      result.push({
        id: posts[i].id,
        title: posts[i].title,
        content: posts[i].content,
        createTime: posts[i].createTime
      })
    }
    res.send(JSON.stringify(result.reverse()))
  })
})


/**
 * Route to update a post, AUTH REQUIRED
 */
apiRouter.post('/updatePost', adminAuthenticationMiddleware, (req, res, next) => {
  if (req.body.id, req.body.title, req.body.content) {
    Post.get(driver, req.body.id, (post) => {
      if (post) {
        post.update(req.body.title, req.body.content, (result) => {
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