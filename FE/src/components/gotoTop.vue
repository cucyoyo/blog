<template>
  <div>
    <div id="gotop" @click="gotop" v-show="topShow">
      <!--<span class="glyphicon glyphicon-arrow-up"></span>-->
      <span><i class="iconfont icon-xuanfuceng-fanhuidingbu-icon"></i></span>
      <!--lasdfj-->
    </div>
  </div>
</template>

<script>
  export default {
    name: "gotoTop",
    mounted() {
      this.$nextTick(function () {
        window.addEventListener('scroll', this.needToTop);  //滚动事件监听
      });
    },
    data() {
      return {
        topShow: false,
      }
    },
    methods: {
      gotop() {
        $('html, body').animate({scrollTop:0}, 400);
      },
      needToTop: function() {
        let curHeight = document.documentElement.scrollTop || document.body.scrollTop;
        let viewHeight = document.documentElement.clientHeight;
        this.topShow = (curHeight > viewHeight + 50);
      }
    }
  }
</script>

<style lang="less" scoped>
  #gotop {
    cursor: pointer;
    position: fixed;
    right: 40px;
    bottom: 80px;
    span {
      .iconfont {
        font-size: 40px;
        color: #9d9d9d;
      }
      .iconfont:hover {
        color: #000000;
        /*color: #3a8ee6;*/
      }
    }
  }

</style>
