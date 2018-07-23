<template>
  <div id="app" style="height: 100%">
    <sHeader></sHeader>
    <div class="content">
      <div class="row">
        <div class="col-sm-12 col-md-9">
          <router-view />
        </div>
        <sideBar class="visible-lg visible-md col-md-3"></sideBar>
      </div>


    </div>
    <gotoTop></gotoTop>
    <sFooter></sFooter>
  </div>
</template>

<script>
import sHeader from "./components/layouts/SHeader"
import sFooter from "./components/layouts/SFooter"
import sideBar from "./components/layouts/SideBar"
import gotoTop from "./components/gotoTop"
export default {
  name: 'App',
  components: {
    sHeader,sFooter,sideBar,gotoTop
  },
  mounted() {
  },

}
</script>

<style lang="less">
#app {
  /*font-size: 14px;*/
  min-height: 100%;
  font-size: 14px;
  .content {
    background: #f9f9f9;
    min-height: calc(100% - 70px);
    /*margin-bottom: 40px;*/
    padding: 40px 80px 20px;
  }

}
</style>


