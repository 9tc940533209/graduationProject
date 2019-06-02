$(function(){
    var imgs = "./../img/loading.png"
    if($.cookie('cookie_info')){
        render()
    }else{
        $.DialogByZ.Alert({Title: "提示", Content: '请先登录',BtnL:"确定",FunL:Immediate}) 
    }

    function render(){
        $.DialogByZ.Loading(imgs)
        id = JSON.parse($.cookie('cookie_info')).id
        $.get('/query/notification.php?id='+id,"json").then(res => {
            $.DialogByZ.Close();
            if(res.data.length == 0){
                $('.zanwu').show()
            }
            var html = template('messagelist',{
                "items":res.data
            })
            document.querySelector(".messagelist").innerHTML = html;
        })
    }

    //点击删除信息
    var messgaeId
    $('.messagelist').on('click','a',function(){
        if($(this).attr('id')){
            messgaeId = $(this).attr('id')
            $.DialogByZ.Confirm({Title: "提示", Content: "确定删除此消息？",FunL:confirmL,FunR:Immediate})
        }
    })
    function confirmL(){
        $.DialogByZ.Loading(imgs)
        var le = {
            "messgaeId": messgaeId
        }
        $.post("/query/notification.php","json",le).then(res => {
            $.DialogByZ.Close();
            if(res.code == 0){
                $.DialogByZ.Alert({Title: "提示", Content: "删除成功",BtnL:"确定",FunL:Immediate})
                render()
            }else{
                $.DialogByZ.Alert({Title: "提示", Content: res.message,BtnL:"确定",FunL:Immediate}) 
            }
            console.log(res)
        })
    }
    function Immediate(){
        $.DialogByZ.Close();
    }
})