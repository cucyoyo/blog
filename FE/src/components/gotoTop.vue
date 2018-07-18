<template>
  <div>
    <div id="gotop" @click="gotop" v-show="topShow">
      <span class="glyphicon glyphicon-arrow-up"></span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "NotFound",
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

<style scoped>
  #gotop {
    background-color: #dddddd;
    border-radius: 3px;
    cursor: pointer;
    position: fixed;
    right: 50px;
    bottom: 50px;
    padding: 5px;
    text-align: center;
    /*display: none;*/
  }
  #gotop:hover {
    background-color: #9d9d9d;
  }
  #gotop .glyphicon{
    color: #fff;
    font-size: 20px;
  }
</style>
