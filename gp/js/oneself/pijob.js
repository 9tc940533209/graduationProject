$(function(){
    var imgs = "./../img/loading.png"
    $.DialogByZ.Loading(imgs) 
    var type = 2
    var data
    var inId
    if($.cookie('cookie_info')){
        inId = JSON.parse($.cookie('cookie_info')).id
    }else{
        inId = 0
    }
    $('.collection').on('click',function(){
        if($.cookie('cookie_info') == undefined){
            $.DialogByZ.Autofade({Content: "请先登录哦"})
        }else{
            var spans = $('.collection span').eq(0)
            if (spans.attr("index") == 1) {
                spans.hide().attr("index","2").next().show().animate({fontSize: 20},500).animate({fontSize: 14},500)
                $('.collections').html('已收藏')
                type = 2
                shou(data.id,inId)
            } else {
                spans.show().attr("index","1").animate({fontSize: 20},500).animate({fontSize: 14},500).next().hide()
                $('.collections').html('收藏职位')
                type = 1
                shou(data.id,inId)
            }
        }

    })
    $.get('/pijiob.php?id='+$.getQueryurl('id')+'&inId='+inId,'json').then(res => {
        console.log(res)
        data = res.data
        $('.name').html(data.name)
        $('.release_name').html(data.release_name)
        $('.address').html('地址：'+data.address)
        if(data.release_type == 1){
            $('.release_type').html('商家')
        }else{
            $('.release_type').html('学生')
        }
        var times = data.begin_time+'&nbsp;&nbsp;-&nbsp;&nbsp;'+data.end_time
        $("#head_img").attr("src",$.dataUrls()+data.release_head_img)
        $('.times').html(times)
        $('.describe').html(data.describe)
        $('.requirement').html(data.requirement)
        var Specific_address = data.address_city+'&nbsp;&nbsp;&nbsp;'+data.address_name+'<br>'+data.Specific_address
        $('.Specific_address').html(Specific_address)

        var num = Math.ceil(data.release_praise/20)
        var praise = ''
        for(var i = 0;i<num;i++){
            praise += '<span class="glyphicon glyphicon-heart" style="margin-left:2px;"></span>'
        }
        $('.release_praise').html(praise)

        //收藏
        if(data.collection){
            $('.collection span').eq(0).hide().attr("index","2").next().show().animate({fontSize: 20},500).animate({fontSize: 14},500)
            $('.collections').html('已收藏')
            type = 1
        }
        
        $('.pi_merchant_head').attr("href","./publisher.html?id="+data.release_id)
        if(data.status == 1){
            $('#pi_Apply').html('已结束').css('background-color',"#ccc").unbind()  
        }

        errorAlert()
    })
 

    function shou(taskId,inforId){
        var le = {
            type: type,
            taskId:taskId,
            inforId:inforId,
        }
        $.post('/collection.php','json',le).then(res =>{
            console.log(res)
        })
    }


    //申请
    $('#pi_Apply').on('click',function(){
        if($.cookie('cookie_info')){
            $.DialogByZ.Confirm({Title: "提示", Content: "确认申请该任务?",FunL:confirmL,FunR:errorAlert})
        }else{
            $.DialogByZ.Alert({Title: "提示", Content: "请先登录，谢谢",BtnL:"确定",FunL:errorAlert}) 
        }
       
    })
    //关闭弹出框
    function errorAlert(){
        $.DialogByZ.Close();
    }
    function confirmL(){
        $.DialogByZ.Loading(imgs) 
        var le = {
            taskId:data.id,
            inforId:inId,
        }
        $.post('/apply.php','json',le).then(res =>{
            errorAlert()
            if(res.code == 0){    
                $.DialogByZ.Alert({Title: "提示", Content: "恭喜，申请成功，请等待雇主联系",BtnL:"确定",FunL:errorAlert}) 
            }else{
                $.DialogByZ.Alert({Title: "提示", Content: res.message,BtnL:"确定",FunL:errorAlert}) 
            }
        })
    }
})