<template>
  <div id="about">
    <el-card class="card" shadow="hover">
      <div slot="header" class="clearfix">
        <h4>yoyo不是小孩</h4>
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
      <p>滴滴出行</p>
      <p>有树</p>
    </el-card>
    <el-card class="card" shadow="hover">
      <div slot="header" class="clearfix">
        <h4>专业技能</h4>
      </div>
      <p>滴滴出行</p>
      <p>有树</p>
    </el-card>
    <el-card class="card" shadow="hover">
      <div slot="header" class="clearfix">
        <h4>相关作品</h4>
      </div>
      <div class="work">
        <img class="work-img" src="http://123.207.14.150:3000/imgs/48.jpg" alt="">
        <img class="work-img" src="http://123.207.14.150:3000/imgs/48.jpg" alt="">
        <el-card :body-style="{ padding: '0px' }">
          <img src="http://123.207.14.150:3000/imgs/48.jpg" class="image">
          <div style="padding: 14px;">
            <span>好吃的汉堡</span>
            <div class="bottom clearfix">
              <el-button type="text" class="button">操作按钮</el-button>
            </div>
          </div>
        </el-card>
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
    methods: {}
  }
</script>

<style lang="less" scoped>
  #about {
    /*background: #ffffff;*/
    /*padding: 10px;*/
    /*.thumbnail {*/
    /*.caption {*/
    .card {
      margin-bottom: 20px;
      .work {
        .work-img {
          width: 50%;
        }
      }
    }
    /*}*/
    /*}*/
  }


</style>
