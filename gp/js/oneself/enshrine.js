$(function(){
    var imgs = "./../img/loading.png"
    if($.cookie('cookie_info')){
        var id = JSON.parse($.cookie('cookie_info')).id
        render()
    }else{
        $.DialogByZ.Alert({Title: "提示", Content: '请先登录',BtnL:"确定",FunL:Immediate}) 
    }

    function render(){
        $.DialogByZ.Loading(imgs)
        $.get('/query/enshrine.php?id='+id,"json").then(res => {
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

    //点击删除收藏职位
    var collectionId
    $('.messagelist').on('click','a',function(){
        if($(this).attr('id')){
            collectionId = $(this).attr('id')
            $.DialogByZ.Confirm({Title: "提示", Content: "确定删除此收藏？",FunL:confirmL,FunR:Immediate})
        }
    })
    function confirmL(){
        $.DialogByZ.Loading(imgs)
        var le = {
            "id":id,
            "collectionId": collectionId
        }
        $.post("/query/enshrine.php","json",le).then(res => {
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