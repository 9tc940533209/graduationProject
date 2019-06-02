// pages/editpersonal/editpersonal.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    focusId: '0',
    data:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title:"编辑资料"
    })
    var value = wx.getStorageSync("info")
    this.setData({
      data: JSON.parse(value)
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  // 获取焦点修改样式
  inputFocus(e) {
    this.setData({
      focusId: e.currentTarget.dataset.id
    })
  },
  //失去焦点
  inputBlur() {
    this.setData({
      focusId: 0
    })
  },
  formSubmit(e) {
    if (this.tast(e.detail.value) != 1) {
      wx.showToast({
        title: this.tast(e.detail.value),
        icon: 'none',
        duration: 2000
      })
      return
    }
    var data = e.detail.value
    data.id = this.data.data.id
    wx.showLoading({
      title: '加载中',
    })
    app.get("/editpersonal.php",data).then(das =>{
      wx.hideLoading()
      if(das.data.code == 0){
        wx.showModal({
          title: '提示',
          content: '修改成功',
          showCancel:false,
          success:(res)=> {
            if (res.confirm) {
              if (das.data.data.head_img.lastIndexOf("http") == -1) {
                das.data.data.head_img = app.imgursl() + das.data.data.head_img
              }
              das.data.data.evaluate = data.evaluate
              var info = JSON.stringify(das.data.data)
              wx.setStorageSync("info", info)
              this.qu()
            } else if (res.cancel) {
              console.log('用户点击取消')
            }
          }
        })
      }else{
        wx.showModal({
          title: '修改失败',
          content: res.data.message,
          showCancel:false
        })
      }
    })
    // console.log(e.detail.value)
  },
  tast(data) {
    if (data.name == "") {
      return "请输入姓名"
    }
    if (data.age == "") {
      return "请输入年龄"
    }
    if (data.phone == "") {
      return "请输入电话"
    }
    if (data.email == "") {
      return "请输入邮箱"
    }
    if (data.evaluate == "") {
      return "请输入自我介绍"
    }
    return 1
  },
  qu(){
    wx.redirectTo({
      url: "/pages/mancenter/mancenter?id="+this.data.data.id
    })
  }
})