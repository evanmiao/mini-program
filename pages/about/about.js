const app = getApp()
var wxParse = require('../../wxParse/wxParse.js')

Page({
  onLoad(options) {
    wx.showLoading({
      title: '正在加载...',
      icon: 'loading',
      mask: true
    })
    this.setData({
      page: options.page
    })
    this.getBodyData()
  },
  getBodyData() {
    var url = app.globalData.baseUrl + '/pages/7'
    wx.request({
      url: url,
      method: 'GET',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success: res => {
        var content = res.data.content.rendered
        var bodyData = {
          title: res.data.title.rendered,
          content: wxParse.wxParse('body', 'html', content, this, 5)
        }
        this.setData({
          bodyData
        })
        wx.hideLoading()
      },
      fail: err => {
        console.log('错误码：' + err.errCode)
        console.log('错误信息：' + err.errMsg)
        wx.hideLoading()
        wx.showToast({
          title: '错误码：' + err.errCode + '错误信息：' + err.errMsg,
          icon: 'none',
          duration: 3000
        })
      }
    })
  }
})