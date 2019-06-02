$(function(){
    var imgs = "./../img/loading.png"
    var id
    if($.cookie('cookie_info') !== undefined){
        var data = JSON.parse($.cookie('cookie_info'))
        id = data.id
    }else{
        $.DialogByZ.Alert({Title: "提示", Content: '请先登录账号',BtnL:"确定",FunL:errorAlert}) 
    }
    $(".btn-primary").on('click',function(){
        if($('#name').val() == ''){
            $.DialogByZ.Autofade({Content: "请输入公司名称"});
            return
        }
        if($('#begin_time').val() == ''){
            $.DialogByZ.Autofade({Content: "请选择开始时间"});
            return
        }
        if($('#end_time').val() == ''){
            $.DialogByZ.Autofade({Content: "请结束时间"});
            return
        }
        if($('#content').val() == ''){
            $.DialogByZ.Autofade({Content: "请输入工作内容"});
            return
        }
        if(new Date($('#end_time').val())-new Date($('#begin_time').val()) <= 0){
            $.DialogByZ.Autofade({Content: "结束时间不能小于开始时间"});
            return
        }
        $.DialogByZ.Loading(imgs)
        $.get("/workhistory.php?id="+id+"&"+$('form').serialize(),"json").then(res => {
            $.DialogByZ.Close();
            if(res.code == 0){
                $.DialogByZ.Alert({Title: "提示", Content: '保存数据成功',BtnL:"确定",FunL:Alerts}) 
            }else{
                $.DialogByZ.Alert({Title: "提示", Content: res.message,BtnL:"确定",FunL:errorAlert}) 
            }
        })
    })
    //修改成功
    function Alerts(){
        $.DialogByZ.Close();
        location.href = './personal.html'
    }

    $('.btn-default').on('click',function(){
      location.href = "personal.html"
    })
    //返回
    $('.btn-default').on('click',function(){
        location.href = "./personal.html"
    })
})