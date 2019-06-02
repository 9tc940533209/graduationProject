// pages/pijob/pijob.js
var app = getApp()
// 引入SDK核心类
import QQMapWX from '../../utils/qqmap-wx-jssdk.min.js';

// 实例化API核心类
let qqMap = new QQMapWX({
  key: 'CFRBZ-BKGWI-2IOGM-5HTSU-KPA2S-DAF26'
});
Page({

  /**
   * 页面的初始数据
   */
  data: {
    shou: false,
    data:{},
    status:0,
    location:{},
    message:"",
    id:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '任务详情'
    })
    wx.showLoading({
      title: '加载中',
    })
    var value = wx.getStorageSync("info")
    var inid = 0
    if (value) {
      inid = JSON.parse(value).id
    }
    app.get("/pijiob.php?id=" + options.id + "&inId=" + inid).then(res =>{
      wx.hideLoading()
      if (res.data.code == 1) {
        wx.showToast({
          title: '加载数据失败',
          icon: 'none',
          duration: 8000
        })
        return
      }
      var shou = true
      if (!res.data.data.collection){
        shou = false
      }
      this.setData({
        data: res.data.data,
        id: options.id,
        shou: shou
      })
      var das = res.data.data
      var address = das.address_city + das.address_name + das.Specific_address
      this.atuoGetLocation(address)
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
  //经纬度
  atuoGetLocation(data) {
    qqMap.geocoder({
      address: data, 
      complete:(res)=> {
        if (res.status == 0){
          this.setData({
            status: res.status,
            location: res.result.location
          })
        }else{
          this.setData({
            status: res.status,
            message: res.message
          })
        }

      }
    });
  },
  //收藏
  shous(){
    var value = wx.getStorageSync("info")
    var inid = 0
    if (!value) {
      wx.showToast({
        title: '请先登录',
        icon: 'none',
        duration: 3000
      })
      return
    }
    var das
    var index
    if(this.data.shou){
      das = false
      index = 1
    }else{
      das = true
      index = 2
    }
    this.setData({
      shou: das
    })
    app.post("/collection.php",{
      type: index,
      taskId: this.data.id,
      inforId: JSON.parse(value).id
    }).then(res =>{
      if(res.data.code == 0){
        this.setData({
          shou: das
        })
      }else{
        wx.showToast({
          title: "操作失败",
          icon: 'none',
          duration: 3000
        })
      }
    })
  },
  tiao(){
    if(this.data.status != 0){
      wx.showToast({
        title: '抱歉！该地点未查询到',
        icon: 'none',
        duration: 3000
      })
      return
    }
    wx.openLocation({
      name: this.data.data.Specific_address,
      latitude: this.data.location.lat,
      longitude: this.data.location.lng,
      scale: 14
    })
    // wx.navigateTo({
    //   url: '/pages/map/map?address=' + this.data.data.Specific_address + '&lat=' + this.data.location.lat + '&lng=' + this.data.location.lng
    // })
  },
  //任务申请
  apply(){
    var value = wx.getStorageSync("info")
    if (value){
      value = JSON.parse(value)
      if(value.type == 0){
        wx.showToast({
          title: '请先认证信息',
          icon: 'none',
          duration: 2000
        })
      } else if (value.type == 1) {
        wx.showToast({
          title: '商家不能发布任务',
          icon: 'none',
          duration: 2000
        })
      } else if (value.type == 2) {
        wx.showModal({
          title: '提示',
          content: '确定申请该任务？',
          success:(res)=> {
            if (res.confirm) {
              wx.showLoading({
                title: '申请中',
              })
              app.post("/apply.php",{
                taskId: this.data.id,
                inforId: value.id
              }).then(res =>{
                wx.hideLoading()
                if(res.data.code == 0){
                  wx.showToast({
                    title: '申请成功',
                    icon: 'success',
                    duration: 2000
                  })
                }else{
                  wx.showModal({
                    title: '失败',
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
    }else{
      wx.showToast({
        title: '请先登录',
        icon: 'none',
        duration: 2000
      })
    }
  }
})