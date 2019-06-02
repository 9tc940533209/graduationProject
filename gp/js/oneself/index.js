$(function() {
	//-----------js类型媒体查询-----------
	var fun = function (doc, win) {
    	var docEl = doc.documentElement,
    	    resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
    	    recalc = function () {
    	        var clientWidth = docEl.clientWidth;
    	        if (!clientWidth) return;
    	        
    	    };
    	if (!doc.addEventListener) return;
    	win.addEventListener(resizeEvt, recalc, false);
    	doc.addEventListener('DOMContentLoaded', recalc, false);
	}
	// 搜索框
    $('.searchxs').on('focus', function(){
        $('.searchxs').css('border','1px solid #ff6700').css('box-shadow','0px 0px 0px 0px rgba(255,255,255,0.1)')
        $('.searchbtn').css('box-shadow','0px 0px 3px 5px rgba(255,255,255,0.8)')
    })
    $('.searchxs').on('blur', function(){
        $('.searchxs').css('border','1px solid #ccc')
        $('.searchbtn').css('box-shadow','0px 0px 0px 0px rgba(255,255,255,0.2)')
	})
	// 明星兼职客
	$('.excellent ul').on('mouseenter','a',function(e) {
		$(this).children('.brief').slideDown(300)
	})
	$('.excellent ul').on('mouseleave','a',function(e) {
		$(this).children('.brief').slideUp(300)
	})

	//----------调取数据-----------
	let le = {
		"size": 8,
		"page": 1,
		"field": 'createTime',
		"sort": 'desc'
	}
	$.post('/ptjob.php','json',le).then(res => {
		var html = template('tasklist',{
			"items":res.data.data
		})
		document.querySelector(".part_time_content").innerHTML = html;
	})
	$.get('/query/getUserpai.php',"json").then(res => {
		var url = $.dataUrls()
		res.data.forEach(element => {
			element.head_img = url+element.head_img
		});
		var html = template('jianzhi',{
			"items":res.data
		})
		document.querySelector(".jianzhi").innerHTML = html;
	})
})