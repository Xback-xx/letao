$(function(){
  var currentPage = 1;
  var pageSize = 5;
  var currentId;
  var isDelete;
  // 一进入页面, 就发送ajax请求 获取用户列表
  render();
  // 封装render函数
  function render(){
    $.ajax({
      type: 'get',
      url: '/user/queryUser',
      data: {
        page: currentPage,
        pageSize: pageSize
      },
      dataType: 'json',
      success: function(info){
        console.log(info);
        var htmlStr = template('tmp',info);
        $('tbody').html(htmlStr);
  
        // 分页插件
        $('#paginator').bootstrapPaginator({
          bootstrapMajorVersion: 3,  //版本号
          currentPage: info.page,
          totalPages: Math.ceil(info.total/info.size),
          onPageClicked: function(a,b,c,page){
            // console.log(page);
            currentPage = page;
            render();
          }
        })
      }
    })
  }


  // 禁用启用按钮
  // 批量注册事件--> 用事件委托
  $('tbody').on('click','button',function(){
    $('#userModal').modal('show');
    // 获取当前点击的按钮对应数据的id值
    console.log($(this).parent());
    currentId = $(this).parent().data('id');
    isDelete = $(this).hasClass('btn-danger') ? 0 : 1;
    // console.log(isDelete);
    $('#submitBtn').click(function(){
      // 关闭模态框 改变状态和按钮
      $.ajax({
        type: 'post',
        url : '/user/updateUser',
        data: {
          id: currentId,
          isDelete: isDelete,
        },
        dataType: 'json',
        success: function(info){
          // console.log(info);
          $('#userModal').modal('hide');
          render();
        }
      })
    })
  
  })


});

