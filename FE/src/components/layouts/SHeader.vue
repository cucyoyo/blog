<template>
  <div>
    <nav class="navbar navbar-default  navbar-fixed-top" role="navigation">
      <div class="container" >
        <div class="navbar-header">
          <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          <router-link  id="preface" class="navbar-brand router-link" :to="{path:'/'}">
          <!--<router-link  id="preface" class="navbar-brand router-link" :path="/">-->
            胖小左
          </router-link>
        </div>
        <div id="navbar" class="navbar-collapse collapse ">
          <ul class="nav navbar-nav navbar-right">
            <li>
              <!--<router-link :to="{name:'detail' , params: { id:2 }}" class="pull-right link">继续阅读 >></router-link>-->
              <router-link :to="{name: 'index', params: { tag:'前端' }}" role="button" aria-haspopup="true" aria-expanded="false">
                前端
              </router-link>
            </li>
            <li>
              <router-link :to="{name: 'index', params: { tag:'后端' }}" role="button" aria-haspopup="true" aria-expanded="false">
                后端
              </router-link>
            </li>
            <li>
              <router-link :to="{name: 'index', params: { tag:'小记' }}" role="button" aria-haspopup="true" aria-expanded="false">
                小记
              </router-link>
            </li>
            <li>
              <router-link :to="{name: 'index', params: { tag:'生活' }}" role="button" aria-haspopup="true" aria-expanded="false">
                生活
              </router-link>
            </li>
            <li>
              <router-link :to="{name: 'index', params: { tag:'关于' }}" role="button" aria-haspopup="true" aria-expanded="false">
                关于
              </router-link>
            </li>
            <!--<li class="dropdown">-->
              <!--<a role="button" class="dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">-->
                <!--其他-->
                <!--<span class="caret"></span>-->
              <!--</a>-->
              <!--<ul class="dropdown-menu multi-level" role="menu" aria-labelledby="dropdownMenu">-->
                <!--<li><router-link class="router-link" :to="{name: 'index'}">其他1</router-link></li>-->
                <!--<li class="divider"></li>-->
                <!--<li><router-link class="router-link" :to="{name: 'index'}">其他2</router-link></li>-->
              <!--</ul>-->
            <!--</li>-->
          </ul>
        </div>
      </div>
    </nav>

    <!--模态框-->
    <div id="modal" class="modal fade bs-example-modal-sm" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel">
      <div class="modal-dialog modal-sm" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
            <h4 class="modal-title" id="myModalLabel">提示</h4>
          </div>
          <div class="modal-body">开始时间不能超过今天，请重新选择！sadf aaf</div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary" data-dismiss="modal">确定</button>
          </div>
        </div><!-- /.modal-content -->
      </div>
    </div>

  </div>
</template>

<script>
  import bus from '@/assets/eventBus'
  export default {
    name: "sheader",
    mounted() {
      // 点击之后回弹
      $('nav ul li').on('click', function(){

        // $('.navbar-toggle').click() //bootstrap 3.x by Richard
        if($('.navbar-toggle').css('display') !== 'none'){
          $('.navbar-toggle').trigger( "click" );
        }
      });

    },
    watch: { // 监控路由跳转
      '$route' (to, from) {
        console.log(to.name);
        if (to.name === 'detail') {
          this.gotop();
        }
      }
    },
    data() {
      return {}
    },
    methods: {
      gotop() {
        // 每次路由跳转自动回到顶部
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
      }
    }
  }
</script>

<style scoped>
  nav {
    /*height: 70px;*/
    padding: 10px 0;
    background: #fff;
    /*border-bottom: 1px solid #efefef;*/
    /*color: #999;*/
  }
  .navbar-brand {
    color: #3a8ee6;
    font-size: 30px;
    font-family: "Droid Sans";
  }
  /*.container {*/
    /*padding: 15px;*/
  /*}*/
  .navbar-header, ul, li {
    cursor: pointer;
  }
  /*设置hover下拉而非点击下拉*/
  ul.nav li.dropdown:hover > ul.dropdown-menu {
    display: block;
  }

  /*手动改变头部导航栏的默认宽度*/
  @media (max-width: 100px) {
    .navbar-header {
      float: none;
    }
    .navbar-toggle {
      display: block;
    }
    .navbar-collapse {
      border-top: 1px solid transparent;
      box-shadow: inset 0 1px 0 rgba(255,255,255,0.1);
    }
    .navbar-collapse.collapse {
      display: none!important;
    }
    .navbar-nav {
      float: none!important;
      margin: 7.5px -15px;
    }
    .navbar-form {
      float: none!important;
      margin: 7.5px -15px;
    }
    .navbar-nav>li {
      float: none;
    }
    .navbar-nav>li>a {
      padding-top: 10px;
      padding-bottom: 10px;
    }
    .navbar-text {
      float: none;
      margin: 15px 0;
    }
    /* since 3.1.0 */
    .navbar-collapse.collapse.in {
      display: block!important;
    }
    .collapsing {
      overflow: hidden!important;
    }
  }
</style>
