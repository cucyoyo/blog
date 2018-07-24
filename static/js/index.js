/**
 * Initialize Vue.js
 */
var app = new Vue({
    el: '#app',
    data: {
        posts: []
    },
    mounted: function(){
        this.loadAllPosts()
    },
    methods: {
        /**
         * Reload all blog posts
         */
        // loadAllPosts: function(){
        //     var self = this
        //     axios.get("/api/v1/posts").then(function(data) {
        //         self.posts = data.data
        //     })
        // }

      loadAllPosts: function () {
        var self = this
        axios.get("/api/v1/posts").then(function (data) {
          self.posts = data.data.posts
          // self.all_tags = data.data.all_tags
        })
      },
      setImgurl(img_url) {
        // return 'http://127.0.0.1:3000/' + img_url + '?t=' + Math.random();
        return 'http://123.207.14.150:3000/' + img_url + '?t=' + Math.random();
      },
    }
})