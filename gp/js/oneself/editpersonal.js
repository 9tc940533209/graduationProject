$(function(){
    var reg_emil = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
    var imgs = "./../img/loading.png"
    var id
    if($.cookie('cookie_info') !== undefined){
        var data = JSON.parse($.cookie('cookie_info'))
        id = data.id
        $('#name').val(data.name)
        $('#age').val(data.age)
        $('#phone').val(data.phone)
        $('#email').val(data.email)
        if(data.sex == "男"){
            $("#nan").prop("checked",true)
        }else{
            $("#nv").prop("checked",true)
        }
        $('#evaluate').val(data.evaluate)
        // $('input[name="sex"]:checked').val(); 
    }else{
        console.log('没有cookie')
        $.DialogByZ.Alert({Title: "提示", Content: '请先登录账号',BtnL:"确定",FunL:errorAlert}) 
    }
    //关闭弹出框
    function errorAlert(){
        $.DialogByZ.Close();
    }
    // 
    $(".btn-primary").on("click",function(){
        if(!(/^1[34578]\d{9}$/.test($('#phone').val()))){ 
            $.DialogByZ.Autofade({Content: "请输入正确手机号"}) 
            return false; 
        }
        if (reg_emil.test( $('#email').val()) === false) {
            $.DialogByZ.Autofade({Content: "请输入正确邮箱"})
            return
        }
        $.DialogByZ.Loading(imgs)
        $.get("/editpersonal.php?id="+id+"&"+$('form').serialize(),"json").then(res => {
            $.DialogByZ.Close();
            if(res.code == 0){
                var value = JSON.stringify(res.data)
                $.cookie('cookie_info', value, { expires: 2, path: '/' })
                $.DialogByZ.Alert({Title: "提示", Content: '修改资料成功',BtnL:"确定",FunL:Alerts}) 
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
})