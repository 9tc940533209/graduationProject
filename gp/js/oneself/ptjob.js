$(function(){
    var addressCity //城市
    var addressName //区县级
    var industryType //行业
    var cycle //周期
    var field = "createTime"
    var imgs = "./../img/loading.png"
    var name

    
    if($.cookie('cookie_info')){
        var infor = JSON.parse($.cookie('cookie_info'))
        var url = $.dataUrls()+infor.head_img
        $('#headimg').prop('src',url)
        $('.name').text("Hi，"+infor.name)
        if(infor.type == 1){
            $('.praise').text(infor.praise+"%")
            $('.xue').hide()
            $('.shang').show()
            let le = {
                "id":infor.id,
                "size": 1000,
                "page": 1,
            }
            $.post('/publisher.php','json',le).then(res => {
                $('.fa').text(res.data.data.length)

            })
        }else{
            $('.praise').text(infor.praise+"%")
            $('.zong').text(infor.zong)
        }
        
    }else{
        $('.name').text("Hi，陌生人")
    }
    var date = new Date();
    var houers = date.getHours();
    var time
    if(houers>=0 && houers<5){
        time = "凌晨好"
    }
    if(houers>=5 && houers<12){
        time = "早上好"
    }
    if(houers>=12 && houers<15){
        time = "中午好"
    }
    if(houers>=15 && houers<19){
        time = "下午好"
    }
    if(houers>=19){
        time = "晚上好"
    }
    $('.wenhou').text("欢迎回来，"+time)



    //河南
    $('.pt_bgc').on('click',function(){
        $.DialogByZ.Alert({Title: "抱歉", Content: '目前只支持河南地区',BtnL:"确定",FunL:errorAlert}) 
    })
    var das = 0
    var city = true
    // 市级下拉
    $('#pt_city').on('click',function(){
        $('.pt_screen_district').slideUp(200)
        $('#pt_district span').css('color','#333')
        district = true
        if(city){
            $('.pt_screen_city').slideDown(200)
            $('#pt_city span').css('color','#ff6700')
            city = false
        }else{
            $('.pt_screen_city').slideUp(200)
            $('#pt_city span').css('color','#333')
            city = true
        }

    })
    $('.pt_screen_city ul').on('click','li',function(e){
        $('#page').html('')
        addressCity = $(this).attr('id')
        addressName = undefined
        getData(9,1)
        for(var i = 0;i<address.length;i++){
            if(address[i].name == $(this).attr('id')){
                var htmlD = template('districtLiTemplate',{
                    "items":address[i].district
                })
                document.querySelector(".districtLi").innerHTML = htmlD;
                break;
            }
        }
        $('.pt_screen_city').slideUp(200)
        $('#pt_city span:eq(0)').text($(e.target).text())
        $('#pt_city span').css('color','#333')
        city = true
        if($('#pt_district span:eq(0)').text() !== '区县级') {
            $('#pt_district span:eq(0)').text('区县级')
        }
    })
    var district = true
    // 县级下拉
    $('#pt_district').on('click',function(){
        if($('#pt_city span:eq(0)').text() == '行政市'){
            $.DialogByZ.Autofade({Content: "请先选择行政市"})
            return      
        }
        $('.pt_screen_city').slideUp(200)
        city = true
        $('#pt_city span').css('color','#333')
        if(district){
            $('.pt_screen_district').slideDown(200)
            $('#pt_district span').css('color','#ff6700')
            district = false
        }else{
            $('.pt_screen_district').slideUp(200)
            $('#pt_district span').css('color','#333')
            district = true
        }

    })
    $('.pt_screen_district ul').on('click','li',function(e){
        $('#page').html('')
        addressName = $(this).attr('id')
        getData(9,1)
        $('.pt_screen_district').slideUp(200)
        $('#pt_district span:eq(0)').text($(e.target).text())
        $('#pt_district span').css('color','#333')
        district = true
    })
    // 行业选择
    $('.pt_screen_vocation ul').on('click','li',function(e){
        $('#page').html('')
        industryType = $(this).attr('id')
        getData(9,1)
        $(this).css({
            color: '#fff',
            backgroundColor: '#ff6700'
        }).siblings().css({
            color: '#333',
            backgroundColor: '#fff'
        })
    })
    // 筛选条件
    $('.pt_screen_condition ul').on('click','li',function(e){
        if($(e.target).text() == '清除筛选条件') {
            $(e.target).css('color','#333').siblings().css({
                color: '#333',
                backgroundColor: '#fff'
            })
            das = 0;
            $('.condition_data').text('结算日期')

            addressCity = undefined //城市
            $('#pt_city span:eq(0)').text("行政市")

            addressName = undefined //区县级
            $('#pt_district span:eq(0)').text("区县级")

            industryType = undefined //行业
            $('.pt_screen_vocation ul li').css({
                color: '#333',
                backgroundColor: '#fff'
            })

            cycle = undefined //周期
            field = "createTime"
            $('#page').html('')
            name = undefined
            $('#head_input').val('')
            getData(9,1)
            return
        }
        $(e.target).css({
            color: '#fff',
            backgroundColor: '#ff6700'
        })
        if($(e.target).text() == "薪酬最高"){
            field = "money"
        }else{
            cycle = $(e.target).text()
        }
        $('#page').html('')
        getData(9,1)
    })
    $('.condition_data').on('click', function(){
        das++
        switch (das) {
            case 1: $(this).text('日结')
                break;
            case 2: $(this).text('周结')
                break; 
            case 3: $(this).text('半月结')
                break;
            case 4: $(this).text('月结')
                das = 0
                break;   
        }
    })


    //----------调取数据-----------
    //获取行业类型
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
    //关闭弹出框
    function errorAlert(){
        $.DialogByZ.Close();
    }
    var address = []
    //获取地址列表
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

        }
    })
    //关闭弹出框
    function eAlert(){
        $.DialogByZ.Close();
    }
    if($.getQueryurl("name")){
        name = decodeURI($.getQueryurl("name"))
        $('#head_input').val(name)
    }
    //调取页面数据
    function getData(size,page){
        $('.noData').hide()
        $.DialogByZ.Loading(imgs)
        let le = {
            "size": size,
            "page": page,
            "field": field,
            "sort": 'desc',
            "address_city":addressCity,
            "address_name":addressName,
            "type":industryType,
            "cycle":cycle,
            "name":name
        }
        $.post('/ptjob.php','json',le).then(res => {
            eAlert()
            console.log(res)
            if(res.data.data.length == 0){
                $('.noData').show()
            }
            var html = template('tasklist',{
                "items":res.data.data
            })
            document.querySelector(".pt_recruitment").innerHTML = html;
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