import Vue from 'vue'

// 获取当前页面名称
Vue.prototype.goTag = function(value){
  $(value+'_a').addClass("active");
  $(value+'_a').siblings().removeClass("active");
  $("html, body").animate({
    scrollTop: $(value).offset().top - 60}, {duration: 400,easing: "swing"});
};
