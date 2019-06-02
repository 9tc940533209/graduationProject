$(function(){
    if($.cookie('cookie_info')){
        var id = JSON.parse($.cookie('cookie_info')).id
        var url = $.dataUrls()+JSON.parse($.cookie('cookie_info')).head_img
        $('#headimg').prop('src',url)
    }else{
        $.DialogByZ.Alert({Title: "提示", Content: '请先登录',BtnL:"确定",FunL:back})
        return
    }
    function back(){
      location.href="./login.html"
    }
    var imgs = "./../img/loading.png"
    $.DialogByZ.Loading(imgs)
    var ad
    var jian
    //----------调取数据------------
    $.get('/query/personalData.php?id='+id,'json').then(res=>{
        $.DialogByZ.Close();
        // console.log(res)
        var information = res.data.information //用户基本信息
        var explain = res.data.explain //说明
        var at = res.data.at //认证信息
        var experience = res.data.experience //工作简历，只有学生有

        //公共
        $('.username').text(information.name)
        $('.sex').text(information.sex)
        $('.age').text(information.age+'岁')
        $('.bian').attr('href','editpersonal.html')


        if(information.phone == null){
            $('.phone').text('暂无数据')
        }else{
            $('.phone').text(information.phone)
        }

        if(information.email == null){
            $('.email').text('暂无数据')
        }else{
            $('.email').text(information.email)
        }
        
        if(information.praise == null){
            $('.per_statistics').hide()
        }else{
            $('.per_statistics').show()
            $('.praise').text(information.praise+"%")
        }
        
        $('.zong').text(information.zong.length)

        //类型
        if(information.type == 0){
            $('.type').text('未认证')
            $('.ident').show()
            $('.per_third_title').text('自我评价')
            if(explain.evaluate == null){
                $('.per_third_content').text('这个人很懒，什么都没有留下')
            }
        }else if(information.type == 1){
            $('.type').text('商家')
            $('.merchant').show()
            $('.gong').hide()
            $('.merchantName').text(at.name)
            $('.address').text(at.address)
            $('.createTime').text(at.createTime)
            $('.per_third_title').text('商家简介')
            if(explain.Business_brief == ''){
              $('.bianji').show()
            }else{
              jian = explain.Business_brief
              ad = explain.Business_address
              $('.per_third_content').text(explain.Business_brief)
              $('.per_third_address').text("具体地址："+explain.Business_address)
              $('.xiugai').show()
            }
           
            $('.yifa').show()
        }else if(information.type == 2){
            $('.type').text('学生')
            $('.student').show()
            $('.yifa').show()
            $('.school').text(at.school)
            $('.major').text(at.major)
            $('.regular').text(at.regular)
            $('.time').text(at.beginTime+" - "+at.endTime)
            $('.per_third_title').text('自我评价')
            $('.per_third_content').text(explain.evaluate)
            if(explain.evaluate == null){
                $('.per_third_content').text('这个人很懒，什么都没有留下')
            }
            if(experience.length == 0){
                $('.works_zan').show()
            }else{
                $('.works_zan').hide()
                var html = template('experiencelist',{
                    "items":experience
                })
                document.querySelector(".per_fourth_experience").innerHTML = html;
            }

            $('.apply').show()
        }
        
    })

    let le = {
        "id":id,
        "size": 1000,
        "page": 1,
    }
    $.post('/publisher.php','json',le).then(res => {
        var html = template('tasklist',{
            "items":res.data.data
        })
        if(res.data.data.length == 0){
          $('.fabu').show()
        }
        document.querySelector(".tasklist").innerHTML = html;
    })

    $.post('/query/getUntask.php','json',{
        "id":id
    }).then(res =>{
        var htmls = template('applylist',{
            "item":res.data
        })
        document.querySelector(".applyList").innerHTML = htmls;
    })

    //更换头像
    $('.touxiang>img').on('click',function(){
        $.DialogByZ.Confirm({Title: "提示", Content: "确定更换头像？",FunL:confirmL,FunR:Immediate})
    })
    function confirmL(){
        $.DialogByZ.Close();
        $(".tailoring-container").toggle();
    }
    function Immediate(){
        $.DialogByZ.Close();
    }

    //弹出图片裁剪框
    // $("#replaceImg").on("click",function () {
    //     $(".tailoring-container").toggle();
    // });
    //图像上传
    $('#chooseImg').on("change",function(){
        file = document.getElementById('chooseImg')
        if (!file.files || !file.files[0]){
            return;
        }
        var reader = new FileReader();
        reader.onload = function (evt) {
            var replaceSrc = evt.target.result;
            //更换cropper的图片
            $('#tailoringImg').cropper('replace', replaceSrc,false);//默认false，适应高度，不失真
        }
        reader.readAsDataURL(file.files[0]);
    })
    //cropper图片裁剪
    $('#tailoringImg').cropper({
        aspectRatio: 1/1,//默认比例
        preview: '.previewImg',//预览视图
        guides: false,  //裁剪框的虚线(九宫格)
        autoCropArea: 0.5,  //0-1之间的数值，定义自动剪裁区域的大小，默认0.8
        movable: false, //是否允许移动图片
        dragCrop: true,  //是否允许移除当前的剪裁框，并通过拖动来新建一个剪裁框区域
        movable: true,  //是否允许移动剪裁框
        resizable: true,  //是否允许改变裁剪框的大小
        zoomable: false,  //是否允许缩放图片大小
        mouseWheelZoom: false,  //是否允许通过鼠标滚轮来缩放图片
        touchDragZoom: true,  //是否允许通过触摸移动来缩放图片
        rotatable: true,  //是否允许旋转图片
        crop: function(e) {
            // 输出结果数据裁剪图像。
        }
    });
    //旋转
    $(".cropper-rotate-btn").on("click",function () {
        $('#tailoringImg').cropper("rotate", 45);
    });
    //复位
    $(".cropper-reset-btn").on("click",function () {
        $('#tailoringImg').cropper("reset");
    });
    //换向
    var flagX = true;
    $(".cropper-scaleX-btn").on("click",function () {
        if(flagX){
            $('#tailoringImg').cropper("scaleX", -1);
            flagX = false;
        }else{
            $('#tailoringImg').cropper("scaleX", 1);
            flagX = true;
        }
        flagX != flagX;
    });
    
    //裁剪后的处理
    $("#sureCut").on("click",function () {
        if ($("#tailoringImg").attr("src") == null ){
            return false;
        }else{
            $.DialogByZ.Loading(imgs)
            var cas = $('#tailoringImg').cropper('getCroppedCanvas');//获取被裁剪后的canvas
            var base64url = cas.toDataURL('image/png'); //转换为base64地址形式

            var datas = {
                "id":id,
                "file":base64url
            }
            $.post("/headPortrait.php","json",datas).then(res => {
                $.DialogByZ.Close();
                if(res.code == 0){
                    $("#headimg").prop("src",base64url);//显示为图片的形式
                    var value = JSON.stringify(res.data)
                    $.cookie('cookie_info', value, { expires: 2, path: '/' })
                    $.DialogByZ.Alert({Title: "提示", Content: '修改头像成功',BtnL:"确定",FunL:errorAlert})
                    //关闭裁剪框
                    closeTailor();
                }else{
                    $.DialogByZ.Alert({Title: "提示", Content: res.message,BtnL:"确定",FunL:errorAlert}) 
                }
            })
        }
    });
    
    $('.close-tailoring').on('click',function(){
        closeTailor()
    })
    $('.black-cloth').on('click',function(){
        closeTailor()
    })
    //关闭裁剪框
    function closeTailor() {
        $(".tailoring-container").toggle();
    }

    function convertCanvasToImage(canvas) {
        var image = new Image();
        image.src = canvas.toDataURL("image/png");
        return image;
    }
    function errorAlert(){
        $.DialogByZ.Close();
    }


    //商家简介修改
    $('.shang span:last-child').on('click',function(){
      $('.shangxiu').hide()
      $('#Business_brief').val('')
      $('#Business_address').val('')
    })
    $('.bianji').on('click',function(){
      $('.shangxiu').show()
    })
    $('.shangBtn').on('click',function(){
      if($('#Business_address').val() == ''){
        $.DialogByZ.Autofade({Content: "请输入商家地址"})
        return
      }
      if($('#Business_brief').val() == ''){
        $.DialogByZ.Autofade({Content: "请输入商家简介"})
        return
      }
      $.DialogByZ.Loading(imgs)
      var data = {
        id:id,
        Business_address:$('#Business_address').val(),
        Business_brief:$('#Business_brief').val()
      }
      $.post('/query/setShang.php',"json",data).then(res => {
        $.DialogByZ.Close();
        if(res.code == 0){
            $.DialogByZ.Alert({Title: "提示", Content: '修改简介成功',BtnL:"确定",FunL:xiuAlert})
        }else{
            $.DialogByZ.Alert({Title: "提示", Content: res.message,BtnL:"确定",FunL:errorAlert}) 
        }
      })
    })

    function xiuAlert(){
      $.DialogByZ.Close();
      $('.shang span:last-child').click()
      location.href = "personal.html"
    }

    $('.xiugai').on('click',function(){
      $('.shangxiu').show()
      $('#Business_brief').val(jian)
      $('#Business_address').val(ad)
    })


    var list_id
    var infor_id
    var url
    $('.applyList').on("click","a",function(e){
        if($(this).attr('result') == 1){
            e.preventDefault();
            $('.fenxiu').show()
            list_id = $(this).attr('id')
            infor_id = $(this).attr('releaseid')
            url = $(this).attr('href')
        }
    })
    $('.looks').on('click',function(){
        location.href = url
    })
    //打分
    $('.fen span:last-child').on('click',function(){
       $('.fenxiu').hide()
       $('#content').val('')
       $('#branch').val('')
     })
     $('.baocun').on('click',function(){
       if($('#branch').val() == ''){
         $.DialogByZ.Autofade({Content: "请输入分数"})
         return
       }
       if($('#content').val() == ''){
         $.DialogByZ.Autofade({Content: "请输入评价"})
         return
       }
       if($('#branch').val()/1 > 100 || $('#branch').val()/1 < 0){
           $.DialogByZ.Autofade({Content: "分数只能在0~100内哦"})
           return
       }
       $.DialogByZ.Loading(imgs)
       var data = {
         list_id:list_id,
         person_id:id,
         infor_id:infor_id,
         branch:Math.ceil($('#branch').val()),
         content:$('#content').val()
       }
       $.post('/setScoring.php',"json",data).then(res => {
         console.log(res)
         $.DialogByZ.Close();
         if(res.code == 0){
             $.DialogByZ.Alert({Title: "提示", Content: '打分成功',BtnL:"确定",FunL:xiuAlert})
         }else{
             $.DialogByZ.Alert({Title: "提示", Content: res.message,BtnL:"确定",FunL:errorAlert}) 
         }
       })
     })

    //跳转工作经验
    $('.works').on('click',function(){
        location.href = './workhistory.html'    
    })
})