// pages/release/release.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:"",
    focusId: '0',
    typechiose: '',
    typePlaceholder: true,
    cyclechiose:"",
    cyclePlaceholder: true,
    type: [],
    begindate:"",
    begintime:'',
    enddate: "",
    endtime: '',
    region: ["河南省"],
    cycle:["日结","周结","半月结","月结"],
    loading: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '发布任务'
    })
    this.taskType()
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
    this.render()
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
  inputFocus(e){
    this.setData({
      focusId: e.currentTarget.dataset.id
    })
  },
  //失去焦点
  inputBlur(){
    this.setData({
      focusId: 0
    })
  },
  //职位类型
  typeChange(e){
    this.setData({
      typechiose: this.data.type[e.detail.value].typeName,
      typePlaceholder: false
    })
  },
  cycleChange(e){
    this.setData({
      cyclechiose: this.data.cycle[e.detail.value],
      cyclePlaceholder: false
    })
  },
  //开始时间
  beginDateChange: function (e) {
    this.setData({
      begindate: e.detail.value
    })
  },
  beginTimeChange: function (e) {
    this.setData({
      begintime: e.detail.value
    })
  },
  //结束时间
  endDateChange: function (e) {
    this.setData({
      enddate: e.detail.value
    })
  },
  endTimeChange: function (e) {
    this.setData({
      endtime: e.detail.value
    })
  },
  bindRegionChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      region: e.detail.value
    })
  },
  //登录判断
  render(){
    var value = wx.getStorageSync('info')
    if (value){
      var das = JSON.parse(value)
      this.setData({
        id:das.id
      })
      if (das.type == 0){
        wx.showToast({
          title: '未认证不能发布任务哦',
          icon: 'none',
          duration: 2000
        })
        return false
      }
      return true
    }else{
      wx.showToast({
        title: '请先登录哦',
        icon: 'none',
        duration: 2000
      })
      return false
    }
  },
  //发布
  formSubmit: function (e) {
    if (!this.render()) {
      return
    }
    if (this.tast(e.detail.value) != 1){
      wx.showToast({
        title: this.tast(e.detail.value),
        icon: 'none',
        duration: 2000
      })
      return
    }
    var data = e.detail.value
    var le = {
      release_id:this.data.id,
      name: data.name,
      type: this.data.type[data.type].typeId,
      number: data.number,
      money: data.money,
      cycle: this.data.cycle[data.cycle],
      begin_time: data.begindate + " " + data.begintime+":00",
      end_time: data.enddate + " " + data.endtime + ":00",
      address_city: data.address[1],
      address_name: data.address[2],
      Specific_address: data.Specific_address,
      describe: data.describe,
      requirement: data.requirement
    }
    wx.showLoading({
      title: '发布中',
    })
    app.post("/release.php",le).then(res=>{
      wx.hideLoading()
      if(res.data.code == 1){
        wx.showToast({
          title: res.data.message,
          icon: 'none',
          duration: 2000
        })
        return
      }
      wx.showToast({
        title: "发布成功",
        icon: 'success',
        duration: 2000
      })
    })
  },
  //重置
  formReset: function () {
    this.setData({
      focusId: '0',
      typechiose: '',
      typePlaceholder: true,
      cyclechiose: "",
      cyclePlaceholder: true,
      begindate: "",
      begintime: '',
      enddate: "",
      endtime: '',
      region: ["河南省"],
      loading: false
    })
  },
  tast(data){
    if (data.name == ""){
      return "请输入任务名称"
    }
    if (data.type == "") {
      return "请选择任务类型"
    }
    if (data.number == "") {
      return "请输入人数"
    }
    if (data.money == "") {
      return "请输入薪资"
    }
    if (data.cycle == "") {
      return "请选择结算周期"
    }
    if (data.begindate == "") {
      return "请输入开始日期"
    }
    if (data.begintime == "") {
      return "请输入开始时间"
    }
    if (data.enddate == "") {
      return "请输入结束日期"
    }
    if (data.endtime == "") {
      return "请输入结束时间"
    }
    if (data.address.length != 3) {
      return "请选择工作地点"
    }
    if (data.Specific_address == "") {
      return "请输入详细地址"
    }
    if (data.describe == "") {
      return "请输入职位描述"
    }
    if (data.requirement == "") {
      return "请输入任职要求"
    }
    return 1
  },
  //职位类型
  taskType() {
    app.get('/query/taskType.php').then(res => {
      var das = res.data.data
      this.setData({
        type: das
      })
    })
  }
})