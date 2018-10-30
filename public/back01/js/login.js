
$(function(){
  // 表单校验功能
  // 1-初始化校验表单
  $('#form').bootstrapValidator({
    // 1-指定不校验的类型(默认)
    exclude:[
      ':disabled',
      ':hidden',
      ':not(:visible)'
    ],
    // 2-指定校验图标 
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    // 3-指定校验字段
    fields: {
      username:{
        validators:{
          notEmpty:{
            message:'用户名不能为空',
          },
          stringLength:{
            min: 2,
            max: 6,
            message: '用户名必须为2-6字符',
          },
          callback: {
            message:'用户名不存在',
          },
        }
      },
      password:{
        validators:{
          notEmpty: {
            message:'密码不能为空',
          },
          stringLength:{
            min:6,
            max:12,
            message:'密码必须为6-12字符',
          },
          callback: {
            message: '密码输入错误',
          },
        }
      },
    }
  })
  // 登录功能
  // 当表单校验成功时, 会触发success.form.bv事件, 此时会提交表单, 
  //  这个时候, 通常我们需要禁止表单的自动提交, 使用ajax进行表单的提交
  $('#form').on('success.form.bv',function(e){
    e.preventDefault();
    console.log("阻止了默认提交");
    $.ajax({
      type:'post',
      datType:'json',
      url:'/employee/employeeLogin',
      data: $('#form').serialize(),
      success: function(info){
        console.log(info);
        if(info.success){
          location.href = 'index.html';
        }
        if(info.error === 1000){
          // 用户名不存在
          // 调用插件实例方法, 更新表单校验状态为失败
          // updateStatus 三个参数 校验字段/校验状态/校验提示信息
          $('#form').data('bootstrapValidator').updateStatus('username','INVALID','callback');
        }
        if(info.error === 1001){
          // 密码错误
          $('#form').data('bootstrapValidator').updateStatus('password','INVALID','callback');
        }
      }
    })
  })
  // 重置功能
  $('[type="reset"]').click(function(){
    // resetForm 有true 重置校验状态和内容
    //           没有true 只重置校验状态
    $('#form').data('bootstrapValidator').resetForm(true);
  })
})