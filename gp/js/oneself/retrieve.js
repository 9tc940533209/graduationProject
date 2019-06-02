$(function() {
    var imgs = "./../img/loading.png"
    var reg = /^[A-Za-z0-9@.]+$/
    var reg_emil = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
	$('.login_input_deng input').on('focus',function(){
	  	$(this).css('border','1px solid #409EFF')
    })
    // 框验证  账户
    var one = false
    var two = false
    var three = false
	$('.login_input_deng input').eq(0).on('blur',function(){
        var vals = $(this).val()
        $(this).parent().next().children("span").hide()
		if (vals != '') {
			$(this).parent().next().children("span").eq(0).hide()
			if (reg_emil.test(vals) === false) {
                $(this).css('border','1px solid #ff6700').siblings().css('color','#ff6700').parent().next().children("span").eq(1).show()
                $('.login_land').css('opacity','0.5')
                $('.yan_btn').css('opacity','0.5').attr('disabled','false')
			} else {
                $(this).css('border','1px solid #ccc').siblings().css('color','#67C23A')
                one = true
                login_land()
                if ($('.yan_btn').val() == '获取验证码'){
                    $('.yan_btn').css('opacity','1').removeAttr('disabled')
                }
			}
		} else {
            $(this).css('border','1px solid #ff6700').siblings().css('color','#ff6700').parent().next().children("span").eq(0).show()
            $('.login_land').css('opacity','0.5')
            $('.yan_btn').css('opacity','0.5').attr('disabled','false')
        }
    })
    //  密码
	$('.password input').on('blur',function(){
        var vals = $(this).val()
        $(this).parent().next().children("span").hide()
		if (vals != '') {
			$(this).parent().next().children("span").eq(0).hide()
			if (reg.test(vals) === false) {
                $(this).css('border','1px solid #ff6700').siblings().css('color','#ff6700').parent().next().children("span").eq(1).show()
                $('.login_land').css('opacity','0.5')
			} else {
                $(this).css('border','1px solid #ccc').siblings().css('color','#67C23A')
                two = true
                login_land()
			}
		} else {
            $(this).css('border','1px solid #ff6700').siblings().css('color','#ff6700').parent().next().children("span").eq(0).show()
            $('.login_land').css('opacity','0.5')
        }
    })
    // 验证码
	$('.yan input').on('blur',function(){
        var vals = $(this).val()
        $(this).parent().next().children("span").hide()
		if (vals != '') {
			$(this).parent().next().children("span").eq(0).hide()
			if (reg.test(vals) === false) {
                $(this).css('border','1px solid #ff6700').siblings().css('color','#ff6700').parent().next().children("span").eq(1).show()
                $('.login_land').css('opacity','0.5')
			} else {
                $(this).css('border','1px solid #ccc').siblings().css('color','#67C23A')
                three = true
                login_land()
			}
		} else {
            $(this).css('border','1px solid #ff6700').siblings().css('color','#ff6700').parent().next().children("span").eq(0).show()
            $('.login_land').css('opacity','0.5')
        }
    })
    // 发送验证码
    $('.yan_btn').on('click',function(){
        $.DialogByZ.Loading(imgs) 
        $.post('/retrieve.php','json',{
            type: 0,
            email: $('.login_input_deng input').eq(0).val()
        }).then(res=>{
            $.DialogByZ.Close();
            if(res.code == 0){
                $.DialogByZ.Alert({Title: "提示", Content: '验证码已发送此邮箱！',BtnL:"确定",FunL:errorAlert})
                $('.yan_btn').css('opacity','0.5').attr('disabled','false')
                var i = 60
                var times = setInterval(function(){
                    i--
                    $('.yan_btn').val(i+'秒')
                    if(i == 0){
                        clearInterval(times)
                        $('.yan_btn').val("获取验证码")
                        $('.yan_btn').css('opacity','1').removeAttr('disabled')
                    }
                },1000)
            }else{
                $.DialogByZ.Alert({Title: "提示", Content: res.message,BtnL:"确定",FunL:errorAlert}) 
            }
        })
    })
    // 确定按钮颜色
    function login_land(){
        if(one && two && three) {
            $('.login_land').css('opacity','1')
        }
    }
    $('.login_land').on('click',function(){
        console.log($(this).css('opacity'))
        if($(this).css('opacity') == 1) {
            console.log('zzzz')
            $.DialogByZ.Loading(imgs) 
            $.post('/retrieve.php','json',{
                type: 1,
                email: $('.login_input_deng input').eq(0).val(),
                code: $('#code').val(),
                password: hex_md5($('#password').val())
            }).then(res=>{
                $.DialogByZ.Close();
                if(res.code == 0){
                    $.DialogByZ.Alert({Title: "提示", Content: "修改密码成功，请登录",BtnL:"确定",FunL:Alerts}) 
                }else{
                    $.DialogByZ.Alert({Title: "提示", Content: res.message,BtnL:"确定",FunL:errorAlert}) 
                }
            })
        } else {
            $('.login_input_deng input').blur()
        }
    })

    //关闭弹出框
    function errorAlert(){
        $.DialogByZ.Close();
    }
    function Alerts(){
        location.href = './login.html'
    }

})