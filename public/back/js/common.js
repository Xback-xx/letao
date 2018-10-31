// 注册全局事件 进度条功能
// 开启进度条
// NProgress.start();
// setTimeout(function(){

//   NProgress.done();
// },2000);

// 注册全局事件 只要发送了ajax请求, 就开启进度条
$(document).ajaxStart(function(){
  NProgress.start();
});
$(document).ajaxComplete(function(){
  // 模拟网络环境
  setTimeout(function(){

    NProgress.done();
  },500);
});