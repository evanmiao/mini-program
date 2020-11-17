const app = getApp()
var util = require('../../utils/utils.js')
var templateData = []

Page({
  data: {
    pageNumber: 1,
  },
  onLoad(options) {
    wx.showLoading({
      title: '正在加载...',
      icon: 'loading',
      mask: true
    })
    templateData = []
    this.setData({
      type: options.type,
      id: options.id,
    })
    this.getAccordionData()
    this.getTemplateData(this.data.pageNumber, this.data.id)
  },
  getAccordionData() {
    if (!this.data.type || this.data.type == "image") {
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
        wx.hideLoading()
        wx.showToast({
          title: '错误码：' + err.errCode + '错误信息：' + err.errMsg,
          icon: 'none',
          duration: 3000
        })
      }
    })
  },
  getTemplateData(pn, id) {
    this.data.pageNumber++
    if (this.data.type == "image") {
      if (id && id != 10) url = app.globalData.baseUrl + '/product?products=' + id + '&per_page=10&page=' + pn
      else url = app.globalData.baseUrl + '/product?per_page=10&page=' + pn
    } else if (this.data.type == "article") {
      if (!id) id = 1 
      var url = app.globalData.baseUrl + '/posts?categories=' + id + '&per_page=5&page=' + pn
    } else if (this.data.type == "case") {
      url = app.globalData.baseUrl + '/posts?categories=2&per_page=10&page=' + pn
    } else if (this.data.type == "video") {
      url = app.globalData.baseUrl + '/posts?categories=3&per_page=4&page=' + pn
    }
    wx.request({
      url: url,
      method: 'GET',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success: res => {
        if (res.statusCode == '400' || res.data.length == 0) {
          wx.hideLoading()
          wx.showToast({
            title: '没有更多了~',
            icon: 'none',
            duration: 2000
          })
        } else {
          this.getImgUrl(res.data)
        }
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
          this.processTemplateData(data[i], res.data.source_url)
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
  },
  processTemplateData(data, imgUrl) {
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
    templateData.push(temp)
    this.setData({
      templateData
    })
    wx.hideLoading()
  },
  loadMore() {
    wx.showLoading({
      title: '正在加载...',
      icon: 'loading',
      mask: true
    })
    this.getTemplateData(this.data.pageNumber, this.data.id)
  }
})