// pages/apply/apply.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    zan: false,
    id:"",
    data:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title:"申请列表"
    })
    this.getList(options.id)
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
    this.getList(this.data.id)
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
  getList(id){
    wx.showLoading({
      title: '加载中',
    })
    app.post("/query/getUntask.php",{
      id: id
    }).then(res => {
      wx.hideLoading()
      wx.stopPullDownRefresh()
      if(res.data.code == 0){
        this.setData({
          id: id,
          zan: false,
          data: res.data.data
        })
        if(res.data.data.length == 0){
          this.setData({
            zan: true
          })
        }
      }else{
        wx.showToast({
          title: res.data.message,
          icon: 'none',
          duration: 6000
        })
      }
    })
  }
})