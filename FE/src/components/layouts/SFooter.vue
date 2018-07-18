<template>
  <div class="footer">
      <p class="footer_p">© 2018 cucyoyo. All rights reserved.
        (网站前端样式参考 <a href="http://www.vicchen.me/">Vic Chen的博客</a>)
      </p>
      <!--<p class="footer_p">一个技术渣渣</p>-->
  </div>
</template>

<script>
  export default {
    name: "sfooter"
  }
</script>

<style scoped>
  .footer {
    position: relative;
    width: 100%;
    background: #222;
    z-index: 100;
    line-height: 15px;
    font-size: 15px;
    color: #fff;
    padding: 15px;
  }
  .footer a{
    text-decoration: none;
    color: #3a8ee6;
  }
  .footer_p {
    text-align: center;
    font-family:consolas;
  }
</style>
