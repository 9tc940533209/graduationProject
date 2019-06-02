// pages/mancenter/mancenter.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    data:{},
    type:0,
    id:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx:wx.setNavigationBarTitle({
      title: '个人中心'
    })
    this.getData(options.id)
    this.setData({
      id: options.id
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
    this.getData(this.data.id)
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
  //信息
  getData(id){
    wx.showLoading({
      title: '加载中',
    })
    app.get("/query/personalData.php?id="+id).then(res =>{
      // console.log(res.data)
      wx.hideLoading()
      wx.stopPullDownRefresh()
      this.setData({
        data: res.data.data,
        type: res.data.data.information.type
      })
    })
  },
  //编辑
  tiao(){
    wx.redirectTo({
      url: "/pages/editpersonal/editpersonal"
    })
  },
  //认证
  renz() {
    wx.redirectTo({
      url: "/pages/authentication/authentication"
    })
  },
})