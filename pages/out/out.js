Page({
  //接收H5页传过来的参数
  onShareAppMessage(options) {
    console.log(options.webViewUrl)
  },
  onLoad(options) {
    console.log(options.url)
    this.setData({
      src: options.url
    })
  }
})