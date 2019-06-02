// pages/personal/personal.js
var app = getApp()
const md5 = require("../../utils/md5.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    zhe: false,
    zheTwo:false,
    info: {},
    headimg:"../../static/tou.jpg",
    name:"",
    password:"",
    username:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '我的'
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
      var value = wx.getStorageSync('info')
      if (value){
        var data = JSON.parse(value)
        this.setData({
          info: data,
          headimg: data.head_img,
          name: data.name
        })
      }
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
  deng(){
    this.setData({
      zhe: true
    })
  },
  ying(){
    this.setData({
      zhe: false
    })
  },
  //微信登录
  wxLogin(e){
    // console.log(e)
    // console.log(e.detail.userInfo)
    var user = e.detail.userInfo
    var sex
    if (user.gender == 0 || user.gender == 1){
      sex = "男"
    }else{
      sex = "女"
    }
    //点击允许
    if (e.detail.errMsg == "getUserInfo:ok"){
      wx.showLoading({
        title: '请稍等',
      })
      wx.login({
        success:(res)=> {
          if (res.code) {
            //发起网络请求
            app.post("/wx/wxLogin.php",{
              code: res.code,
              name: user.nickName,
              sex: sex,
              headimg: user.avatarUrl
            }).then(das => {
              wx.hideLoading()
              if (das.data.code == 0){
                if (das.data.data.status == 2){
                  wx.showModal({
                    title: '警告',
                    content: "该账户已被封禁，请联系管理员",
                    showCancel: false,
                    confirmColor: "#000000"
                  })
                  return
                }
                // console.log(das.data.data)
                wx.showToast({
                  title: '登录成功',
                  icon: 'success',
                  duration: 2000
                })
                if (das.data.data.head_img.lastIndexOf("http") == -1){
                  das.data.data.head_img = app.imgursl() + das.data.data.head_img
                }
                var info = JSON.stringify(das.data.data)
                wx.setStorageSync("info",info)
                this.setData({
                  zhe: false,
                  info: das.data.data,
                  headimg: das.data.data.head_img,
                  name: das.data.data.name
                })
              }else{
                wx.showModal({
                  title: '登录失败',
                  content: das.data.message,
                  showCancel: false,
                  confirmColor: "#000000",
                  success(res) {
                    if (res.confirm) {
                      // console.log('用户点击确定')
                    }
                  }
                })
              }
            })
          } else {
            wx.hideLoading()
            wx.showToast({
              title: '错误，请稍后重试',
              icon: 'none',
              duration: 2000
            })
          }
        }
      })
      //用户基本信息 e.detail.userInfo
    }else{

    }
  },
  //账户密码
  zhLogin(){
    this.setData({
      zhe: false,
      zheTwo: true
    })
  },
  //取消登录
  zhqu(){
    this.setData({
      zheTwo: false,
      password:"",
      username:""
    })
  },
  getusername(e){
    this.setData({
      username: e.detail.value
    })
  },
  getpassword(e) {
    this.setData({
      password: e.detail.value
    })
  },
  dengs(){
    if (this.data.username == ""){
      wx.showToast({
        title: '请输入账户',
        icon: 'none',
        duration: 2000
      })
      return
    }
    if (this.data.password == "") {
      wx.showToast({
        title: '请输入密码',
        icon: 'none',
        duration: 2000
      })
      return
    }
    // console.log(md5.hexMD5(this.data.password))
    // return
    var le = {
      username: this.data.username,
      password: md5.hexMD5(this.data.password)
    }
    wx.showLoading({
      title: '正在登录中',
    })
    app.post("/login.php", le).then(das=>{
      wx.hideLoading()
      if (das.data.code == 0) {
        if (das.data.data.status == 2) {
          wx.showModal({
            title: '警告',
            content: "该账户已被封禁，请联系管理员",
            showCancel: false,
            confirmColor: "#000000"
          })
          return
        }
        wx.showToast({
          title: '登录成功',
          icon: 'success',
          duration: 2000
        })
        das.data.data.head_img = app.imgursl() + das.data.data.head_img
        var info = JSON.stringify(das.data.data)
        wx.setStorageSync("info", info)
        this.setData({
          info: das.data.data,
          headimg: das.data.data.head_img,
          name: das.data.data.name
        })
        this.zhqu()
      } else {
        wx.showModal({
          title: '登录失败',
          content: das.data.message,
          showCancel: false,
          confirmColor: "#000000"
        })
      }
    })
  },
  //退出登录
  tui(){
    wx.showModal({
      title: '注销',
      content: '确定退出当前账户？',
      success:(res)=> {
        if (res.confirm) {
          this.setData({
            info: {},
            headimg: "../../static/tou.jpg",
            name: ""
          })
          wx.removeStorage({
            key: 'info',
          })
          wx.showToast({
            title: '退出成功',
            icon: 'success',
            duration: 2000
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  //消息通知
  message(){
    var value = wx.getStorageSync('info')
    if (value) {
      value = JSON.parse(value)
      wx.navigateTo({
        url: '/pages/notification/notification?id=' + value.id
      })
    }else{
      wx.showToast({
        title: '请先登录',
        icon: 'none',
        duration: 2000
      })
    }
  },
  //收藏
  enshrine(){
    var value = wx.getStorageSync('info')
    if (value) {
      value = JSON.parse(value)
      wx.navigateTo({
        url: '/pages/enshrine/enshrine?id=' + value.id
      })
    } else {
      wx.showToast({
        title: '请先登录',
        icon: 'none',
        duration: 2000
      })
    }
  },
  //申请列表
  apply() {
    var value = wx.getStorageSync('info')
    if (value) {
      value = JSON.parse(value)
      wx.navigateTo({
        url: '/pages/apply/apply?id=' + value.id
      })
    } else {
      wx.showToast({
        title: '请先登录',
        icon: 'none',
        duration: 2000
      })
    }
  },
  //发布列表
  rele() {
    var value = wx.getStorageSync('info')
    if (value) {
      value = JSON.parse(value)
      wx.navigateTo({
        url: '/pages/rele/rele?id=' + value.id
      })
    } else {
      wx.showToast({
        title: '请先登录',
        icon: 'none',
        duration: 2000
      })
    }
  },
  //个人中心
  mancenter(){
    var value = wx.getStorageSync('info')
    if (value) {
      value = JSON.parse(value)
      wx.navigateTo({
        url: '/pages/mancenter/mancenter?id=' + value.id
      })
    } else {
      wx.showToast({
        title: '请先登录',
        icon: 'none',
        duration: 2000
      })
    }
  },
  //修改头像
  tou(){
    var value = wx.getStorageSync('info')
    if(!value){
      return
    }
    value = JSON.parse(value)
    wx.showModal({
      title: '提示',
      content: '确定更换头像？',
      success:(res)=> {
        if (res.confirm) {
          wx.chooseImage({
            count: 1, // 默认9
            sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
            sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
            success:(res)=> {
              // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
              var tempFilePaths = res.tempFilePaths
              wx.showLoading({
                title: '上传头像中',
              })
              app.file("/headPortrait.php",tempFilePaths[0],"file",{
                id: value.id,
                type:1
              }).then(res =>{
                wx.hideLoading()
                var das = JSON.parse(res.data)
                if(das.code == 0){
                  wx.showToast({
                    title: '修改成功',
                    icon: 'success',
                    duration: 2000
                  })
                  das.data.head_img = app.imgursl() + das.data.head_img
                  var info = JSON.stringify(das.data)
                  wx.setStorageSync("info", info)
                  this.setData({
                    info: das.data,
                    headimg: das.data.head_img,
                    name: das.data.name
                  })
                }else{
                  wx.showToast({
                    title: '上传失败',
                    icon: 'none',
                    duration: 2000
                  })
                }
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