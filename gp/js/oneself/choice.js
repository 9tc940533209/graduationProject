$(function(){
    // $.getQueryurl('id')
    var imgs = "./../img/loading.png"
    var id = JSON.parse($.cookie('cookie_info')).id
    $.DialogByZ.Loading(imgs)
    var status
    //调取数据
    $.get('/pijiob.php?id='+$.getQueryurl('id'),'json').then(res =>{
        status = res.data.status
        if(status == 1){
            $('.btn-success').hide()
            $('.btn-warning').hide()
            $('.glyphicon-star').show()
        }
        $('.name').text(res.data.name)
        $('.number').text(res.data.number+'人')
        $('.Specific_address').text(res.data.Specific_address)
        $('.begin_time').text(res.data.begin_time)
    })
    function getApplylis(){
        $.get('/query/getApplylist.php?id='+$.getQueryurl('id')+'&init='+id,'json').then(res => {
            if(res.code == 1){
                $.DialogByZ.Alert({Title: "提示", Content: res.message,BtnL:"确定",FunL:errorAlert})
                return
            }
            errorAlert()
            $('.yin').show()
            if(res.data.length == 0){
                $('.zanwu').show()
            }
            var html = template('applylist',{
                "items":res.data
            })
            document.querySelector(".applylist").innerHTML = html;
        })
    }
    getApplylis()


   var infor_id 
    //关闭弹出框
    function errorAlert(){
        $.DialogByZ.Close();
    }
    $('.applylist').on('click','span',function(){
        var target = $(this).attr('title')
        if(target == "查看详情"){
            console.log('查看')
        }else if(target == "通过"){
            op($(this).attr('id'),1)
        }else if(target == "未通过"){
            op($(this).attr('id'),0)
        }else if(target == "打分"){
            infor_id = $(this).attr('id')
           $('.xiuShang').show()
        }
    })
    //申请
    function op(apply_id,result){
        if(status == 1){
            $.DialogByZ.Alert({Title: "提示", Content: "当前任务已结束，不可操作",BtnL:"确定",FunL:errorAlert})
            return
        }
        $.DialogByZ.Loading(imgs)
        var data = {
            "id":$.getQueryurl('id'),
            "init": id,
            "apply_id":apply_id,
            "result":result
        }
        $.post('/setApplyResult.php','json',data).then(res => {
            errorAlert()
            if(res.code == 0){
                $.DialogByZ.Autofade({Content: "操作成功"})
                getApplylis()
            }else{
                $.DialogByZ.Alert({Title: "提示", Content: res.message,BtnL:"确定",FunL:errorAlert})
            }
            
        })
    }

    //关闭任务
    var type 
    $('.btn-success').on('click',function(){
        type = 0
        $.DialogByZ.Confirm({Title: "提示", Content: "确定关闭该兼职？",FunL:confirmL,FunR:errorAlert})
    })
    //删除任务
    $('.btn-warning').on('click',function(){
        type = 1
        $.DialogByZ.Confirm({Title: "提示", Content: "确定删除该兼职？",FunL:confirmL,FunR:errorAlert})
    })
    function confirmL(){
        $.DialogByZ.Loading(imgs)
        var data = {
            "id":$.getQueryurl('id'),
            "init":id,
            "type":type
        }
        $.post("/setTaskEnd.php","json",data).then(res=>{
            $.DialogByZ.Close();
            if(res.code == 0){
                if(type == 0){
                    var message = "任务完成！"
                }else{
                    var message = "删除任务成功！"
                }
                $.DialogByZ.Alert({Title: "提示", Content: message,BtnL:"确定",FunL:JumpAlert})
            }else{
                $.DialogByZ.Alert({Title: "提示", Content: res.message,BtnL:"确定",FunL:errorAlert})
            }
           
        })
        
    }
    function JumpAlert(){
        $.DialogByZ.Close();
        location.href="javascript:history.go(-1)";
    }


    //打分
    $('.xiuShang_content_head span:last-child').on('click',function(){
        $('.xiuShang').hide()
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
          list_id:$.getQueryurl('id'),
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
  
      function xiuAlert(){
        $.DialogByZ.Close();
        $('.xiuShang_content_head span:last-child').click()
      }
  
      $('.xiugai').on('click',function(){
        $('.xiuShang').show()
        $('#content').val(jian)
        $('#branch').val(ad)
      })
})