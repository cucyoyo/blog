/**
 * Set a new cookie, update existing
 * @param {*} cname
 * @param {*} cvalue
 * @param {*} exdays
 */
function setCookie(cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
  var expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

/**
 * Get a cookie, return "" if none found
 * @param {*} cname
 */
function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

// $(document).ready(function(){
//   $("#edit-button").click(function(){
//     // 页面滚动到下面编辑的内容位置
//     console.log("jsdlfjljsljf")
//     $('html, body').animate({scrollTop:$("#edit-section").offset().top  }, 1000);
//   });
// });

/**
 * Initialize Vue.js
 */
// var VueCropper = require('../../node_modules/vue-cropper')
var app = new Vue({
  el: '#app',
  data: {
    username: "",
    password: "",
    authToken: "",
    posts: [],
    editingPost: null,
    dialogImageUrl: '',
    dialogVisible: false,
    all_tags: [],
    cropper: null, // 控制图片剪裁器
    quill: null, // 控制富文本编辑器

    // newPostTitle: "",
    edit_id: -1,
    title: '',
    desc: '',
    // newPostContent: "",
    tags: [],
    img_url: '',
    rect: null,
    html: '', // 富文本编辑器内容
    default_img: 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7',

    value4: '',
  },
  mounted: function () {
    var self = this
    // Check login status once
    axios.get('/api/v1/checkLoginStatus', {
      headers: {'token': getCookie('auth-token')}
    }).then(function (data) {
      self.authToken = getCookie('auth-token')
    })
    this.loadAllPosts()


    // this.$nextTick(function () {
    // });
    setTimeout(function () { // 获取不到dom节点，使用nextTick也不生效，所以用一个最笨的方法，1秒以后再做曹锁
      // -----图片剪裁功能
      self.cropper = new Cropper({
        aspectRatio: 'auto',
        element: document.getElementById('cropper-target'),
        previews: [
          document.getElementById('preview-large'),
          document.getElementById('preview-medium'),
          document.getElementById('preview-small')
        ],
        onCroppedRectChange: function (rect) {
          console.log(rect);
          self.rect = rect;
        }
      });
      var input = document.getElementById('cropper-input');
      input.onchange = function () {
        if (typeof FileReader !== 'undefined') {
          var reader = new FileReader();
          reader.onload = function (event) {
            self.img_url = event.target.result
            self.cropper.setImage(event.target.result);
          };
          if (input.files && input.files[0]) {
            reader.readAsDataURL(input.files[0]);
          }
        } else { // IE10-
          input.select();
          input.blur();
          var src = document.selection.createRange().text;
          self.img_url = src;
          self.cropper.setImage(src);
        }
      };
      // -----end - 图片剪裁功能

      // --------富文本编辑器
      /* 编辑器操作条选项 */
      var toolbarOptions = [
        ['bold', 'italic', 'underline', 'strike'], //开关按钮
        ['blockquote', 'code-block'],
        [{'header': 1}, {'header': 2}], //自定义按钮值
        [{'list': 'ordered'}, {'list': 'bullet'}],
        [{'script': 'sub'}, {'script': 'super'}], // 上标/下标
        [{'indent': '-1'}, {'indent': '+1'}], // 减少缩进/缩进
        [{'direction': 'rtl'}], // 文本方向
        [{'size': ['small', false, 'large', 'huge']}], // 自定义下拉
        [{'header': [1, 2, 3, 4, 5, 6, false]}],
        [{'color': []}, {'background': []}], //使用主题的默认下拉
        [{'font': []}],
        [{'align': []}],
        ['clean'], //移除格式化
        ['image'],
        ['video'],
        ['formula'] //需要加载cdnjs.cloudflare.com/ajax/libs/KaTeX/0.7.1/katex.min.js
      ];

      /* 实例化编辑器 */
      self.quill = new Quill('#editor', {
        /*debug: 'info',*/

        modules: {
          //formula: true, //公式；需要加载cdnjs.cloudflare.com/ajax/libs/KaTeX/0.7.1/katex.min.js
          //syntax: true,  //高亮；需要加载cdnjs.cloudflare.com/ajax/libs/highlight.js/9.12.0/highlight.min.js
          /*toolbar: {
              container:"#editor_header"
          }*/ // 或者 toolbar :'#editor_header'
          toolbar: toolbarOptions  //指定编辑器操作条
        },
        theme: 'snow', //主题，有两种，snow和bubble
        placeholder: '请输入',
        readOnly: false
      });

      /* 传入布尔值，控制编辑器是否可用 */
      self.quill.enable();

      //quill.blur(); //失去焦点
      //quill.focus(); //获得焦点

      /* 事件的绑定 */
      self.quill.on('text-change', function (delta, oldDelta, source) {
        // console.log(delta);
        // console.log(oldDelta);
        // console.log(source);
        // console.log(self.quill.container.firstChild.innerHTML); //获取当前富文本编辑器实例的内容（带html标签）
        self.html = self.quill.container.firstChild.innerHTML;
      });
      //quill.off('text-change', handler); //事件的解绑

      /* 向编辑器中插值 */
      // self.quill.clipboard.dangerouslyPasteHTML('&nbsp;<b>Hello World</b><p>new line</p>'); //向编辑器中插入html片段
      // self.quill.setText('Hello!'); //向编辑器中插入文本

      /* 获取编辑器中的值 */
      // console.log(self.quill.getContents());

      /* 自定义按钮 */
      var myBtn = document.querySelector("#my_button");
      myBtn.addEventListener("click", function () {
        console.log('my-btn')
      })
      // --------end - 富文本编辑器
    }, 1000)

    // -----end - 图片剪裁功能

  },
  methods: {
    setImgurl(img_url) {
      return 'http://127.0.0.1:3000/' + img_url + '?t=' + Math.random();
    },
    /**
     * Attempt a login
     */
    login: function () {
      var self = this
      axios.post("/api/v1/login", {
        username: this.username,
        password: this.password
      }).then(function (data) {
        console.log(self)
        self.authToken = data.data.token
        setCookie('auth-token', data.data.token, 7)
      }).catch(function (e) {
        alert("用户名或密码不正确")
      })
    },
    /**
     * Create a new blog post
     */
    newPost: function (flag) {    // flag=0： 新建； flag=1：编辑修改
      var self = this;
      if (this.title && this.desc && this.img_url && this.rect && this.tags.length !== 0 && this.html) {
        axios.post("/api/v1/createNewPost", {
          id: this.edit_id,
          title: this.title,
          desc: this.desc ,
          // content: this.newPostContent
          img_url: this.img_url,
          rect: this.rect,
          tags: this.tags.toString(),
          html: this.html
        }, {
          headers: {'token': this.authToken}
        }).then(function (data) {
          self.$notify({
            title: '成功',
            message: '成功创建文章',
            type: 'success'
          });
          self.title = "";
          self.desc = "";
          self.tags = [];
          // self.img_url = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
          self.img_url = self.default_img;
          // self.cropper.setImage('data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7');
          self.cropper.setImage(self.default_img);
          self.rect = null;
          self.html = '';
          self.quill.setText('');
          self.loadAllPosts();
          self.editingPost = null;
          self.goTop(); // 回到顶部
        }).catch(function (e) {
          console.log(e);
          self.$notify.error({
            title: '错误',
            message: '创建文章失败'
          });
        })
      } else {
        this.$notify.info({
          title: '信息不全',
          message: '请检查填写信息是否完整'
        });
      }

    },
    /**
     * Reload all blog posts
     */
    loadAllPosts: function () {
      var self = this
      axios.get("/api/v1/posts").then(function (data) {
        self.posts = data.data.posts
        self.all_tags = data.data.all_tags
      })
    },
    // todo  ---- 点击编辑博客按钮
    edit(post) {
      this.editingPost = post;
      this.edit_id = post.id;
      this.title = post.title;
      this.desc = post.desc;
      this.tags = post.tags.split(",");
      this.img_url = post.img_url;
      // console.log("setimage:" + 'http://127.0.0.1:3000/' + this.img_url + '?t=' + Math.random());
      this.cropper.setImage('http://127.0.0.1:3000/' + this.img_url + '?t=' + Math.random());
      // this.rect = null;
      this.html = post.html;
      // this.quill.setText('');
      this.quill.clipboard.dangerouslyPasteHTML(this.html);

      this.goEdit();

    },
    // 滚动到编辑博客位置
    goEdit() {
      $('html, body').animate({scrollTop:$("#edit-section").offset().top  }, 500);
    },
    // 回到顶部按钮
    goTop() {
      $('html, body').animate({scrollTop:0 }, 500);
    },
    cancelEdit() {
      this.editingPost = null;
      this.edit_id = -1;
      this.title = '';
      this.desc = '';
      this.tags = [];
      this.img_url = this.default_img;
      this.cropper.setImage(this.default_img);
      // this.rect = null;
      this.html = '';
      this.quill.setText('');
      // this.quill.clipboard.dangerouslyPasteHTML(this.html);

    },

    /**
     * Save/upate a blog post
     */
    savePost: function () {
      var self = this
      axios.post("/api/v1/updatePost", {
        title: this.editingPost.title,
        desc: this.editingPost.desc,
        content: this.editingPost.content,
        id: this.editingPost.id
      }, {
        headers: {'token': this.authToken}
      }).then(function (data) {
        alert("成功保存文章")
        self.editingPost = null
        self.loadAllPosts()
      }).catch(function (e) {
        alert("保存文章失败")
      })
    },
    imgPost: function () {
      var self = this
      axios.post("/api/v1/imgPost", {
        img_url: this.img_url,
        rect: this.rect
      }, {
        headers: {'token': this.authToken}
      }).then(function (data) {
        console.log(data);
        // alert("图片上传成功")

      }).catch(function (e) {
        console.log(e);
        // alert("图片上传失败")
      })
    },
    testQuill() {
      var self = this
      axios.post("/api/v1/testQuill", {
        html: this.html,
        // rect: this.rect
      }, {
        headers: {'token': this.authToken}
      }).then(function (data) {
        console.log(data);
        alert("html上传成功")

      }).catch(function (e) {
        console.log(e);
        alert("html上传失败")
      })
    },
    /**
     * Delete a blog post
     */
    deletePost: function (id) {
      var self = this
      if (confirm("你确定要删除这个博文？")) {
        axios.post("/api/v1/deletePost", {
          id: id
        }, {
          headers: {'token': this.authToken}
        }).then(function (data) {
          // alert("成功删除文章")
          self.$notify({
            title: '成功',
            message: '成功删除文章',
            type: 'success'
          })
          self.loadAllPosts()
        }).catch(function (e) {
          // alert("删除文章失败")
          self.$notify.error({
            title: '失败',
            message: '删除文章失败',
          })
        })
      }
    }
  }
})
