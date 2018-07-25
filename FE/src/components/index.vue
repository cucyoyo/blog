<template>
  <div  v-loading="loading" >
    <div v-if="$route.params.tag !== 'all'" class="panel panel-default tagHint">
      <div class="panel-body">
        <h5>当前标签：{{ $route.params.tag }}</h5>
      </div>
    </div>
    <div v-if="posts.length > 0">
      <div   v-for="post in posts" class="thumbnail">
        <!--<div>-->
        <img :src="setImgurl(post.img_url)" alt="banner图" @click="toDetail(post.id)">
        <!--</div>-->
        <div class="caption">
          <h3>{{ post.title }}</h3>
          <p class="info">创建时间：{{post.createTime}} | 更新时间：{{ post.updateTime }} </p>
          <p class="des"> {{ post.desc }} </p>
          <p class="foot">
            <span v-for="tag in post.tags.split(',')" class="pull-left tag" @click="tagLink(tag)">{{tag}}</span>
            <!--<router-link :to="{name:'detail' , params: { id:2 }}" class="pull-right link">继续阅读 >></router-link>-->
            <a class="pull-right link" @click="toDetail(post.id)">继续阅读 >></a>
          </p>
          <div class="clearfix"></div>
          <!--<p><a href="#" class="btn btn-primary" role="button">Button</a> <a href="#" class="btn btn-default" role="button">Button</a></p>-->
        </div>
      </div>
    </div>
    <div v-else-if="!loading">
      <h4>没有查询到该分类的文章</h4>
    </div>

  </div>
</template>

<script>
  export default {
    name: "index",
    data() {
      return {
        posts: [],
        all_tags: [],
        loading: true,
      }
    },
    watch: { // 监控路由跳转
      '$route' (to, from) {
        // console.log(to.name);
        // console.log(to);
        if (to.name === 'index' && from.name === 'index') {// 同一个组件变换不会重新执行钩子函数，所以要手动重新获取数据
          this.getData();
        }
      }
    },
    mounted() {
      this.getData()
    },
    methods: {
      getData() {
        this.loading = true;
        this.axios.get('/posts', {
          params: {
            tag: this.$route.params.tag
          }
        }).then(res=>{
          // 查看后台任务是否运行
          // console.log(res)
          this.posts = res.data.posts;
          this.all_tags = res.data.all_tags;
          this.loading = false;

        }).catch(err=>{
          console.log(err)
        })
      },
    },

  }
</script>

<style lang="less" scoped>
  .tagHint {
    /*.*/
    text-align: center;
    background: #3a8ee6;
    color: #fff;
  }
.thumbnail {
  width: 100%;
  img {
    min-width: 100%;
    cursor: pointer;
    /*max-width: 100%;*/
  }
  .caption {
    margin: 15px;
    .info {
      /*line-height: 30px;*/
      margin: 15px 0;
      color: #aaa;
    }
    .des {
      /*text-indent: 2ch;*/
    }
    .foot {
      margin: 15px 0;
      .tag {
        font-size: 12px;
        background: #9d9d9d;
        color: #fff;
        margin-right: 5px;
        padding: 5px;
        border-radius: 5px;
        cursor: pointer;
      }
      .tag:hover {
        background: #3a8ee6;
      }
      .link {
        color: #3a8ee6;
        font-weight: bold;
        text-decoration: none;
        cursor: pointer;
        padding: 5px 0;
      }
      .link:hover {
        color: #66b1ff;
      }
    }
  }
}
</style>
