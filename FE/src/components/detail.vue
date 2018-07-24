<template>
  <div v-loading="loading">
    <div  class="panel panel-default">
      <div class="panel-body">
        <h3>{{ post.title }}</h3>
        <p class="info">创建时间：{{post.createTime}} | 更新时间：{{ post.updateTime }}</p>
        <!--<p class="des">文章描述文章描述文章描述文章描述文章描述文章描述文章描述文章描述文章描述文章描述文章描述文章描述 </p>-->
        <!--<div v-html="c"></div>-->
        <!--<div v-html="d"></div>-->
        <div class="blog-detail">
          <img :src="setImgurl(post.img_path)" alt="img">
          <div v-html="post.html" class="content"></div>
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
        post: {},
        loading: true,
      }
    },
    watch: { // 监控路由跳转
      '$route' (to, from) {
        // console.log(to.name);
        // console.log(to);
        if (to.name === 'detail' && from.name === 'detail') {// 同一个组件变换不会重新执行钩子函数，所以要手动重新获取数据
          this.getData();
        }
      }
    },
    mounted() {
      this.getData();
    },
    methods: {
      getData() {
        this.loading = true;
        this.axios.get('/detail', {
          params: {
            id: this.$route.params.id
          }
        }).then(res=>{
//          console.log(res.data);
          this.post = res.data;
          this.post.html = '<style>img {max-width: 100%}</style>' + this.post.html
          this.loading = false;
        })
      }

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
      .content {
        margin-top: 20px;
        /*p { color: red }*/
        /*img {*/
          /*max-width: 100%;*/
        /*}*/
      }
    }
  }
}
</style>
