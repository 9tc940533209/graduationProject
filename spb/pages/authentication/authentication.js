// pages/authentication/authentication.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    focusId: '0',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
  //上传文件
  upimg(e){
    console.log(e.target.dataset.id)
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success:(res)=> {
        // tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths[0]
        
        wx.getFileInfo({
          filePath:tempFilePaths,
          success:(res)=> {
            formData.append('file', res);
            console.log(formData)
            // console.log(res.digest)
          }
        })
        // switch (e.target.dataset.id){
        //   case 2:
        //     //身份证正
        //     console.log(tempFilePaths)
        //     break;
        //   case 3:
        //     //身份证反
        //     console.log(tempFilePaths)
        //     break;
        // }
        
      }
    })
  }
})