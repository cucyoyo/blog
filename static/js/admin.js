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
    newPostTitle: "",
    newPostContent: "",
    posts: [],
    editingPost: null,
    dialogImageUrl: '',
    dialogVisible: false,
    options: [{
      value: '1',
      label: '黄金糕'
    }, {
      value: '2',
      label: '双皮奶'
    }, {
      value: '3',
      label: '蚵仔煎'
    }, {
      value: '4',
      label: '龙须面'
    }, {
      value: '5',
      label: '北京烤鸭'
    }],
    chosen_tags: [],
    value4: '',
    cropper: null,
    img_url: '',
    rect: null,
    html: '', // 富文本编辑器内容
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
      var quill = new Quill('#editor', {
        /*debug: 'info',*/

        modules: {
          //formula: true, //公式；需要加载cdnjs.cloudflare.com/ajax/libs/KaTeX/0.7.1/katex.min.js
          //syntax: true,  //高亮；需要加载cdnjs.cloudflare.com/ajax/libs/highlight.js/9.12.0/highlight.min.js
          /*toolbar: {
              container:"#editor_header"
          }*/ // 或者 toolbar :'#editor_header'
          toolbar:toolbarOptions  //指定编辑器操作条
        },
        theme: 'snow', //主题，有两种，snow和bubble
        placeholder:'请输入',
        readOnly: false
      });

      /* 传入布尔值，控制编辑器是否可用 */
      quill.enable();
      //quill.blur(); //失去焦点
      //quill.focus(); //获得焦点

      /* 事件的绑定 */
      quill.on('text-change', function(delta, oldDelta, source) {
        console.log(delta);
        console.log(oldDelta);
        console.log(source);
        console.log(quill.container.firstChild.innerHTML); //获取当前富文本编辑器实例的内容（带html标签）
        self.html = quill.container.firstChild.innerHTML;
      });
      //quill.off('text-change', handler); //事件的解绑

      /* 向编辑器中插值 */
      quill.clipboard.dangerouslyPasteHTML('&nbsp;<b>Hello World</b><p>new line</p>'); //向编辑器中插入html片段
      quill.setText('Hello!'); //向编辑器中插入文本

      /* 获取编辑器中的值 */
      console.log(quill.getContents());

      /* 自定义按钮 */
      var myBtn = document.querySelector("#my_button");
      myBtn.addEventListener("click",function(){
        console.log('my-btn')
      })
      // --------end - 富文本编辑器
    }, 1000)

    // -----end - 图片剪裁功能

  },
  methods: {
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
    newPost: function () {
      var self = this
      if (this.newPostTitle && this.img_url && this.rect && this.chosen_tags.length !== 0 && this.html) {
        axios.post("/api/v1/createNewPost", {
          title: this.newPostTitle,
          // content: this.newPostContent
          img_url: this.img_url,
          rect: this.rect,
          chosen_tags: this.chosen_tags.toString(),
          html: this.html
        }, {
          headers: {'token': this.authToken}
        }).then(function (data) {
          self.$notify({
            title: '成功',
            message: '成功创建文章',
            type: 'success'
          });
          // self.newPostTitle = ""
          // self.newPostContent = ""
          // self.loadAllPosts()
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
        self.posts = data.data
      })
    },
    /**
     * Save/upate a blog post
     */
    savePost: function () {
      var self = this
      axios.post("/api/v1/updatePost", {
        title: this.editingPost.title,
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
          alert("成功删除文章")
          self.loadAllPosts()
        }).catch(function (e) {
          alert("删除文章失败")
        })
      }
    }
  }
})