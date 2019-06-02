$(function(){
  $.dataUrl = '/she/dbs/model'
  $.dataUrls = function(){
    return '/she/dbs'
  }
	// 获取滚动条的值，处理兼容性
	$.getScroll = function () {
		return {
		  scrollTop: document.documentElement.scrollTop || document.body.scrollTop,
		  scrollLeft: document.documentElement.scrollLeft || document.body.scrollLeft
		}
  }
  //获取url传的参数
  $.getQueryurl = function(name) {
    var result = window.location.search.match(new RegExp("[\?\&]" + name
        + "=([^\&]+)", "i"));
    if (result == null || result.length < 1) {
      return "";
    }
    return result[1];
  
  }
  //封装ajax
  $.ajaxP = function(mehtod,urls,datatype,datas){
    return $.ajax({
        type: mehtod,
        url: $.dataUrl+urls,
        dataType: datatype,
        data: datas,
    }) 
  }
  //get请求
  $.get = function(urls,datatype){
    return $.ajax({
        type: 'get',
        url: $.dataUrl+urls,
        dataType: datatype,
    }) 
  }
  //get请求
  $.getAsync = function(urls,datatype){
    return $.ajax({
        type: 'get',
        async:false,
        url: $.dataUrl+urls,
        dataType: datatype,
    }) 
  }
  //post请求
  $.post = function(urls,datatype,datas){
    return $.ajax({
        type: 'post',
        url: $.dataUrl+urls,
        dataType: datatype,
        data: datas,

    }) 
  }
  //post请求
  $.postAsync = function(urls,datatype,datas){
    return $.ajax({
        type: 'post',
        url: $.dataUrl+urls,
        async:false,
        dataType: datatype,
        data: datas,

    }) 
  }
  //file请求
  $.files = function(urls,datatype,datas){
    return $.ajax({
        type: 'post',
        url: $.dataUrl+urls,
        async:false,
        dataType: datatype,
        data: datas,
        processData: false,  // 不处理数据
        contentType: false   // 不设置内容类型

    }) 
  }
})