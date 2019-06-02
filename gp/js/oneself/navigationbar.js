$(function(){
   
    if($.cookie('cookie_info') !== undefined){
        var data = JSON.parse($.cookie('cookie_info'))
        // console.log(data)
        $('.v-deng').hide()
        $('.y-deng').show().html("你好，"+data.name)
        // $('.person').attr('href','./layout/personal.html')
    }else{
        console.log('没有cookie')
        $('.v-deng').show()
        $('.y-deng').hide()
    }
    $('.signOut').on('click',function(){
        $.DialogByZ.Confirm({Title: "提示", Content: "确定退出登录？",FunL:confirmL,FunR:alerts})
       
    })
    function confirmL(){
        $.DialogByZ.Close();
        // $.cookie('cookie_info', '', { expires: -1 });
        $.cookie('cookie_info', '', { expires: -7, path: '/' });
        
        $.get('/signOut.php','json').then(res =>{
            location.reload();
        })
    } 
    function alerts(){
         $.DialogByZ.Close();
    }
    console.log($.cookie('cookie_info'))
    //-----------js类型媒体查询-----------
    var winws = document.documentElement.clientWidth
	  var fun = function (doc, win) {
        var docEl = doc.documentElement
        var resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize'
        var recalc = function () {
            var clientWidth = docEl.clientWidth;
              if (!clientWidth) return;
              winws = clientWidth
              hidehead(clientWidth)
        };
        if (!doc.addEventListener) return;
        win.addEventListener(resizeEvt, recalc, false);
        doc.addEventListener('DOMContentLoaded', recalc, false);
    }
    fun(document, window);
    // 菜单下拉
    function hidehead (winWidth) {
        if (winWidth < 765) {
            $('#bs-example-navbar-collapse-1').addClass('whites')
            $('#bs-example-navbar-collapse-1 a').addClass('whites')
            $('#bs-example-navbar-collapse-1 li a').removeClass('scrolla')
            $('.head').addClass('scroll')
        } else {
            $('#bs-example-navbar-collapse-1').removeClass('whites')
            $('#bs-example-navbar-collapse-1 a').removeClass('whites')
        }
    }
    // fun()
    hidehead(winws)
    // 监听滚动高度
    // $('html,body').on('scroll',function(){
	// 	var heights = $.getScroll().scrollTop
    //     if (winws > 765) {
    //         if (heights > 80) {
    //             $('.head').addClass('navbar-fixed-top').addClass('scroll').css("background-color","rgba(0,0,0,0.3)")
    //             $('#bs-example-navbar-collapse-1 li a').addClass('scrolla')
    //             if (heights > 580) {
	// 				$('.head').css("background-color","rgba(0,0,0,0.5)")
	// 				$('.backtop').show()
    //             }
    //             if (heights > 780) {
    //                 $('.head').css("background-color","rgba(0,0,0,0.7)")
    //             }
    //         } else {
    //             $('.head').removeClass('navbar-fixed-top').removeClass('scroll').css("background-color","#fff")
	// 			$('#bs-example-navbar-collapse-1 li a').removeClass('scrolla')
	// 			$('.backtop').hide()
    //         }
    //     } else {
	// 		if (heights > 300) {
	// 			$('.backtop').show()
	// 		}
	// 	}
    // })
    $('html,body').on('scroll',function(){
		var heights = $.getScroll().scrollTop
        if (winws > 765) {
            if (heights > 80) {
                $('.t_bj').addClass('navbar-fixed-top')
                if (heights > 580) {
			
					$('.backtop').show()
                }
            } else {
                $('.t_bj').removeClass('navbar-fixed-top')
				$('.backtop').hide()
            }
        } else {
			if (heights > 300) {
				$('.backtop').show()
			}
		}
    })
    $('#headsearch').on('click', function() {
        $(this).css('background-color','#ff6700').css('color','#fff')
        setTimeout(() => {
            $(this).css('background-color','#fff').css('color','#000').css('border','1px solid #ccc')
        }, 200);
    })
    // 头部输入框
    $('#head_input').on('focus', function() {
        $('.head_shou').css('transition','0.7s').css('border-color','#ff6700').css('box-shadow','0px 0px 0px 3px rgba(255,255,255,0.1)').find('input').css('border-color','#ff6700')
    })
    $('#head_input').on('blur', function() {
        $('.head_shou').css('border-color','#ccc').css('box-shadow','0px 0px 0px  rgba(0,0,0,0)').find('input').css('border-color','#ccc')
    })
    //搜索
    $('.head_shou>span').on('click',function(){
        if($('#head_input').val() != ''){
            if($('.active-head').text() == "首页 (current)"){
                location.href="./layout/ptjob.html?name="+$('#head_input').val()
            }else{
                location.href="./ptjob.html?name="+$('#head_input').val()
            }
            // 
        }
    })
    // 返回顶部
    $('.backtop').on('click',function(){
		$('html,body').animate({scrollTop:0},1000)
	})
	// 小程序
	$('.erimg').on('mouseenter', function(){
		$('.erimg>div').fadeTo(1000, .9)
	})
	$('.erimg').on('mouseleave', function(){
		$('.erimg>div').fadeTo(1000, 0)
	})
	// 小程序
	$('.phone').on('mouseenter', function(){
		$('.phone>div').show()
		$('.erimg>div').hide()
	})
	$('.phone').on('mouseleave', function(){
		$('.phone>div').hide()
	})
	// 点击显示侧栏
	$('.mascot').on('click', function(){
		$('.toolbar').fadeTo(1000, .9)
		$(this).hide()
		setTimeout(function(){
			$('.toolbar').fadeTo(1000, 0)
			$('.mascot').fadeTo(1000, 1)
		},2000)
    })
    
    $('.y-deng').on('mouseenter',function(){
        $('.v-down').slideDown()
    })
    $('.v-father').on('mouseleave',function(){
        $('.v-down').slideUp()
    })
})