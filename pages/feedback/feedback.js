const app = getApp()

Page({
  onLoad(options) {
    this.setData({
      page: options.page
    })
  },
  formSubmit(e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
    var data = e.detail.value
    wx.request({
      url: '',
      method: 'POST',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      data,
      success: res => {
        console.log(res.data)
        if (res.data.status == 0) {
          wx.showToast({
            title: '提交失败！',
            icon: 'loading',
            duration: 2000
          })
        } else {
          wx.showToast({
            title: '提交成功！',
            icon: 'success',
            duration: 1500
          })
        }
      },
      fail: err => {
        console.log('错误码：' + err.errCode)
        console.log('错误信息：' + err.errMsg)
        wx.showToast({
          title: '错误码：' + err.errCode + '错误信息：' + err.errMsg,
          icon: 'none',
          duration: 3000
        })
      }
    })
  }
})