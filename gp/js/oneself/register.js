$(function() {
	var reg = /^[A-Za-z0-9@.]+$/
	$('.register_input_deng input').on('focus',function(){
	  	$(this).css('border','1px solid #409EFF')
    })
    // 登录框验证  账户
    var one = false
    var two = false
	$('.register_input_deng input').eq(0).on('blur',function(){
        var vals = $(this).val()
        $(this).parent().next().children("span").hide()
		if (vals != '') {
			$(this).parent().next().children("span").eq(0).hide()
			if (reg.test(vals) === false) {
                $(this).css('border','1px solid #ff6700').siblings().css('color','#ff6700').parent().next().children("span").eq(1).show()
                $('.register_land').css('opacity','0.5')
			} else {
                $(this).css('border','1px solid #ccc').siblings().css('color','#67C23A')
                one = true
                register_land()
			}
		} else {
            $(this).css('border','1px solid #ff6700').siblings().css('color','#ff6700').parent().next().children("span").eq(0).show()
            $('.register_land').css('opacity','0.5')
        }
    })
    // 登录框验证  密码
	$('.register_input_deng input').eq(1).on('blur',function(){
        var vals = $(this).val()
        $(this).parent().next().children("span").hide()
		if (vals != '') {
			$(this).parent().next().children("span").eq(0).hide()
			if (reg.test(vals) === false) {
                $(this).css('border','1px solid #ff6700').siblings().css('color','#ff6700').parent().next().children("span").eq(1).show()
                $('.register_land').css('opacity','0.5')
			} else {
                $(this).css('border','1px solid #ccc').siblings().css('color','#67C23A')
                two = true
                register_land()
			}
		} else {
            $(this).css('border','1px solid #ff6700').siblings().css('color','#ff6700').parent().next().children("span").eq(0).show()
            $('.register_land').css('opacity','0.5')
        }
    })
    // 登录框验证  重置
	$('.register_input_deng input').eq(2).on('blur',function(){
        var vals = $(this).val()
        $(this).parent().next().children("span").hide()
		if (vals != '') {
			$(this).parent().next().children("span").eq(0).hide()
			if (reg.test(vals) === false) {
                $(this).css('border','1px solid #ff6700').siblings().css('color','#ff6700').parent().next().children("span").eq(1).show()
                $('.register_land').css('opacity','0.5')
			} else {
                $(this).css('border','1px solid #ccc').siblings().css('color','#67C23A')
                two = true
                register_land()
			}
		} else {
            $(this).css('border','1px solid #ff6700').siblings().css('color','#ff6700').parent().next().children("span").eq(0).show()
            $('.register_land').css('opacity','0.5')
        }
    })
    // 登录按钮颜色
    function register_land(){
        if(one && two) {
            $('.register_land').css('opacity','1')
        }
    }
    var imgs = "./../img/loading.png"
    $('.register_land').on('click',function(){
        if($(this).css('opacity') == 1) {
            if($('.register_other input:radio[name="checked"]:checked').val() == null){
                $.DialogByZ.Alert({Title: "提示", Content: '请先阅读法律声明和隐私条款',BtnL:"确定",FunL:errorAlert})  
                return
            }
            if($('.register_input_deng input').eq(1).val() !== $('.register_input_deng input').eq(2).val()){
                $.DialogByZ.Alert({Title: "提示", Content: '两次密码不一致，请修改',BtnL:"确定",FunL:errorAlert})
                return
            }
            $.DialogByZ.Loading(imgs) 
            let le ={
                username: $('.register_input_deng input').eq(0).val(),
                password: hex_md5($('.register_input_deng input').eq(1).val())
            }
            $.post('/register.php','json',le).then(res => {
                if(res.code == 0){
                    $.DialogByZ.Alert({Title: "成功", Content: "注册成功，请登录",BtnL:"确定",FunL:successAlert}) 
                }else{
                    $.DialogByZ.Alert({Title: "提示", Content: res.message,BtnL:"确定",FunL:errorAlert}) 
                }
            })
        } else {
            $('.register_input_deng input').blur()
        }
    })
    //关闭弹出框
    function errorAlert(){
        $.DialogByZ.Close();
    }
    //注册成功
    function successAlert(){
        location.href = 'login.html'
    }

})