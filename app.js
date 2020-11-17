//app.js
App({
  onLaunch(options) {
    // do something when launch
  },
  onShow(options) {
    // do something when show
  },
  onHide() {
    // do something when hide
  },
  onError(errMsg) {
    console.log(errMsg); // 发生错误时，回调此方法并传递错误信息
  },
  globalData: {
    baseUrl: "https://www.zhyuanyu.com/wp-json/wp/v2"
  }
})