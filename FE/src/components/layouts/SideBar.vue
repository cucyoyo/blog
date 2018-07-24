<template>
  <div>
    <div class="panel panel-default">
      <div class="panel-body">
        <h4>最近文章</h4>
        <ul class="lateBlogs">
          <!--<li v-for="i in 5"><i class="iconfont icon-zuixinnew3"></i> {{ posts[i].title }} </li>-->
          <li v-for="i in 5" @click="toDetail(posts[i].id)"> {{ posts[i].title }} </li>
        </ul>
      </div>
    </div>
    <div class="panel panel-default">
      <div class="panel-body">
        <h4>标签导航</h4>
        <span v-for="tag in all_tags" class="tagItem" :style='tagStyle()' @click="tagLink(tag.value)"> {{ tag.value }}</span>
      </div>
    </div>
    <div class="panel panel-default social">
      <div class="panel-body">
        <h4>社交账号</h4>
        <!--<ul>-->
          <!--<li>1234</li>-->
          <!--<li>1234</li>-->
          <!--<li>1234</li>-->
        <!--</ul>-->
        <a class="github" href="https://github.com/cucyoyo"><i class="iconfont icon-GitHub"></i></a>
        <a class="weibo" href="https://www.weibo.com/u/3207077385/"><i class="iconfont icon-icon_weibo"></i></a>
      </div>
    </div>
    <div class="panel panel-default">
      <div class="panel-body">
        <h4>打赏</h4>
        <img class="payImg" src="../../assets/img/payMe.png" alt="aliPayMe.png">
        <img class="payImg" src="../../assets/img/aliPayMe.png" alt="aliPayMe.png">
      </div>
    </div>

  </div>
</template>

<script>
  export default {
    name: "sidebar",
    data() {
      return {
        posts: [],
        all_tags: [],
      }
    },
    mounted() {
      this.getData();
    },
    methods: {
      tagStyle() {
        let size = 12 +  Math.floor(Math.random()*12); // 15-45之间的随机数
        // let style = 'font-size:' + size + 'px';
        return 'font-size:' + size + 'px';
      },
      getData() {
        this.axios.get('/posts', {
          params: {
            tag: 'all'
          }
        }).then(res=>{
          // 查看后台任务是否运行
          // console.log(res)
          this.posts = res.data.posts;
          this.all_tags = res.data.all_tags.sort(this.randomSort);


        }).catch(err=>{
          console.log(err)
        })
      },
      randomSort(a, b) { return Math.random() > 0.5 ? -1 : 1; },
    }
  }
</script>

<style lang="less" scoped>
  .panel {
    .panel-body{
      h4 {
        margin-bottom: 15px;
      }
      .lateBlogs {
        margin-left: 10px;
        li {
          cursor: pointer;
          margin-bottom: 10px;
        }
        li:hover {
          color: #3a8ee6;
        }
        li:before {
          content: '';
          display: inline-block;
          width: 8px;
          height: 8px;
          border-radius: 5px;
          /*color: #3a8ee6;*/
          background-color: gray;
          /*margin-left: 10px;*/
          margin-right: 10px;
        }
      }
      .tagItem {
        margin: 10px 10px 0 0;
        color: #3a8ee6;
        cursor: pointer;
      }
      .tagItem:hover{
        color: gray;
      }

      .payImg {
        width: 40%;
      }
    }
  }
  .social {
    a {
      margin-right: 15px;
      cursor: pointer;
      text-decoration: none;
      .iconfont {
        font-size: 30px;
        /*width: 30px;*/
        /*color: red;*/
      }
    }
    .weibo{
      color: red;
    }
  }

  /*section {*/
    /*background: #fff;*/
    /*margin-bottom: 20px;*/
    /*border: 1px solid #9d9d9d;*/
  /*}*/
</style>
