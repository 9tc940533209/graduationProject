$(function() {
    var reg = /^[A-Za-z0-9@.]+$/
    var imgs = "./../img/loading.png"
	$('.login_input_deng input').on('focus',function(){
	  	$(this).css('border','1px solid #409EFF')
    })
    // 登录框验证  账户
    var one = false
    var two = false
	$('.login_input_deng input').eq(0).on('blur',function(){
        var vals = $(this).val()
        $(this).parent().next().children("span").hide()
		if (vals != '') {
			$(this).parent().next().children("span").eq(0).hide()
			if (reg.test(vals) === false) {
                $(this).css('border','1px solid #ff6700').siblings().css('color','#ff6700').parent().next().children("span").eq(1).show()
                $('.login_land').css('opacity','0.5')
			} else {
                $(this).css('border','1px solid #ccc').siblings().css('color','#67C23A')
                one = true
                login_land()
			}
		} else {
            $(this).css('border','1px solid #ff6700').siblings().css('color','#ff6700').parent().next().children("span").eq(0).show()
            $('.login_land').css('opacity','0.5')
        }
    })
    // 登录框验证  密码
	$('.login_input_deng input').eq(1).on('blur',function(){
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
    // 登录按钮颜色
    function login_land(){
        if(one && two) {
            $('.login_land').css('opacity','1')
        }
    }
    var data
    $('.login_land').on('click',function(){
        if($(this).css('opacity') == 1) {
            $.DialogByZ.Loading(imgs) 
            let le ={
                username: $('.login_input_deng input').eq(0).val(),
                password: hex_md5($('.login_input_deng input').eq(1).val())
            }
            $.post('/login.php','json',le).then(res => {
                errorAlert()
                if(res.code == 0){
                    data = res.data
                    if(res.data.status == 0){
                        $.DialogByZ.Autofade({Content: "登录成功,正在跳转首页"})
                        setTimeout(function(){
                            Alerts()
                        },1000)
                    }else{
                        $.DialogByZ.Alert({Title: "警告", Content: "该账户因违规或投诉，进行警告！请遵守规则，否则进行封禁处理",BtnL:"确定",FunL:Alerts})
                    }
                    
                }else{
                    $.DialogByZ.Alert({Title: "提示", Content: res.message,BtnL:"确定",FunL:errorAlert})
                } 
            })
        } else {
            $('.login_input_deng input').blur()
        }
    })

    // //关闭弹出框
    function errorAlert(){
        $.DialogByZ.Close();
    }
    //登录成功
    function Alerts(){
        $.DialogByZ.Close();
        var value = JSON.stringify(data)
        $.cookie('cookie_info', value, { expires: 2, path: '/' })
        location.href = './../index.html'
    }

})