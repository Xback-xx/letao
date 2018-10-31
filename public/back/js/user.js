$(function(){
  // 一进入页面, 就发送ajax请求 获取用户列表
  $.ajax({
    type: 'get',
    url: '/user/queryUser',
    data: {
      page:1,
      pageSize: 5
    },
    dataType: 'json',
    success: function(info){
      // console.log(info);
      var htmlStr = template('tmp',info);
      $('tbody').html(htmlStr);
    }
  })
})