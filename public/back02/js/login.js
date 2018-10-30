$(function(){
  // 1- 表单校验
  $('#form').bootstrapValidator({
    // 1)设置不要校验的状态(默认)
    excluded: [':disabled', ':hidden', ':not(:visible)'],
    // 2)设置校验图标
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    // 3)表单校验
    fields:{
      username:{
        validators: {
          notEmpty:{
            message:'用户名不能为空',
          },
          stringLength: {
            min: 2,
            max: 6,
            message: '用户名必须是2-6位',
          },
          callback:{
            message: '用户名不存在',
          }
        }
      },
      password:{
        validators: {
          notEmpty:{
            message:'密码不能为空',
          },
          stringLength: {
            min: 6,
            max: 12,
            message: '密码长度必须是6-12位'
          },
          callback: {
            message:'密码错误'
          }
        }
      },
    }
  
  })
  // 2- 登录功能
  $('#form').on('success.form.bv',function(e){
    e.preventDefault();
    console.log('阻止默认行为');
    $.ajax({
      type:'post',
      url: '/employee/employeeLogin',
      data: $('#form').serialize(),
      dataType: 'json',
      success:function(info){
        console.log(info);
        if(info.success){
          location.href = 'index.html';
        }
        if(info.error === 1000){
          // 用户名不存在
          // 要重置表单校验的状态
          $('#form').data('bootstrapValidator').updateStatus('username','INVALID','callback');
        }
        if(info.error === 1001){
          $('#form').data('bootstrapValidator').updateStatus('password','INVALID','callback');
        }
      }
    })
  })
  // 3- 重置功能
  $('[type="reset"]').click(function(){
    $('#form').data('bootstrapValidator').resetForm(true);
  })
})