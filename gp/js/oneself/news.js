$(function(){
	var imgs = "./../img/loading.png"

	//关闭弹出框
	function eAlert(){
		$.DialogByZ.Close();
	}
	//调取页面数据
	function getData(size,page){
		$('.noData').hide()
		$.DialogByZ.Loading(imgs)
		let le = {
		    "size": size,
		    "page": page,
		    "type":"0",
		}
		$.post('/query/getNewsList.php','json',le).then(res => {
		    eAlert()
		   
		    if(res.data.data.length == 0){
			  $('.noData').show()
            }
            var das = $.dataUrls()
            res.data.data.forEach(element => {
                element.img = das+element.img
            });
		    var html = template('newlist',{
			  "items":res.data.data
		    })
		    document.querySelector(".newlist").innerHTML = html;
		    paging(page,res.data.totalPage,res.data.totalSize)
		})
	}
	getData(9,1)
	
    	//分页
	function paging(page,totalPage,totalSize){
		$("#page").paging({
		    pageNo:page,
		    totalPage: totalPage,
		    totalSize: totalSize,
		    callback: function(num) {
			  // alert(num)
			  getData(9,num)
			  console.log(num)
		    }
		})
	 }
})