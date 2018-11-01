// ;(function(){
  var currentPage = 1;
  var pageSize = 5;
  // 1.渲染页面
  render();
  function render(){

    $.ajax({
      type: 'get',
      url: '/category/querySecondCategoryPaging',
      data: {
        page: currentPage,
        pageSize: pageSize
      },
      dataType: 'json',
      success: function(info){
        console.log(info);
        var htmlStr = template('secondTmp',info);
        $('tbody').html(htmlStr);
  
        // 分页标签
        $('#paginator').bootstrapPaginator({
          bootstrapMajorVersion: 3,
          currentPage: info.page,
          totalPages: Math.ceil(info.total/info.size),
          onPageClicked: function(a,b,c,page){
            currentPage = page;
            render();
          },
        })
      }
    });
  }

// 2.添加分类模态框
  $('#addBtn').click(function(){
    $('#addModal').modal('show');
    $.ajax({
      type: 'get',
      url: '/category/queryTopCategoryPaging',
      data: {
        page:currentPage,
        pageSize:pageSize
      },
      dataType: 'json',
      success: function(info){
        console.log(info);
        var htmlStr = template('dropdownTmp',info);
        $('.dropdown-menu').html(htmlStr);
      }
    })
  })
  
  // 3.给下拉菜单中的a注册点击事件,通过事件委托
  $('.dropdown-menu').on('click','a',function(){
    // console.log($(this).text());
    $('.dropdownText').text($(this).text());
    // 获取选择的一级分类的id 设置给隐藏域
    var id = $(this).data('id');
    // console.log(id);
    $('[name="categoryId"]').val(id);

    // 给下拉菜单设置表单校验成功状态
    $('#form').data('bootstrapValidator').updateStatus('categoryId','VALID');
  })

  // 4. 配置文件上传的插件
  $('#fileupload').fileupload({
    dataType: 'json',
    // 文件上传完成回来的 回调函数
    done: function(e,data){
      // 上传图片的地址
      console.log(data.result.picAddr);
      var picUrl = data.result.picAddr;
      $('#imgBox img').attr('src',picUrl);
      // 将图片地址赋值给隐藏域
      $('[name="brandLogo"]').val(picUrl);
      $('#form').data('bootstrapValidator').updateStatus('brandLogo','VALID');
    }
  })

  // 5. 表单校验
  $('#form').bootstrapValidator({
    excluded: [],
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    fields: {
      categoryId:{
        validators:{
          notEmpty:{
            message:'请选择一级分类'
          },
        }
      },
      brandName :{
        validators:{
          notEmpty:{
            message:'请输入二级分类'
          },
        }
      },
      brandLogo:{
        validators: {
          notEmpty: {
            message: '请选择图片'
          }
        }
      }
    }
  });

  // 6- 注册表单成功事件, 阻止默认的表单提交, 通过ajax进行提交
  $('#form').on('success.form.bv',function(e){
    e.preventDefault();
    $.ajax({
      type:'post',
      url: '/category/addSecondCategory',
      data: $('#form').serialize(),
      dataType: 'json',
      success: function(info){
        console.log(info);
        // 关闭模态框, 重新渲染第一页
        $('#addModal').modal('hide');
        currentPage = 1;
        render();


        // 重置表单的状态和内容
        $('#form').data('bootstrapValidator').resetForm(true);
        // 下拉菜单和图片选择不是表单元素, 需要手动重置
        $('.dropdownText').text('请选择一级分类');
        $('#imgBox img').attr('src','images/none.png');
      }
    })
  })



  // })