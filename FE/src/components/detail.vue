<template>
  <div>
    <div  class="panel panel-default">
      <div class="panel-body">
        <h3>{{ post.title }}</h3>
        <p class="info">创建时间：{{post.createTime}} | 更新时间：{{ post.updateTime }}</p>
        <!--<p class="des">文章描述文章描述文章描述文章描述文章描述文章描述文章描述文章描述文章描述文章描述文章描述文章描述 </p>-->
        <!--<div v-html="c"></div>-->
        <!--<div v-html="d"></div>-->
        <div class="blog-detail">
          <img :src="setImgurl(post.img_url)" alt="img">
          <div v-html="post.html" style="margin-top: 20px"></div>
        </div>
      </div>


    </div>
  </div>
</template>

<script>
  export default {
    name: "detail",
    data() {
      return {
        post: {}
      }
    },
    mounted() {
      let postStr = window.localStorage.getItem('post')
      this.post = JSON.parse(postStr)
    },
    methods: {
      setImgurl(img_url) {
        return this.serverIP + img_url + '?t=' + Math.random();
      },
    }
  }
</script>

<style lang="less" scoped>
.panel {
  .panel-body {
    .info {
      margin: 15px 0;
    }
    .blog-detail {
      line-height: 30px;
      img{
        width: 100%;
      }
    }
  }
}
</style>
