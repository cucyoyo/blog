<template>
  <div>
    <!--<div v-for="i in 10" class="thumbnail">-->
      <!--&lt;!&ndash;<div>&ndash;&gt;-->
        <!--<img src=".././assets/img/55.png" alt="banner图" >-->
      <!--&lt;!&ndash;</div>&ndash;&gt;-->
      <!--<div class="caption">-->
        <!--<h3>博客标题</h3>-->
        <!--<p class="info">信息 </p>-->
        <!--<p class="des">文章描述文章描述文章描述文章描述文章描述文章描述文章描述文章描述文章描述文章描述文章描述文章描述 </p>-->
        <!--<p class="foot">-->
          <!--<span v-for="k in 3" class="pull-left tag">#标签</span>-->
          <!--<router-link :to="{name:'detail' , params: { id:2 }}" class="pull-right link">继续阅读 >></router-link>-->
        <!--</p>-->
        <!--<div class="clearfix"></div>-->
        <!--&lt;!&ndash;<p><a href="#" class="btn btn-primary" role="button">Button</a> <a href="#" class="btn btn-default" role="button">Button</a></p>&ndash;&gt;-->
      <!--</div>-->
    <!--</div>-->
    <div v-for="post in posts" class="thumbnail">
      <!--<div>-->
      <img :src="setImgurl(post.img_url)" alt="banner图" >
      <!--</div>-->
      <div class="caption">
        <h3>{{ post.title }}</h3>
        <p class="info">创建时间：{{post.createTime}} | 更新时间：{{ post.updateTime }} </p>
        <p class="des"> {{ post.desc }} </p>
        <p class="foot">
          <span v-for="tag in post.tags.split(',')" class="pull-left tag">{{ tag }}</span>
          <!--<router-link :to="{name:'detail' , params: { id:2 }}" class="pull-right link">继续阅读 >></router-link>-->
          <a class="pull-right link" @click="toDetail(post)">继续阅读 >></a>
        </p>
        <div class="clearfix"></div>
        <!--<p><a href="#" class="btn btn-primary" role="button">Button</a> <a href="#" class="btn btn-default" role="button">Button</a></p>-->
      </div>
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
      }
    },
    mounted() {
      console.log('jalsj')
      // this.axios.get("/posts").then(function (data) {
      //   console.log(data)
      // })
      this.axios.get('/posts').then(res=>{
        // 查看后台任务是否运行
        // console.log(res)
        this.posts = res.data.posts;
        this.all_tags = res.data.all_tags;

      }).catch(err=>{
        console.log(err)
      })
    },
    methods: {
      setImgurl(img_url) {
        return 'http://127.0.0.1:3000/' + img_url + '?t=' + Math.random();
      },
      toDetail(post) {
        // consloe.log()
        let postStr = JSON.stringify(post)
        window.localStorage.setItem('post', postStr);
        this.$router.push({ name: 'detail'});
      }
    },

  }
</script>

<style lang="less" scoped>
.thumbnail {
  width: 100%;
  img {
    min-width: 100%;
    /*max-width: 100%;*/
  }
  .caption {
    .info {
      /*line-height: 30px;*/
      margin: 15px 0;
      color: #aaa;
    }
    .des {
      text-indent: 2ch;
    }
    .foot {
      margin: 15px 0;
      .tag {
        background: #9d9d9d;
        color: #fff;
        margin-right: 5px;
        padding: 2px;
        border-radius: 5px;
      }
      .link {
        color: #3a8ee6;
        font-weight: bold;
        text-decoration: none;
      }
    }
  }
}
</style>
