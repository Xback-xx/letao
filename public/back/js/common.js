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

// 侧边栏
$(function(){
  $('.lt_aside .nav ul .category').click(function(){
    $(this).next().stop().slideToggle();
  })
});

// 点击topbar的按钮 做动画
// 1- 菜单的显示和隐藏
$('.lt_main .lt_topbar .menu').click(function(){
  $('.lt_aside').toggleClass('hidemenu');
  $('.lt_main').toggleClass('hidemenu');
});
// 2- 退出按钮
$('.lt_main .lt_topbar .logout').click(function(){
  // 弹出模态框
  $('#logoutModal').modal('show');
  // location.href = 'login.html';
});
$('#logoutBtn').click(function(){
  // 1)用户端(浏览器端),用户自己清除浏览器缓存(清空了cookie)
  //   本质上会将会话标识sessionId也清除了
  // 2)前端通过发送ajax退出请求, 让后台销毁当前用户的登录状态

  $.ajax({
    type: 'get',
    url: '/employee/employeeLogout',
    dataType: 'json',
    success: function(info){
      console.log(info);
      if(info.success){
        location.href = 'login.html';
      }
    }
  })

})

