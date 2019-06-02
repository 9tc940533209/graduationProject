// pages/notification/notification.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    data:[],
    id:"",
    zan:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '消息'
    })
    this.getList(options.id)
  },
  getList(id){
    wx.showLoading({
      title: '加载中',
    })
    app.get("/query/notification.php?id=" + id).then(res => {
      wx.hideLoading()
      wx.stopPullDownRefresh()
      if (res.data.data.length == 0){
        this.setData({
          zan: true
        })
      }
      this.setData({
        id:id,
        data: res.data.data
      })
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
  delMessage(e){
    wx.showModal({
      title: '提示',
      content: '确定删除该信息？',
      success:(res)=> {
        if (res.confirm) {
          app.post("/query/notification.php",{
            messgaeId: e.currentTarget.dataset.id
          }).then(res =>{
            if(res.data.code == 0){
              wx.showToast({
                title: '删除成功',
                icon: 'success',
                duration: 2000
              })
              this.getList(this.data.id)
            }else{
              wx.showModal({
                title: '删除失败',
                content: res.data.message,
                showCancel:false
              })
            }
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  }
})