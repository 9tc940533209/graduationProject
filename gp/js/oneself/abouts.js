$(function(){
    $('.ab_nav div').on('click','p',function(e){ 
        $(this).css({
            color:  "#ff6700",
            borderBottom: "2px solid #ff6700"
        }).parent().siblings().find('p').css({
            color: "#333",
            borderBottom: " 0px solid #ff6700"
        })
        var ind = $(this).parent().index()
        console.log(ind)
        $(".ab_content>div").eq(ind).show().siblings().hide()
    })
})