$(function(){
    var imgs = "./../img/loading.png"
    if($.cookie('cookie_info')){
      var infor = JSON.parse($.cookie('cookie_info'))
      var id = infor.id
      if(infor.type != 0){
        $.DialogByZ.Alert({Title: "提示", Content: '您已认证，不可修改信息',BtnL:"确定",FunL:backP})
        return
      }
    }else{
      $.DialogByZ.Alert({Title: "提示", Content: '请先登录',BtnL:"确定",FunL:back})
      return
    }
    function back(){
      location.href = './login.html'
    }
    function backP(){
      location.href = './personal.html'
    }
    //1商家，2学生
    var type = 2
    $('#student').on("click",function(){
        $('.student').show()
        $('.merchant').hide()
        type = 2
    })
    $('#merchant').on("click",function(){
        $('.student').hide()
        $('.merchant').show()
        type = 1
    })

    
    // formData.append('file', input.files[0]);
    var identity_card_z
    var identity_card_f
    var Industry
    var student_card

    $("#identity_card_z").on("change",function(){
        identity_card_z = document.getElementById('identity_card_z').files[0]
    })
    $("#identity_card_f").on("change",function(){
        identity_card_f = document.getElementById('identity_card_f').files[0]
    })
    $("#Industry").on("change",function(){
        Industry = document.getElementById('Industry').files[0]
    })
    $("#student_card").on("change",function(){
        student_card = document.getElementById('student_card').files[0]
    })

    //认证
    $('.btn-primary').on('click',function(){
        var formData = new FormData();
        if(type == 0){
            $.DialogByZ.Autofade({Content: "请选择认证类型"})
            return
        }
        // //身份证号
        var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
        if(reg.test($('#identity_num').val()) === false){
            $.DialogByZ.Autofade({Content: "请输入正确的身份证号"})
            return
        }
        if(identity_card_z == undefined){
            $.DialogByZ.Autofade({Content: "请上传身份证正面"})
            return
        }
        if(identity_card_f == undefined){
            $.DialogByZ.Autofade({Content: "请上传身份证反面"})
            return
        }
        
        formData.append('id', id);
        formData.append('type', type);
        formData.append('identity_num', $('#identity_num').val())
        formData.append('identity_card_z', identity_card_z);
        formData.append('identity_card_f', identity_card_f);
        
        if(type == 1){
            if($('#name').val() == ''){
                $.DialogByZ.Autofade({Content: "请输入商家名称"})
                return
            }
            if($('#address').val() == ''){
                $.DialogByZ.Autofade({Content: "请输入商家地址"})
                return
            }
            if(Industry == undefined){
                $.DialogByZ.Autofade({Content: "请上传工商营业执照"})
                return
            }
            formData.append('name', $('#name').val());
            formData.append('address', $('#address').val());
            formData.append('Industry', Industry);
            $.DialogByZ.Loading(imgs)
            submit(formData)
        }else{
            if($('#school').val() == ''){
                $.DialogByZ.Autofade({Content: "请输入学校名称"})
                return
            }
            if($('#major').val() == ''){
                $.DialogByZ.Autofade({Content: "请输入专业"})
                return
            }
            if($('#beginTime').val() == ''){
                $.DialogByZ.Autofade({Content: "请输入开始时间"})
                return
            }
            if($('#endTime').val() == ''){
                $.DialogByZ.Autofade({Content: "请输入结束时间"})
                return
            }
            if(student_card == undefined){
                $.DialogByZ.Autofade({Content: "请上传学生证照片"})
                return
            }
            formData.append('school', $('#school').val());
            formData.append('major', $('#major').val());
            formData.append('beginTime', $('#beginTime').val());
            formData.append('endTime', $('#endTime').val());
            formData.append('regular', $('input[name="regular"]:checked').val());
            formData.append('student_card', student_card);
            $.DialogByZ.Loading(imgs)
            submit(formData)
        }

    })
    //提交
    function submit(data){
        
        $.files("/authentication.php","json",data).then(res => {
          $.DialogByZ.Close();
          if(res.code == 0){
            $.DialogByZ.Alert({Title: "提示", Content: '提交认证信息成功',BtnL:"确定",FunL:backP})
          }else{
              $.DialogByZ.Alert({Title: "提示", Content: res.message,BtnL:"确定",FunL:errorAlert}) 
          }
        })
    }
    function errorAlert(){
      $.DialogByZ.Close();
    }
})