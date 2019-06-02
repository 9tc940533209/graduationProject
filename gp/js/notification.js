$(function(){
    $("#page").paging({
        pageNo:1,
        totalPage: 111,
        totalSize: 300,
        callback: function(num) {
                // alert(num)
                console.log(num)
        }
      })
})