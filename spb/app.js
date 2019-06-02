//app.js
import './utils/weapp-cookie/index'
App({
  /**
 * 当小程序初始化完成时，会触发 onLaunch（全局只触发一次）
 */
  onLaunch: function () {
    var value = wx.getStorageSync('info')
    if (value) {
      this.post("/wx/deng.php")
    }
  },
  ursl: function(){
    // return "http://127.0.0.1:90/she/dbs/model";
    return "http://192.168.0.103:90/she/dbs/model";
  },
  imgursl: function () {
    // return "http://127.0.0.1:90/she/dbs";
    return "http://192.168.0.103:90/she/dbs";
  },
  post: function (url,le){
    return new Promise((resolve,reject)=>{
      wx.request({
        url: this.ursl() + url,
        data: le,
        method: 'POST',
        dataType: 'json',
        header: {
          'content-type': 'application/x-www-form-urlencoded' // 默认值
        },
        success: resolve,
        fail:reject
      });
    })
  },
  get: function(url, le) {
    return new Promise((resolve, reject) => {
      wx.request({
        url: this.ursl() + url,
        data: le,
        method: 'GET',
        dataType: 'json',
        header: {
          'content-type': 'application/x-www-form-urlencoded' // 默认值
        },
        success: resolve,
        fail: reject
      });
    })
  },
  file: function (url, filePath, name, formData) {
    return new Promise((resolve, reject) => {
      wx.uploadFile({
        url: this.ursl() + url,
        filePath: filePath,
        name: name,
        formData: formData,
        success: resolve,
        fail: reject
      })
    })
  }
})