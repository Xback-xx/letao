// 表单验证
/*
 校验要求:
   *        (1) 用户名不能为空, 长度为2-6位
   *        (2) 密码不能为空, 长度为6-12位
*/
$(function(){
  // 初始化表单校验插件
  $('#form').bootstrapValidator({
    // 1- 指定不校验的类型 默认为':disabled',':hidden',':not(:visible)'
    excluded : [':disabled',':hidden',':not(:visible)'],
    // 2- 指定校验时的图标显示, 默认是bootstrap风格
    feedbackIcons : {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    // 3- 指定校验字段
    fields: {
      // 校验用户名
      username: {
        validators:{
          // 不能为空
          notEmpty: {
            message: '用户名不能为空'
          },
          // 长度3-6
          stringLength:{
            min: 3,
            max: 6,
            message: '用户名长度必须在3-6个字符之间'
          },
          callback : {
            message: '用户名不存在',
          }
        },

      },
      password: {
        validators: {
          // 不能为空
          notEmpty:{
            message: '密码不能为空',
          },
          stringLength: {
            min: 6,
            max: 12,
            message: '密码长度必须为6-12个字符',
          },
          callback : {
            message: '密码错误',
          }
        }
      },
    }
  })
  // 表单登录功能
  // 注册表单验证成功事件
  $('#form').on('success.form.bv',function(e){
    e.preventDefault();
    // 通过ajax进行提交
    $.ajax({
      type: 'post',
      url: "/employee/employeeLogin",
      data: $('#form').serialize(),
      dataType: 'json',
      success : function(info){
        console.log(info);
        if(info.success){
          location.href = "index.html";
        }
        if(info.error === 1000){
          // 用户名错误
          // 调用插件实例方法, 更新校验状态为失败
          // updateStatus
          // 参数1 : 校验字段
          // 参数2 : 校验状态 NOT_VALIDATED未校验
          //                 VALIDATING校验中
          //                 INVALID校验失败
          //                 VALID成功
          // 参数3 : 配置检验规则, 用于配置提示信息
          $('#form').data('bootstrapValidator').updateStatus('username','INVALID','callback');
        }
        if(info.error === 1001){
          $('#form').data('bootstrapValidator').updateStatus('password','INVALID','callback');
        }
      }
    })
  })
  
  // 重置功能
  $('[type="reset"]').click(function(){
    // 调用实例方法, 重置校验状态和内容
    // resetForm 传 ture, 内容和校验状态都重置
    //           不穿true, 只重置校验状态
    $('#form').data('bootstrapValidator').resetForm();
  })
})

