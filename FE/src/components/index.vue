<template>
  <div>
    <div v-for="i in 10" class="thumbnail">
      <!--<div>-->
        <img src=".././assets/img/2.jpg" alt="banner图" >
      <!--</div>-->
      <div class="caption">
        <h3>博客标题</h3>
        <p class="info">信息sf  </p>
        <p class="des">文章描述文章描述文章描述文章描述文章描述文章描述文章描述文章描述文章描述文章描述文章描述文章描述 </p>
        <p class="foot">
          <span v-for="k in 3" class="pull-left tag">#标签</span>
          <router-link :to="{name:'index'}" class="pull-right link">继续阅读 >></router-link>
        </p>
        <div class="clearfix"></div>
        <!--<p><a href="#" class="btn btn-primary" role="button">Button</a> <a href="#" class="btn btn-default" role="button">Button</a></p>-->
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "index"
  }
</script>

<style lang="less" scoped>
.thumbnail {
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
