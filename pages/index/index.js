const app = getApp()
var productsData = []
var newsData = []
var videosData = []

Page({
  data: {
    imgUrls: [
      'https://www.zhyuanyu.com/wp-content/uploads/2019/08/1-1z10z91544o0.jpg',
      'https://www.zhyuanyu.com/wp-content/uploads/2019/08/1-1z10z91621160.jpg'
    ]
  },
  onLoad() {
    wx.showLoading({
      title: '正在加载...',
      icon: 'loading',
      mask: true
    })
    productsData = []
    newsData = []
    videosData = []
    this.getProductsData()
    this.getNewsData()
    this.getVideosData()
    this.getAboutUsData()
  },
  getProductsData() {
    wx.request({
      url: app.globalData.baseUrl + "/product?per_page=6&orderby=id&order=asc",
      method: 'GET',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: res => {
        this.getImgUrl(res.data, 'products')
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
  getNewsData() {
    wx.request({
      url: app.globalData.baseUrl + "/posts?categories=1&per_page=3",
      method: 'GET',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: res => {
        this.getImgUrl(res.data, 'news')
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
  getVideosData() {
    wx.request({
      url: app.globalData.baseUrl + "/posts?categories=3&per_page=4",
      method: 'GET',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: res => {
        this.getImgUrl(res.data, 'videos')
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
  getAboutUsData() {
    wx.request({
      url: app.globalData.baseUrl + '/pages/7',
      method: 'GET',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: res => {
        var about = res.data.content.rendered.replace(/<(\/?)p>/g, '').replace(/\n/g, '').substring(0, 160) + '…'
        this.setData({
          about
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
  getImgUrl(data, dataType) {
    for (let i = 0; i < data.length; i++) {
      wx.request({
        url: data[i]._links['wp:featuredmedia'][0].href,
        method: 'GET',
        header: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        success: res => {
          if (dataType == 'products') {
            this.processProductsData(data[i], res.data.source_url)
          } else if (dataType == 'news') {
            this.processNewsData(data[i], res.data.source_url)
          } else if (dataType == 'videos') {
            this.processVideosData(data[i], res.data.source_url)
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
    }
  },
  processProductsData(data, imgUrl) {
    var temp = {
      id: data.id,
      title: data.title.rendered,
      imgUrl
    }
    productsData.push(temp)
    this.setData({
      productsData
    })
    wx.hideLoading()
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
      date,
    }
    newsData.push(temp)
    this.setData({
      newsData
    })
    wx.hideLoading()
  },
  processVideosData(data, imgUrl) {
    var temp = {
      id: data.id,
      imgUrl
    }
    videosData.push(temp)
    this.setData({
      videosData
    })
    wx.hideLoading()
  }
})