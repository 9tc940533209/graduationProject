var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrls: [
      'https://images.unsplash.com/photo-1551334787-21e6bd3ab135?w=640',
      'https://images.unsplash.com/photo-1551214012-84f95e060dee?w=640',
      'https://images.unsplash.com/photo-1551446591-142875a901a1?w=640'
    ],
    indicatorDots: true,
    autoplay: true,
    interval: 3000,
    duration: 1500,
    circular: true,
    loads: false,
    ends: false,
    none:false,
    url: '',
    size: 5,
    page: 1,
    values: '',
    address_city: "",
    address_name: "",
    type: "",
    name: "",
    data:[],
    show: false,
    screenIndex:3,
    taskTypes:[],
    region: ['河南省'],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.data.url = app.ursl()
    this.getData()
    this.taskType()
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.animation = wx.createAnimation()
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
    this.resetData()
    this.getData()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if (this.data.ends || this.data.none){

    }else{
      wx.showNavigationBarLoading()
      var pages = this.data.page+1
      this.setData({
        loads: true,
        page: pages
      })
      this.getData()
    }

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  //重置数据
  resetData(index){
    this.setData({
      loads: false,
      ends: false,
      none: false,
      size: 5,
      page: 1,
      address_city: "",
      address_name: "",
      type: "",
      name: "",
      region: ['河南省'],
      data: [],
      screenIndex: 3,
    })
    if(!index){
      this.setData({
        values: ""
      })
    }
  },
  // 获取焦点修改样式
  inputFocus(e) {
    this.setData({
      focusId: e.currentTarget.dataset.id
    })
  },
  //失去焦点
  inputBlur(e) {
    this.setData({
      focusId: 0
    })
    this.resetData(1)
    if (e.detail.value.trim() != ""){
      this.data.name = e.detail.value
    }
    this.getData()
  },
  //渲染页面
  getData() {
    this.data.none = false
    var le = {
      "size": this.data.size,
      "page": this.data.page,
      "field": "createTime",
      "sort": "desc"
    }
    if (this.data.address_city != ""){
      le.address_city = this.data.address_city
    }
    if (this.data.address_name != "") {
      le.address_name = this.data.address_name
    }
    if (this.data.type != "") {
      le.type = this.data.type
    }
    if (this.data.name != "") {
      le.name = this.data.name
    }
    wx.showLoading({
      title: '加载中',
    })
    app.post('/ptjob.php',le).then(res =>{
      wx.hideNavigationBarLoading()
      wx.stopPullDownRefresh()
      wx.hideLoading()
      if(res.data.code == 1){
        wx.showToast({
          title: '加载数据失败',
          icon: 'none',
          duration: 8000
        })
        return
      }
      var ends
      if (res.data.data.totalPage == this.data.page){
        ends = true
      }else{
        ends = false
      }
      if (res.data.data.totalPage == 0){
        this.setData({
          none:true
        })
      }
      this.setData({
        data: this.data.data.concat(res.data.data.data),
        ends: ends,
        loads: false
      })
    }).catch(v =>{
      console.log(v)
      wx.hideLoading()
      wx.showToast({
        title: '服务器连接失败',
        icon: 'none',
        duration: 2000
      })
    })
  },
  //下拉动画
  // dropDown: function (e) {
  //   console.log(e)
  //   if(this.data.show){
  //     // this.animation.height(0).step()
  //     this.setData({
  //       show: false,
  //       screenIndex: 3
  //     })
  //   }else{
  //     // this.animation.height("800rpx").step()
  //     this.setData({
  //       show: true,
  //       screenIndex: e.currentTarget.dataset.index
  //     })
  //   }
  //   this.setData({ animation: this.animation.export() })

  // },
  dropDown: function (e) {
    this.setData({
      show: true,
      screenIndex: e.currentTarget.dataset.index
    })
  },
  //行业改变
  screenChangeH(e){
    if (e.detail.value == 0){
      this.resetData()
      this.getData()
    }else{
      this.data.type = this.data.taskTypes[e.detail.value].typeId
      this.setData({
        loads: false,
        ends: false,
        none: false,
        size: 5,
        page: 1,
        name: "",
        data: [],
      })
      this.getData()
    }
  },
  //地点改变
  screenChangeD(e){
    console.log('picker发送选择改变，携带值为', e.detail.value)
    var adds = e.detail.value
    if (e.detail.value[0] != "河南省"){
      wx.showToast({
        title: '目前只支持河南全省',
        icon:'none',
        duration: 2000
      })
      return
    }
    this.data.address_city = e.detail.value[1].replace("市", "");
    this.data.address_name = e.detail.value[2]
    this.data.page = 1
    this.data.data = []
    this.getData()
  },
  //行业列表
  taskType(){
    app.get('/query/taskType.php').then(res => {
      var das = res.data.data
      das.unshift ({
        typeId:'0',
        typeName:"重置"
      })
      this.setData({
        taskTypes: das
      })
    })
  }
})