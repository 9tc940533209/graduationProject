$(function(){
	var imgs = "./../img/loading.png"
    $.DialogByZ.Loading(imgs) 
    var inId
    if($.cookie('cookie_info')){
        inId = JSON.parse($.cookie('cookie_info')).id
    }else{
        inId = 0
    }
	
	//简介
    $.get('/query/personalData.php?id='+$.getQueryurl('id'),'json').then(res => {
		information= res.data.information
		
		$('.name').html(information.name)
		if(information.type == 1){
			$('.release_type').html('商家')
			$(".shang").html('商家简介')
			$('.address').html('地址：'+res.data.explain.Business_address)
			$('.addresss').html(res.data.explain.Business_address)
			$('.infor').html(res.data.explain.Business_brief)
        }else{
			$('.release_type').html('学生')
			$(".shang").html('学生简介')
			$('.address').html('地址：'+res.data.at.school)
			$('.addresss').html(res.data.at.school+'&nbsp;&nbsp;'+res.data.at.major)
			$('.infor').html(res.data.explain.evaluate)
		}
		$("#head_img").attr("src",$.dataUrls()+information.head_img)
		var num = Math.ceil(information.praise/20)
        var praise = ''
        for(var i = 0;i<num;i++){
            praise += '<span class="glyphicon glyphicon-heart" style="margin-left:2px;"></span>'
		}
		$('.release_praise').html(praise)
        errorAlert()
	})
	

	//调取页面数据
	function getData(size,page){
		let le = {
			"id":$.getQueryurl('id'),
			"size": size,
			"page": page,
		}
		$.post('/publisher.php','json',le).then(res => {
			var html = template('tasklist',{
				"items":res.data.data
			})
			document.querySelector(".pub_second_data").innerHTML = html;
			paging(page,res.data.totalPage,res.data.totalSize)
		})
	}
	getData(5,1)
    //分页
    function paging(page,totalPage,totalSize){
        $("#page").paging({
            pageNo:page,
            totalPage: totalPage,
            totalSize: totalSize,
            callback: function(num) {
                // alert(num)
                getData(5,num)
            }
        })
    }

	$.get('/query/comment.php?id='+$.getQueryurl('id'),'json').then(res =>{
		
		res.data.forEach(element => {
			element.xin = Math.ceil(element.branch/20)
			
		});
		console.log(res.data)
		var html = template('commentlist',{
			"items":res.data
		})
		document.querySelector(".comment").innerHTML = html;
	})






	$('.pub_switch span').on('click',function(e){
		$(e.target).css({
			color: '#ff6700',
			borderBottom: '2px solid #ff6700'
		}).siblings().css({
			color: '#fff',
			borderBottom: '0px solid #ff6700'
		})
		var indexs = $(e.target).index()
		$('.pub_content>div').eq(indexs).show().siblings().hide()
	})
	// 500以下屏幕
	$('.pub_xians span').on('click',function(e){
		$(e.target).css({
			color: '#ff6700',
			borderBottom: '2px solid #ff6700'
		}).siblings().css({
			color: '#000',
			borderBottom: '0px solid #ff6700'
		})
		var indexs = $(e.target).index()
		$('.pub_content>div').eq(indexs).show().siblings().hide()
	})
	$("#page").paging({
		pageNo:1,
		totalPage: 111,
		totalSize: 300,
		callback: function(num) {
            // alert(num)
            console.log(num)
		}
	})


	//关闭弹出框
	function errorAlert(){
		$.DialogByZ.Close();
	}
})