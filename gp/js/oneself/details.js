$(function(){
    var id = $.getQueryurl('details')
    var imgs = "./../img/loading.png"
    $.DialogByZ.Loading(imgs)
    //----------调取数据------------
    $.get('/query/personalData.php?id='+id,'json').then(res=>{
        $.DialogByZ.Close();
        // console.log(res)
        var information = res.data.information //用户基本信息
        var explain = res.data.explain //说明
        var at = res.data.at //认证信息
        var experience = res.data.experience //工作简历，只有学生有

        //公共
        $('.username').text(information.name)
        $('.sex').text(information.sex)
        $('.age').text(information.age+'岁')
        $('.bian').attr('href','editpersonal.html?id='+information.id)


        if(information.phone == null){
            $('.phone').text('暂无数据')
        }else{
            $('.phone').text(information.phone)
        }

        if(information.email == null){
            $('.email').text('暂无数据')
        }else{
            $('.email').text(information.email)
        }
        
        if(information.praise == null){
            $('.per_statistics').hide()
        }else{
            $('.per_statistics').show()
            $('.praise').text(information.praise+"%")
        }
        
        $('.zong').text(information.zong.length)

        //类型
        if(information.type == 0){
            $('.type').text('未认证')
            $('.ident').show()
            $('.per_third_title').text('自我评价')
            if(explain.evaluate == null){
                $('.per_third_content').text('这个人很懒，什么都没有留下')
            }
        }else if(information.type == 1){
            $('.type').text('商家')
            $('.merchant').show()
            $('.gong').hide()
            $('.merchantName').text(at.name)
            $('.address').text(at.address)
            $('.createTime').text(at.createTime)
            $('.per_third_title').text('商家简介')
            $('.per_third_content').text(explain.Business_brief)
            $('.per_third_address').text("具体地址："+explain.Business_address)
            $('.yifa').show()
        }else if(information.type == 2){
            $('.type').text('学生')
            $('.student').show()
            $('.yifa').show()
            $('.school').text(at.school)
            $('.major').text(at.major)
            $('.regular').text(at.regular)
            $('.time').text(at.beginTime+" - "+at.endTime)
            $('.per_third_title').text('自我评价')
            $('.per_third_content').text(explain.evaluate)
            if(explain.evaluate == null){
                $('.per_third_content').text('这个人很懒，什么都没有留下')
            }
            if(experience.length == 0){
                $('.per_fourth_zan').show()
            }else{
                $('.per_fourth_zan').hide()
                var html = template('experiencelist',{
                    "items":experience
                })
                document.querySelector(".per_fourth_experience").innerHTML = html;
            }

            $('.apply').show()
        }
        
    })
})