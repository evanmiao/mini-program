const app = getApp()
var util = require('../../utils/utils.js')
var wxParse = require('../../wxParse/wxParse.js')
var newsData = []

Page({
  data: {
    linksData: {
      prevId: 1,
      nextId: 1,
      prevTitle: 'prevTitle',
      nextTitle: 'nextTitle'
    }
  },
  onLoad(options) {
    wx.showLoading({
      title: '正在加载...',
      icon: 'loading',
      mask: true
    })
    newsData = []
    this.setData({
      type: options.type,
      id: options.id,
    })
    this.getAccordionData()
    // this.getLinksData()
    this.getNewsData()
    this.getTemplateData(this.data.id)
  },
  onShow() {
    this.accordion = this.selectComponent('accordion')
    this.accordion.toggleAccordion()
  },
  getAccordionData() {
    if (this.data.type == "image") {
      var url = app.globalData.baseUrl + '/products',
        titleId = 10
    } else {
      url = app.globalData.baseUrl + '/categories'
      if (this.data.type == "article") {
        titleId = 1
      } else if (this.data.type == "case") {
        titleId = 2
      } else if (this.data.type == "video") {
        titleId = 3
      }
    }
    wx.request({
      url: url,
      method: 'GET',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success: res => {
        this.setData({
          accordionData: util.processAccordionData(res.data, titleId)
        })
      },
      fail: err => {
        console.log('错误码：' + err.errCode)
        console.log('错误信息：' + err.errMsg)
      }
    })
  },
  getTemplateData(id) {
    if (this.data.type == "image") {
      url = app.globalData.baseUrl + '/product/' + id
    } else {
      var url = app.globalData.baseUrl + '/posts/' + id
    }
    wx.request({
      url: url,
      method: 'GET',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: res => {
        var bodyData = res.data.content.rendered
        this.setData({
          bodyData: wxParse.wxParse('body', 'html', bodyData, this, 5)
        })
        this.processTemplateData(res.data)
      },
      fail: err => {
        console.log('错误码：' + err.errCode)
        console.log('错误信息：' + err.errMsg)
      }
    })
  },
  processTemplateData(data) {
    var date = data.date.substring(0, 10)
    var templateData = {
      title: data.title.rendered,
      imgUrls: [
        'https://www.zhiyuyg.com/images/201606/goods_img/49_P_1465060608349.jpg',
        'https://www.zhiyuyg.com/images/201606/goods_img/49_P_1465060616718.jpg'
      ],
      productId: data.id,
      view: '',
      date
    }
    this.setData({
      templateData
    })
    wx.hideLoading()
  },
  getNewsData() {
    wx.request({
      url: app.globalData.baseUrl + "/posts?categories=1&per_page=3",
      method: 'GET',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: res => {
        this.getImgUrl(res.data)
      },
      fail: err => {
        console.log('错误码：' + err.errCode)
        console.log('错误信息：' + err.errMsg)
      }
    })
  },
  getImgUrl(data) {
    for (let i = 0; i < data.length; i++) {
      wx.request({
        url: data[i]._links['wp:featuredmedia'][0].href,
        method: 'GET',
        header: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        success: res => {
          this.processNewsData(data[i], res.data.source_url)
        },
        fail: err => {
          console.log('错误码：' + err.errCode)
          console.log('错误信息：' + err.errMsg)
        }
      })
    }
  },
  processNewsData(data, imgUrl) {
    var date = data.date.substring(0, 10)
    var discription = data.excerpt.rendered.replace('<p>', '').replace('</p>', '')
    var temp = {
      id: data.id,
      imgUrl,
      title: data.title.rendered,
      discription,
      view: '',
      date
    }
    newsData.push(temp)
    this.setData({
      newsData
    })
  },
  formSubmit(e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
    var data = e.detail.value
    wx.request({
      url: 'https://www.zhiyuyg.com/plus/diy.php',
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