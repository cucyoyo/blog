import Vue from 'vue'

// 获取当前页面名称
Vue.prototype.goTag = function(value){
  $(value+'_a').addClass("active");
  $(value+'_a').siblings().removeClass("active");
  $("html, body").animate({
    scrollTop: $(value).offset().top - 60}, {duration: 400,easing: "swing"});
};
Vue.prototype.setImgurl = function (img_url) {
  return this.serverIP  + img_url + '?t=' + Math.random();
};
Vue.prototype.tagLink = function(tag) {
  this.$router.push({name: 'index', params: {tag: tag}})
};
Vue.prototype.toDetail = function(id) {
  // let postStr = JSON.stringify(post);
  // window.localStorage.setItem('post', postStr);
  this.$router.push({ name: 'detail', params:{id: id}});
};

