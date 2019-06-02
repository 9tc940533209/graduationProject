$(function(){
    var imgs = "./../img/loading.png"
    if($.cookie('cookie_info') == undefined){
        $.DialogByZ.Autofade({Content: "没有登录或者认证是不能发布任务哦"})
    }else{
        var types = JSON.parse($.cookie('cookie_info')).type
        if(types == 0){
            $.DialogByZ.Autofade({Content: "抱歉，该账户未认证不能发布任务"})
        }
    }
    $('.rele_input input').on('focus',function() {
        $(this).parent().css('border-color',"#409EFF")
    })
    // 职位名称
    var vals
    $('.names input').on('blur',function() {
        vals = $(this).val()
        $(this).parent().next().hide().next().hide()
        if(!vals){
            $(this).parent().css('border-color',"#ff6700").next().show()
            return
        }
        if(vals.length > 15 || vals.length <3) {
            $(this).parent().css('border-color',"#ff6700").next().next().show()
            return
        }
        $(this).parent().css('border-color',"#ccc")
    })
    // 薪酬
    var moneys
    $('.money input').on('blur',function() {
        moneys = $(this).val()
        $(this).parent().next().hide().next().hide()
        if(!moneys){
            $(this).parent().css('border-color',"#ff6700").next().show()
            return
        }
        if(moneys/1 < 0) {
            $(this).parent().css('border-color',"#ff6700").next().next().show()
            return
        }
        $(this).parent().css('border-color',"#ccc")
    })
    // 选择框
    var typenum = true
    $('.choices>div').on('click',function(){
        if (typenum) {
            $(this).css('border-color','#409EFF').siblings().slideDown(200)
            typenum = false
        } else {
            $(this).css('border-color','#ccc').siblings().slideUp(200)
            typenum = true
        }  
    })
    var type
    $('.types ul').on('click','li',function(){
        type = $(this).attr('id')
        $(this).parent().slideUp(200).siblings().text($(this).text()).css('border-color','#ccc').css('color','#333')
        typenum = true
    })
    $('.choice ul').on('click','li',function(){
        $(this).parent().slideUp(200).siblings().text($(this).text()).css('border-color','#ccc').css('color','#333')
        typenum = true
    })
    // 地址选择
    var addressnum = true
    $('.san>div').on('click',function(){
        if (addressnum) {
            $(this).css('border-color','#409EFF').siblings().slideDown(200)
            addressnum = false
        } else {
            $(this).css('border-color','#ccc').siblings().slideUp(200)
            addressnum = true
        }  
    })
    var city
    $('.citys ul').on('click','li',function(){
        $('.districtDiv').text('区县级')
        var zhi = $(this).text()
        $(this).parent().slideUp(200).siblings().text(zhi).css('border-color','#ccc').css('color','#333')
        addressnum = true
        for(var i = 0;i<address.length;i++){
            if(address[i].name == $(this).attr('id')){
                city = address[i].name
                var htmlD = template('districtLiTemplate',{
                    "items":address[i].district
                })
                document.querySelector(".districtLi").innerHTML = htmlD;
                break;
            }
        }
    })
    var distric
    $('.districtLis ul').on('click','li',function(){
        distric = $(this).text()
        $(this).parent().slideUp(200).siblings().text(distric).css('border-color','#ccc').css('color','#333')
        addressnum = true
    })
    // 详细地址
    $('.xiangxi_add input').on('blur',function() {
        var vals = $(this).val()
        $(this).parent().next().hide().next().hide()
        if(!vals){
            $(this).parent().css('border-color',"#ff6700").next().show()
            return
        }
        if(vals.length > 40) {
            $(this).parent().css('border-color',"#ff6700").next().next().show()
            return
        }
        $(this).parent().css('border-color',"#ccc")
    })
    // 选择时间
    $("#input1").shijian()
    $("#input2").shijian()
    // 职位名称
    $('.rele_div textarea').on('focus',function() {
        $(this).css('border-color',"#409EFF")
    })
    $('.rele_div textarea').on('blur',function() {
        var vals = $(this).val()
        $(this).next().hide().next().hide()
        if(!vals){
            $(this).css('border-color',"#ff6700").next().show()
            return
        }
        if(vals.length > 200) {
            $(this).css('border-color',"#ff6700").next().next().show()
            return
        }
        $(this).css('border-color',"#ccc")
    })
    // 发布
    $('.rele_btn').on('click',function(){
        if($.cookie('cookie_info') == undefined){
            $.DialogByZ.Alert({Title: "提示", Content: "请先登录哦",BtnL:"确定",FunL:errorAlert})
            return
        }
        if(types == 0){
            $.DialogByZ.Alert({Title: "提示", Content: "抱歉，该账户未认证不能发布任务",BtnL:"确定",FunL:errorAlert})
            return
        }
        $('input').blur()
        $('.rele_div textarea').blur()
        if(!tesk()){
            return
        }
        $('.less_times').hide()
        $('.less_time').hide()
        if(new Date() - new Date($("#input1").val()) > 0) {
            $('.less_times').show()
            return
        }
        if(new Date($("#input2").val()) - new Date($("#input1").val()) < 0) {
            $('.less_time').show()
            return
        }
        var data = JSON.parse($.cookie('cookie_info'))
        let cycle = $('.cycle').text()
        $.DialogByZ.Loading(imgs) 
        let le = {
            release_id: data.id,
            type: type,
            address_city: city,
            address_name: distric,
            name: vals,
            number: $("#numbers").val(),
            money: moneys,
            cycle: cycle,
            begin_time: $("#input1").val()+':00',
            end_time: $("#input2").val()+':00',
            describe: $('.describe').val(),
            requirement:$('.requirement').val(),
            Specific_address: $('.xiangxi_add input').val()
        }
        console.log(le)
        $.post('/release.php','json',le).then(res =>{
            errorAlert()
            if(res.code == 0){
                $.DialogByZ.Alert({Title: "提示", Content: '发布成功！',BtnL:"确定",FunL:alerts})
                
            }else{
                $.DialogByZ.Alert({Title: "失败", Content: res.message,BtnL:"确定",FunL:errorAlert})
            } 
        })
        
    })
    function tesk(){
        var result = true;
        $('.typeNull').hide()
        $('.numbersNull').hide()
        $('.beginTime').hide()
        $('.endTime').hide()
        $('.cycleNull').hide()
        $('.districtNull').hide()
        $('.cityNull').hide()
        $('.typeDiv').css('border-color',"#ccc")
        $('#numbers').css('border-color',"#ccc")
        $("#input1").parent().css('border-color',"#ccc")
        $("#input2").parent().css('border-color',"#ccc")
        $('.cycle').css('border-color',"#ccc")
        $('.cityDiv').css('border-color',"#ccc")
        $('.districtDiv').css('border-color',"#ccc")
        if($('.typeDiv').text() == '请选择'){
            $('.typeNull').show()
            $('.typeDiv').css('border-color',"#ff6700")
            result = false
        }
        if($('#numbers').val() == ''){
            $('.numbersNull').show()
            $('#numbers').parent().css('border-color',"#ff6700")
            result = false
        }
        if($("#input1").val() == ''){
            $('.beginTime').show()
            $("#input1").parent().css('border-color',"#ff6700")
            result = false
        }
        if($("#input2").val() == ''){
            $('.endTime').show()
            $("#input2").parent().css('border-color',"#ff6700")
            result = false
        }
        if($('.cycle').text() == '请选择'){
            $('.cycleNull').show()
            $('.cycle').css('border-color',"#ff6700")
            result = false
        }
        if($('.cityDiv').text() == '行政市'){
            $('.cityNull').show()
            $('.cityDiv').css('border-color',"#ff6700")
            result = false
        }
        if($('.districtDiv').text() == '区县级'){
            $('.districtNull').show()
            $('.districtDiv').css('border-color',"#ff6700")
            result = false
        }
        if(moneys == ''){
            result = false
        }
        if(vals == ''){
            result = false
        }
        if($('.describe').val() == ''){
            result = false
        }
        if($('.requirement').val() == ''){
            result = false
        }
        if($('.xiangxi_add input').val() == ''){
            result = false
        }
        return result
    }
    //数据调取
    $.get('/query/taskType.php','json').then(res=>{
        if(res.code == 1){
            $.DialogByZ.Alert({Title: "提示", Content: '好像出了一点小问题哦?请刷新页面',BtnL:"确定",FunL:errorAlert}) 
            return
        }
        var html = template('tasktypelist',{
            "items":res.data
        })
        document.querySelector(".tackType").innerHTML = html;
    })
    //获取地址列表
    var address = []
    $.ajax({
        type: 'get',
        dataType: 'json',
        url: '../js/city.json',
        success: function(res){
            address = res
            var html = template('cityLiTemplate',{
                "items":res
            })
            document.querySelector(".cityLi").innerHTML = html;

        },

    })
    //关闭弹出框
    function errorAlert(){
        $.DialogByZ.Close();
    }
    function alerts(){
        location.href="ptjob.html"
        $.DialogByZ.Close();
    }


})