<template>
  <div id="about">
    <el-card class="card" shadow="hover">
      <div slot="header" class="clearfix">
        <h4>基本信息</h4>
      </div>
      <p>邮箱：cucyoyo@163.com</p>
      <p>github: https://github.com/cucyoyo</p>
      <p>站点：cucyoyo.me</p>
    </el-card>
    <el-card class="card" shadow="hover">
      <div slot="header" class="clearfix">
        <h4>教育经历</h4>
      </div>
      <p>2016.09 - 2019.07 &nbsp中国传媒大学 &nbsp研究生 &nbsp计算机软件与理论</p>
      <p>2012.09 - 2016.07 &nbsp中国传媒大学 &nbsp本科 &nbsp&nbsp&nbsp&nbsp信息安全</p>
    </el-card>
    <el-card class="card" shadow="hover">
      <div slot="header" class="clearfix">
        <h4>实习经历</h4>
      </div>
      <p>2018.04 &nbsp&nbsp&nbsp至今&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp 滴滴出行 &nbsp前端开发工程师</p>
      <p>2017.07 - 2017.09&nbsp 有树科技 &nbsp前端开发工程师</p>
    </el-card>
    <el-card class="card" shadow="hover">
      <div slot="header" class="clearfix">
        <h4>项目经历</h4>
      </div>
      <p>2018.07 <span v-for="i in 18">&nbsp</span> Node + Vue搭建的个人博客平台 <span v-for="i in 12">&nbsp</span> 独立开发</p>
      <p>2016.07 - 2017.07 &nbsp&nbsp 信息安全在线实验平台开发  <span v-for="i in 21">&nbsp</span>主要开发人员  </p>
      <p>2017.09 &nbsp 至今 <span v-for="i in 8">&nbsp</span> 基于深度学习的恶意流量检测技术研究 &nbsp&nbsp 独立负责 </p>
      <p>2016.04 - 2016.09 &nbsp&nbsp python网络爬虫 <span v-for="i in 38">&nbsp</span> 独立负责</p>
    </el-card>
    <el-card class="card" shadow="hover">
      <div slot="header" class="clearfix">
        <h4>专业技能</h4>
      </div>
      <p>
         前端基础 <br>
        &nbsp&nbsp&nbsp&nbsp HTML CSS JavaScript JQuery <br>
         前端开发框架和 API <br>
        &nbsp&nbsp&nbsp&nbsp Vue.js BootStrap JQuery Element React <br>
         后端语言和技术 <br>
        &nbsp&nbsp&nbsp&nbsp Python PHP(Laravel) Node MySQL <br>
         开发工具 <br>
        &nbsp&nbsp&nbsp&nbsp WebStorm Atom SublimeText PhpStorm PyCharm JupyterNotebook <br>
         其他 <br>
        &nbsp&nbsp&nbsp&nbsp 两年以上 Web 网站前后端分离开发 <br>
        &nbsp&nbsp&nbsp&nbsp 一年以上基于 Git 的团队协作经验 <br>
        &nbsp&nbsp&nbsp&nbsp 一年以上 Linux 环境开发经验 <br>
      </p>
    </el-card>
    <el-card class="card" shadow="hover">
      <div slot="header" class="clearfix">
        <h4>相关作品</h4>
      </div>
      <div class="work">
        <!--<a href=""></a>-->
        <div class="imgbox" data-text="仿豆瓣的电影后台" @click="workLink('http://123.207.14.150:3001/')">
          <img src="../assets/img/works/movie.png" alt="仿豆瓣的电影后台">
        </div>
        <div class="imgbox" data-text="基于Echarts的房价统计网站" @click="workLink('http://123.207.14.150:8000/')">
          <img src="../assets/img/works/echarts.png" alt="基于Echarts的房价统计网站">
        </div>
        <div class="imgbox" data-text="个人博客管理后台" @click="workLink('http://123.207.14.150:3000/')">
          <img src="../assets/img/works/backblog.png" alt="个人博客管理后台">
        </div>
        <div class="imgbox" data-text="静态的个人博客布局练习" @click="workLink('https://cucyoyo.github.io/')">
          <img src="../assets/img/works/githubio.png" alt="静态的个人博客布局练习">
        </div>
        <!--<img class="work-img" src="http://123.207.14.150:3000/imgs/48.jpg" alt="">-->

      </div>
    </el-card>
    <!--</el-col>-->

    <!--</div>-->
    <!--</div>-->

  </div>
</template>

<script>
  export default {
    name: "about",
    mounted() {

    },
    data() {
      return {}
    },
    methods: {
      workLink(url) { // 作品跳转
        window.open(url, '_blank');
      }
    }
  }
</script>

<style lang="less" scoped>
  #about {

    .card {
      margin-bottom: 20px;
      .work {
        .imgbox {
          width:40%;
          /*height: 140px;*/
          float: left;
          margin: 0 10% 5% 0;
          position:relative;
          overflow: hidden;
          img {
            width: 100%;
          }
        }
        .imgbox:after{
          /*content: 'dianji';*/
          position:absolute;
          left: 0;
          top:0;
          display: inline-block;
          width:100%;
          height: 100%;
          background-color: rgba(0, 0, 0, 0.5);
          transition:all 0.5s ease;
          transform: translateY(-101%);
          content: attr(data-text);
          color: #FFF;
          font-size: 20px;
          line-height: 200px;
          text-align: center;
        }
        .imgbox:hover:after{
          transform: translateY(0);
        }
      }
    }

  }


</style>
